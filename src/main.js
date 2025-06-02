const canvas = document.getElementById("parkour-canvas");
const ctx = canvas.getContext("2d");
const sizeLabel = document.getElementById("canvas-size-label");
const modeLabel = document.getElementById("mode-indicator");

let obstacles = [];
let selected = null;
let dragging = false;
let rotating = false;
let draggingControlPoint = null;
let mode = "move";
let dragOffset = {x: 0, y: 0};

const gridSize = 25;
const rotateHandleDistance = 50;
const rotateHandleRadius = 8;
const controlPointRadius = 10;

function pxToMeters(px) {
    return +(px / 10).toFixed(1);
}

function metersToPx(m) {
    return m * 10;
}

function updateCanvasLabel() {
    const w = pxToMeters(canvas.width);
    const h = pxToMeters(canvas.height);
    sizeLabel.textContent = `${w}m x ${h}m`;
    modeLabel.textContent = mode === "move" ? "Przesuwanie (R)" : "Rotacja (R)";
}

function getMousePos(evt) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function getDistance(p1, p2) {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    return Math.sqrt(dx * dx + dy * dy);
}

function getQuadraticPoint(p0, cp, p1, t) {
    const x = Math.pow(1 - t, 2) * p0.x + 2 * (1 - t) * t * cp.x + Math.pow(t, 2) * p1.x;
    const y = Math.pow(1 - t, 2) * p0.y + 2 * (1 - t) * t * cp.y + Math.pow(t, 2) * p1.y;
    return {x, y};
}

function getQuadraticCurveLength(p0, cp, p1, steps = 50) {
    let length = 0;
    let prev = p0;
    for (let i = 1; i <= steps; i++) {
        const t = i / steps;
        const curr = getQuadraticPoint(p0, cp, p1, t);
        length += getDistance(prev, curr);
        prev = curr;
    }
    return length;
}

function drawGrid() {
    ctx.strokeStyle = "#e0e0e0";
    for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

function drawConnections() {
    for (let i = 0; i < obstacles.length - 1; i++) {
        const from = obstacles[i];
        const to = obstacles[i + 1];
        const p1 = {x: from.x, y: from.y};
        const p2 = {x: to.x, y: to.y};

        if (!from.controlPoint || from.controlPoint.auto) {
            const midX = (p1.x + p2.x) / 2;
            const midY = (p1.y + p2.y) / 2 - 40;
            from.controlPoint = {x: midX, y: midY, auto: true};
        }

        const cp = from.controlPoint;

        ctx.setLineDash([6, 4]);
        ctx.strokeStyle = "#999";
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.quadraticCurveTo(cp.x, cp.y, p2.x, p2.y);
        ctx.stroke();
        ctx.setLineDash([]);

        const len = getQuadraticCurveLength(p1, cp, p2);
        const mid = getQuadraticPoint(p1, cp, p2, 0.5);
        ctx.fillStyle = "#e53935";
        ctx.font = "12px Inter, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(`${pxToMeters(len)} m`, mid.x, mid.y - 10);

        ctx.beginPath();
        ctx.arc(cp.x, cp.y, controlPointRadius, 0, 2 * Math.PI);
        ctx.fillStyle = "rgba(0,255,0,0.2)";
        ctx.strokeStyle = "#0c0";
        ctx.fill();
        ctx.stroke();
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    drawConnections();
    obstacles.forEach((obs, i) => {
        drawObstacle(ctx, obs, i, selected, mode);
    });
    updateCanvasLabel();
    updateStats(obstacles);
}

function addObstacle() {
    const type = document.getElementById("obstacle-type").value;
    const customLabel = document.getElementById("obstacle-label").value.trim();

    if (type === "szereg") {
        openSzeregModal(customLabel);
    } else {
        createObstacle(type, customLabel);
    }
}

// ==== MODAL OBSŁUGA ====

function openSzeregModal(customLabel) {
    document.getElementById("szereg-modal").style.display = "block";
    document.getElementById("szereg-modal").dataset.label = customLabel;
    buildSzeregModal();
}

function closeSzeregModal() {
    document.getElementById("szereg-modal").style.display = "none";
}

function buildSzeregModal() {
    const countInput = document.getElementById("szereg-count");
    const typesDiv = document.getElementById("szereg-types");
    const fouleesDiv = document.getElementById("szereg-foulees");

    const count = parseInt(countInput.value, 10);
    typesDiv.innerHTML = "";
    fouleesDiv.innerHTML = "";

    for (let i = 0; i < count; i++) {
        const label = String.fromCharCode(65 + i);
        const select = document.createElement("select");
        select.id = `szereg-type-${i}`;
        ["stacjonata", "okser", "triple", "mur", "row"].forEach(t => {
            const option = document.createElement("option");
            option.value = t;
            option.textContent = t;
            select.appendChild(option);
        });

        const labelElem = document.createElement("label");
        labelElem.textContent = `Typ przeszkody ${label}:`;
        typesDiv.appendChild(labelElem);
        typesDiv.appendChild(select);
    }

    for (let i = 0; i < count - 1; i++) {
        const labelElem = document.createElement("label");
        labelElem.textContent = `Fouleé między ${String.fromCharCode(65 + i)} i ${String.fromCharCode(66 + i)}:`;
        const input = document.createElement("input");
        input.type = "number";
        input.min = "1";
        input.max = "2";
        input.value = "1";
        input.id = `szereg-foulee-${i}`;
        fouleesDiv.appendChild(labelElem);
        fouleesDiv.appendChild(input);
    }
}

function confirmSzereg() {
    const modal = document.getElementById("szereg-modal");
    const label = modal.dataset.label || "";
    const count = parseInt(document.getElementById("szereg-count").value, 10);

    const types = [];
    const foulees = [];

    for (let i = 0; i < count; i++) {
        types.push(document.getElementById(`szereg-type-${i}`).value);
    }

    for (let i = 0; i < count - 1; i++) {
        const val = parseInt(document.getElementById(`szereg-foulee-${i}`).value, 10);
        foulees.push(val === 2 ? 10.5 : 7);
    }

    createObstacle("szereg", label, {count, types, foulees});
    closeSzeregModal();
}

canvas.addEventListener("mousedown", e => {
    const m = getMousePos(e);
    selected = null;
    dragging = false;
    rotating = false;
    draggingControlPoint = null;

    for (let i = 0; i < obstacles.length - 1; i++) {
        const cp = obstacles[i].controlPoint;
        if (cp && getDistance(m, cp) < controlPointRadius + 4) {
            cp.auto = false;
            draggingControlPoint = cp;
            return;
        }
    }

    for (let i = obstacles.length - 1; i >= 0; i--) {
        const obs = obstacles[i];
        const dx = m.x - obs.x;
        const dy = m.y - obs.y;
        const angle = -obs.rotation * Math.PI / 180;
        const lx = dx * Math.cos(angle) - dy * Math.sin(angle);
        const ly = dx * Math.sin(angle) + dy * Math.cos(angle);

        if (mode === "rotate") {
            const dist = Math.sqrt(lx ** 2 + ly ** 2);
            if (Math.abs(dist - rotateHandleDistance) <= rotateHandleRadius * 2) {
                selected = obs;
                rotating = true;
                return;
            }
        }

        if (lx > -40 && lx < 40 && ly > -40 && ly < 40) {
            selected = obs;
            dragOffset = {x: lx, y: ly};
            dragging = true;
            return;
        }
    }
});

canvas.addEventListener("mousemove", e => {
    const m = getMousePos(e);

    if (dragging && selected && mode === "move") {
        const dx = m.x - selected.x;
        const dy = m.y - selected.y;

        if (selected.group) {
            obstacles.forEach(o => {
                if (o.group === selected.group) {
                    o.x += dx;
                    o.y += dy;
                }
            });
        } else {
            selected.x = Math.round((m.x - dragOffset.x) / gridSize) * gridSize;
            selected.y = Math.round((m.y - dragOffset.y) / gridSize) * gridSize;
        }

        draw();
    } else if (rotating && selected && mode === "rotate") {
        const dx = m.x - selected.x;
        const dy = m.y - selected.y;
        const newRotation = Math.round((Math.atan2(dy, dx) * 180) / Math.PI) + 90;

        if (selected.group) {
            const centerX = selected.x;
            const centerY = selected.y;

            obstacles.forEach(o => {
                if (o.group === selected.group) {
                    const dx = o.x - centerX;
                    const dy = o.y - centerY;
                    const r = Math.sqrt(dx * dx + dy * dy);
                    const oldAngle = Math.atan2(dy, dx);
                    const newAngle = oldAngle + ((newRotation - o.rotation) * Math.PI / 180);
                    o.x = centerX + r * Math.cos(newAngle);
                    o.y = centerY + r * Math.sin(newAngle);
                    o.rotation = newRotation;
                }
            });

        } else {
            selected.rotation = newRotation;
        }

        draw();
    } else if (draggingControlPoint) {
        draggingControlPoint.x = m.x;
        draggingControlPoint.y = m.y;
        draw();
    }
});

canvas.addEventListener("mouseup", () => {
    dragging = false;
    rotating = false;
    draggingControlPoint = null;
});

document.addEventListener("keydown", e => {
    if (e.key.toLowerCase() === "r") {
        mode = mode === "move" ? "rotate" : "move";
        draw();
    }
});

function clearCanvas() {
    obstacles = [];
    draw();
}

function applyCanvasSize() {
    const w = parseFloat(document.getElementById("input-width").value);
    const h = parseFloat(document.getElementById("input-height").value);
    if (!isNaN(w) && !isNaN(h)) {
        canvas.width = metersToPx(w);
        canvas.height = metersToPx(h);
        draw();
    }
}

window.exportToJSON = exportToJSON;
window.importFromJSON = importFromJSON;
window.exportToPNG = exportToPNG;

window.onload = () => {
    updateCanvasLabel();
    draw();
};
