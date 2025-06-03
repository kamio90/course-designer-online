import {saveProjectToStorage} from '../storage.js';
import {renderHelpBox} from './HelpBox.js';

function edgeLength(p1, p2) {
    const dx = p2.x - p1.x, dy = p2.y - p1.y;
    return Math.sqrt(dx * dx + dy * dy);
}

function pxToMeters(px, pxPerMeter) {
    return +(px / pxPerMeter).toFixed(2);
}

function metersToPx(m, pxPerMeter) {
    return m * pxPerMeter;
}

function polygonArea(vertices, pxPerMeter) {
    let area = 0, n = vertices.length;
    for (let i = 0; i < n; i++) {
        let j = (i + 1) % n;
        area += (vertices[i].x * vertices[j].y - vertices[j].x * vertices[i].y);
    }
    return Math.abs(area / 2) / (pxPerMeter * pxPerMeter);
}

// Tooltip enterprise, nie zasłania liczby/metrów, automatyczne pozycjonowanie
function drawTooltip(ctx, x, y, text, direction = "top") {
    ctx.save();
    ctx.font = "bold 13px Inter";
    const metrics = ctx.measureText(text);
    const padding = 8, height = 28;
    let tx = x - metrics.width / 2 - padding;
    let ty = y - (direction === "top" ? 36 : -8);

    // Przesuwanie jeśli blisko krawędzi
    if (ty < 12) ty = y + 26;
    if (tx < 2) tx = 2;
    if (tx + metrics.width + 2 * padding > ctx.canvas.width)
        tx = ctx.canvas.width - metrics.width - 2 * padding - 2;

    ctx.beginPath();
    ctx.roundRect(tx, ty, metrics.width + 2 * padding, height, 10);
    ctx.fillStyle = "#fff";
    ctx.strokeStyle = "#1565c0";
    ctx.lineWidth = 1.2;
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#1565c0";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, x, ty + height / 2 + 1);
    ctx.restore();
}

let activeContextMenu = null;

function closeContextMenu() {
    if (activeContextMenu) {
        activeContextMenu.remove();
        activeContextMenu = null;
    }
}

function showContextMenu(x, y, items) {
    closeContextMenu();
    const menu = document.createElement('div');
    menu.className = 'pcd-context-menu';
    menu.style.left = x + 'px';
    menu.style.top = y + 'px';
    items.forEach(({label, onClick}) => {
        const el = document.createElement('div');
        el.className = 'pcd-context-menu-item';
        el.textContent = label;
        el.onclick = (e) => {
            e.stopPropagation();
            closeContextMenu();
            onClick();
        };
        menu.appendChild(el);
    });
    document.body.appendChild(menu);
    activeContextMenu = menu;
    setTimeout(() => {
        function handler(evt) {
            if (!menu.contains(evt.target)) closeContextMenu();
            document.removeEventListener('mousedown', handler);
        }

        document.addEventListener('mousedown', handler);
    }, 30);
}

export function renderParkurCanvasDraw(config = {}) {
    let {
        place = '',
        pxPerMeter = 20,
        width = 3000,
        height = 2000,
        polygon = []
    } = config;

    let zoom = 1;
    let panX = 0, panY = 0;
    let isPanning = false;
    let panOrigin = {x: 0, y: 0};

    const root = document.getElementById('main-content');
    root.innerHTML = `
      <div class="pcd-root">
        <div class="pcd-toolbar">
          <label>
            <span>Skala:</span>
            <select id="scale-select" class="mat-input">
              <option value="2">2px / 1m</option>
              <option value="5">5px / 1m</option>
              <option value="10">10px / 1m</option>
              <option value="20" selected>20px / 1m</option>
              <option value="30">30px / 1m</option>
              <option value="40">40px / 1m</option>
            </select>
          </label>
          <label>
            <span>Szerokość [m]:</span>
            <input type="number" id="width-m-input" min="10" value="150" class="mat-input">
          </label>
          <label>
            <span>Wysokość [m]:</span>
            <input type="number" id="height-m-input" min="10" value="100" class="mat-input">
          </label>
          <button id="resize-canvas-btn" class="mat-btn mat-primary">Dopasuj</button>
          <button id="zoom-in-btn" class="mat-btn">+</button>
          <button id="zoom-out-btn" class="mat-btn">-</button>
          <button id="show-help-btn" class="mat-btn" title="Pomoc"><svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#1565c0" stroke-width="2"/><text x="12" y="17" text-anchor="middle" fill="#1565c0" font-size="14" font-family="Inter" font-weight="bold">?</text></svg></button>
        </div>
        <div class="pcd-main">
          <div class="pcd-canvas-wrap">
            <canvas id="draw-canvas" width="${width}" height="${height}" class="pcd-canvas"></canvas>
            <div class="pcd-canvas-actions">
              <button id="save-shape-btn" class="mat-btn mat-primary">Zapisz parkur</button>
              <button id="export-shape-btn" class="mat-btn mat-outline">Eksportuj JSON</button>
            </div>
            <div id="canvas-hints" class="pcd-hints"></div>
          </div>
          <aside id="stats-panel" class="pcd-stats-panel">
              <button id="toggle-stats" class="mat-btn mat-mini" title="Ukryj statystyki">&lt;</button>
              <h3>Statystyki</h3>
              <div><b>Powierzchnia całkowita:</b> <span id="stat-area">–</span> m²</div>
              <div><b>Długość obwodu:</b> <span id="stat-len">–</span> m</div>
              <div><b>Liczba wierzchołków:</b> <span id="stat-pts">–</span></div>
              <div><b>Liczba krawędzi:</b> <span id="stat-edges">–</span></div>
              <div><b>Zajęty obszar:</b> <span id="stat-occ">–</span> m²</div>
          </aside>
        </div>
      </div>
    `;

    let helpActive = false;

    function showHelp() {
        if (helpActive) return;
        helpActive = true;
        renderHelpBox({
            onClose: () => helpActive = false
        });
    }

    showHelp();
    document.getElementById('show-help-btn').onclick = showHelp;

    let statsPanel = document.getElementById('stats-panel');
    let showStats = true;
    document.getElementById('toggle-stats').onclick = () => {
        showStats = !showStats;
        statsPanel.classList.toggle('collapsed', !showStats);
    };

    const canvas = document.getElementById('draw-canvas');
    const ctx = canvas.getContext('2d');
    let points = polygon.length ? polygon.map(p => ({...p})) : [];
    let draggingIdx = null;
    let hoverIdx = null;
    let hoverEdge = null;
    let editingEdge = null;
    let drawing = points.length === 0;
    let undoStack = [];
    let redoStack = [];
    let lastArea = 0;
    let edgeLengths = [];
    let hoverTooltip = null;

    document.getElementById('scale-select').value = pxPerMeter;
    document.getElementById('width-m-input').value = Math.round(canvas.width / pxPerMeter);
    document.getElementById('height-m-input').value = Math.round(canvas.height / pxPerMeter);

    document.getElementById('scale-select').onchange = function () {
        pxPerMeter = Number(this.value);
        canvas.width = Number(document.getElementById('width-m-input').value) * pxPerMeter;
        canvas.height = Number(document.getElementById('height-m-input').value) * pxPerMeter;
        draw();
    };
    document.getElementById('resize-canvas-btn').onclick = function () {
        const w = Number(document.getElementById('width-m-input').value);
        const h = Number(document.getElementById('height-m-input').value);
        canvas.width = w * pxPerMeter;
        canvas.height = h * pxPerMeter;
        draw();
    };
    document.getElementById('zoom-in-btn').onclick = function () {
        zoom = Math.min(zoom * 1.2, 8);
        draw();
    };
    document.getElementById('zoom-out-btn').onclick = function () {
        zoom = Math.max(zoom / 1.2, 0.1);
        draw();
    };

    // Panning (Space+drag or two-finger/touchpad drag)
    canvas.addEventListener('mousedown', e => {
        if (e.button === 1 || e.button === 0 && e.ctrlKey || e.button === 0 && e.shiftKey) {
            isPanning = true;
            panOrigin = {x: e.clientX - panX, y: e.clientY - panY};
            document.body.style.cursor = 'grab';
        }
    });
    canvas.addEventListener('mousemove', e => {
        if (isPanning) {
            panX = e.clientX - panOrigin.x;
            panY = e.clientY - panOrigin.y;
            draw();
        }
    });
    document.addEventListener('mouseup', () => {
        isPanning = false;
        document.body.style.cursor = '';
    });
    canvas.addEventListener('wheel', (e) => {
        if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            const delta = -e.deltaY || e.wheelDelta;
            if (delta > 0) zoom = Math.min(zoom * 1.15, 8);
            else zoom = Math.max(zoom / 1.15, 0.1);
            draw();
        } else if (e.shiftKey) {
            e.preventDefault();
            panX -= e.deltaY;
            draw();
        } else {
            panY -= e.deltaY;
            draw();
        }
    }, {passive: false});

    function updateStats() {
        const area = points.length >= 3 ? polygonArea(points, pxPerMeter) : 0;
        const perim = points.length >= 2 ? points.reduce((acc, pt, i, arr) => {
            let j = (i + 1) % arr.length;
            return acc + pxToMeters(edgeLength(pt, arr[j]), pxPerMeter);
        }, 0) : 0;
        document.getElementById('stat-area').textContent = area.toFixed(2);
        document.getElementById('stat-len').textContent = perim.toFixed(2);
        document.getElementById('stat-pts').textContent = points.length;
        document.getElementById('stat-edges').textContent = points.length;
        document.getElementById('stat-occ').textContent = "–";
        lastArea = area;
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.setTransform(zoom, 0, 0, zoom, panX, panY);
        ctx.strokeStyle = "#1565c033";
        ctx.lineWidth = 1;
        for (let x = 0; x <= canvas.width; x += pxPerMeter) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }
        for (let y = 0; y <= canvas.height; y += pxPerMeter) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }
        if (points.length) {
            ctx.strokeStyle = "#1565c0";
            ctx.lineWidth = 2.6;
            ctx.beginPath();
            let n = points.length;
            for (let i = 0; i < n; i++) {
                let prev = points[(i - 1 + n) % n];
                let curr = points[i];
                let next = points[(i + 1) % n];
                let r = curr.radius || 0;
                if (i === 0) {
                    ctx.moveTo(curr.x, curr.y);
                } else if (r > 0) {
                    let v1x = curr.x - prev.x, v1y = curr.y - prev.y;
                    let v2x = next.x - curr.x, v2y = next.y - curr.y;
                    let len1 = Math.sqrt(v1x * v1x + v1y * v1y);
                    let len2 = Math.sqrt(v2x * v2x + v2y * v2y);
                    let ux1 = v1x / len1, uy1 = v1y / len1;
                    let ux2 = v2x / len2, uy2 = v2y / len2;
                    let p1x = curr.x - ux1 * r, p1y = curr.y - uy1 * r;
                    let p2x = curr.x + ux2 * r, p2y = curr.y + uy2 * r;
                    ctx.lineTo(p1x, p1y);
                    ctx.arcTo(curr.x, curr.y, p2x, p2y, r);
                } else {
                    ctx.lineTo(curr.x, curr.y);
                }
            }
            if (!drawing) ctx.closePath();
            ctx.stroke();

            edgeLengths = [];
            for (let i = 0; i < points.length; i++) {
                let j = (i + 1) % points.length;
                if (drawing && j === 0) break;
                let p1 = points[i], p2 = points[j];
                let lenPx = edgeLength(p1, p2);
                let lenM = pxToMeters(lenPx, pxPerMeter);
                edgeLengths.push(lenM);

                const midX = (p1.x + p2.x) / 2, midY = (p1.y + p2.y) / 2;
                ctx.save();
                ctx.font = "bold 15px Inter";
                ctx.fillStyle = hoverEdge === i ? "#1fa870" : "#003c8f";
                ctx.strokeStyle = "#fff";
                ctx.lineWidth = 4;
                ctx.strokeText(lenM.toFixed(2) + "m", midX + 1, midY - 13 + 1);
                ctx.fillText(lenM.toFixed(2) + "m", midX, midY - 13);

                if (hoverEdge === i && hoverTooltip) {
                    drawTooltip(ctx, midX, midY - 24, "Prawy klik: menu | Lewy klik: dodaj/edytuj");
                }
                ctx.restore();
            }
        }
        points.forEach((p, idx) => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, (idx === hoverIdx ? 11 : 8), 0, Math.PI * 2);
            ctx.fillStyle = idx === draggingIdx ? "#1fa870" : (idx === hoverIdx ? "#1565c0" : "#fff");
            ctx.fill();
            ctx.lineWidth = idx === hoverIdx ? 3 : 2;
            ctx.strokeStyle = idx === hoverIdx ? "#1fa870" : "#1565c0";
            ctx.stroke();
            ctx.font = "bold 12px Inter";
            ctx.fillStyle = "#222";
            ctx.textAlign = "center";
            ctx.fillText(idx + 1, p.x, p.y - 17);
            if ((p.radius || 0) > 0) {
                ctx.font = "10px Inter";
                ctx.fillStyle = "#1976d2";
                ctx.fillText("r=" + pxToMeters(p.radius, pxPerMeter) + "m", p.x, p.y + 18);
            }
            if (hoverIdx === idx && hoverTooltip) {
                drawTooltip(ctx, p.x, p.y - 28, "Prawy klik: menu | Lewy drag: przesuwaj punkt");
            }
        });
        document.getElementById('canvas-hints').innerHTML =
            drawing
                ? (points.length === 0
                    ? "Kliknij, aby zacząć rysować kształt (min 3 punkty)."
                    : "Klikaj, aby dodać punkt. Kliknij na pierwszy punkt, aby zamknąć. Drag&drop – przesuwanie. Klik w krawędź – dodaj punkt. Double-click na punkcie – usuń punkt. ESC – anuluj. ENTER – zamknij kształt. Space + drag lub środkowy przycisk – przesuwanie widoku. Wheel/trackpad – zoom.")
                : "Tryb edycji: Drag&drop – przesuwanie punktów, klik w krawędź – dodaj punkt, klik w metry – wpisz długość, Alt+drag – zmiana promienia rogu, Double-click – usuń punkt, Shift+drag – snap do siatki/linii, ESC – anuluj edycję, Ctrl+Z/Y – cofaj/przywracaj";
        updateStats();
        ctx.restore();
    }

    function getCursorCanvasCoords(e) {
        const rect = canvas.getBoundingClientRect();
        return {
            x: (e.clientX - rect.left - panX) / zoom,
            y: (e.clientY - rect.top - panY) / zoom
        };
    }

    canvas.onmousemove = e => {
        const {x: mx, y: my} = getCursorCanvasCoords(e);
        hoverIdx = points.findIndex(p => Math.hypot(mx - p.x, my - p.y) < 13);
        hoverEdge = -1;
        for (let i = 0; i < points.length; i++) {
            let j = (i + 1) % points.length;
            let p1 = points[i], p2 = points[j];
            let dist = Math.abs((p2.y - p1.y) * mx - (p2.x - p1.x) * my + p2.x * p1.y - p2.y * p1.x) / Math.hypot(p2.y - p1.y, p2.x - p1.x);
            if (dist < 8 && Math.min(p1.x, p2.x) - 4 <= mx && mx <= Math.max(p1.x, p2.x) + 4 && Math.min(p1.y, p2.y) - 4 <= my && my <= Math.max(p1.y, p2.y) + 4) {
                hoverEdge = i;
            }
        }
        if (hoverIdx !== -1 || hoverEdge !== -1) {
            hoverTooltip = true;
        } else {
            hoverTooltip = false;
        }
        if (draggingIdx !== null) {
            if (e.shiftKey) {
                let snap = pxPerMeter;
                points[draggingIdx].x = Math.round(mx / snap) * snap;
                points[draggingIdx].y = Math.round(my / snap) * snap;
            } else {
                points[draggingIdx].x = mx;
                points[draggingIdx].y = my;
            }
        }
        draw();
    };

    canvas.onmousedown = e => {
        const {x: mx, y: my} = getCursorCanvasCoords(e);

        // PAN
        if (e.button === 1 || (e.button === 0 && (e.ctrlKey || e.shiftKey || e.metaKey || e.altKey || e.code === 'Space'))) {
            isPanning = true;
            panOrigin = {x: e.clientX - panX, y: e.clientY - panY};
            document.body.style.cursor = 'grab';
            return;
        }

        // --- MENU KONTEKSTOWE — tylko prawy przycisk
        if (e.button === 2) {
            e.preventDefault();
            let idx = points.findIndex(p => Math.hypot(mx - p.x, my - p.y) < 13);
            if (idx !== -1) {
                showContextMenu(e.clientX, e.clientY, [
                    {
                        label: "Usuń punkt",
                        onClick: () => {
                            if (points.length > 3) {
                                points.splice(idx, 1);
                                draw();
                            }
                        }
                    },
                    {
                        label: "Zaokrąglij róg (input)",
                        onClick: () => {
                            let val = prompt("Promień zaokrąglenia [m]:", points[idx].radius ? pxToMeters(points[idx].radius, pxPerMeter) : "0");
                            if (val !== null && !isNaN(val)) {
                                points[idx].radius = Math.max(0, metersToPx(Number(val), pxPerMeter));
                                draw();
                            }
                        }
                    }
                ]);
                return false;
            }
            for (let i = 0; i < points.length; i++) {
                let j = (i + 1) % points.length;
                let p1 = points[i], p2 = points[j];
                let dist = Math.abs((p2.y - p1.y) * mx - (p2.x - p1.x) * my + p2.x * p1.y - p2.y * p1.x) / Math.hypot(p2.y - p1.y, p2.x - p1.x);
                const midX = (p1.x + p2.x) / 2, midY = (p1.y + p2.y) / 2;
                if ((Math.hypot(mx - midX, my - midY) < 20) || (dist < 8 && Math.min(p1.x, p2.x) - 4 <= mx && mx <= Math.max(p1.x, p2.x) + 4 && Math.min(p1.y, p2.y) - 4 <= my && my <= Math.max(p1.y, p2.y) + 4)) {
                    showContextMenu(e.clientX, e.clientY, [
                        {
                            label: "Edytuj długość krawędzi",
                            onClick: () => {
                                let lenPx = edgeLength(p1, p2);
                                let lenM = pxToMeters(lenPx, pxPerMeter);
                                let input = prompt("Nowa długość krawędzi (m):", lenM.toFixed(2));
                                if (input && !isNaN(Number(input)) && Number(input) > 0.5) {
                                    let scale = Number(input) / lenM;
                                    p2.x = p1.x + (p2.x - p1.x) * scale;
                                    p2.y = p1.y + (p2.y - p1.y) * scale;
                                    draw();
                                }
                            }
                        },
                        {
                            label: "Dodaj punkt na krawędzi",
                            onClick: () => {
                                points.splice(j, 0, {x: mx, y: my, radius: 0});
                                draw();
                            }
                        },
                        {
                            label: "Wyprostuj krawędź (snap linia prosta)",
                            onClick: () => {
                                const dx = p2.x - p1.x, dy = p2.y - p1.y;
                                if (Math.abs(dx) > Math.abs(dy)) p2.y = p1.y;
                                else p2.x = p1.x;
                                draw();
                            }
                        }
                    ]);
                    return false;
                }
            }
            return false;
        }

        if (drawing) {
            let idx = points.findIndex(p => Math.hypot(mx - p.x, my - p.y) < 13);
            if (idx === 0 && points.length >= 3) {
                drawing = false;
                undoStack.push([...points.map(p => ({...p}))]);
                redoStack = [];
                draw();
                return;
            }
            if (idx !== -1) {
                draggingIdx = idx;
            } else {
                points.push({x: mx, y: my, radius: 0});
                undoStack.push([...points.map(p => ({...p}))]);
                redoStack = [];
            }
        } else {
            for (let i = 0; i < points.length; i++) {
                let j = (i + 1) % points.length;
                let p1 = points[i], p2 = points[j];
                const midX = (p1.x + p2.x) / 2, midY = (p1.y + p2.y) / 2;
                if (Math.hypot(mx - midX, my - midY) < 20) {
                    editingEdge = i;
                    let lenPx = edgeLength(p1, p2);
                    let lenM = pxToMeters(lenPx, pxPerMeter);
                    let input = prompt("Nowa długość krawędzi (m):", lenM.toFixed(2));
                    if (input && !isNaN(Number(input)) && Number(input) > 0.5) {
                        let scale = Number(input) / lenM;
                        p2.x = p1.x + (p2.x - p1.x) * scale;
                        p2.y = p1.y + (p2.y - p1.y) * scale;
                        undoStack.push([...points.map(p => ({...p}))]);
                        redoStack = [];
                        draw();
                    }
                    editingEdge = null;
                    draw();
                    return;
                }
            }
            let idx = points.findIndex(p => Math.hypot(mx - p.x, my - p.y) < 12);
            if (idx !== -1) {
                draggingIdx = idx;
                draw();
                return;
            }
            for (let i = 0; i < points.length; i++) {
                let j = (i + 1) % points.length;
                let p1 = points[i], p2 = points[j];
                let dist = Math.abs((p2.y - p1.y) * mx - (p2.x - p1.x) * my + p2.x * p1.y - p2.y * p1.x) / Math.hypot(p2.y - p1.y, p2.x - p1.x);
                if (dist < 8 && Math.min(p1.x, p2.x) - 4 <= mx && mx <= Math.max(p1.x, p2.x) + 4 && Math.min(p1.y, p2.y) - 4 <= my && my <= Math.max(p1.y, p2.y) + 4) {
                    points.splice(j, 0, {x: mx, y: my, radius: 0});
                    undoStack.push([...points.map(p => ({...p}))]);
                    redoStack = [];
                    draw();
                    return;
                }
            }
        }
        draw();
    };
    canvas.onmouseup = () => {
        draggingIdx = null;
        isPanning = false;
        document.body.style.cursor = "";
    };
    canvas.onmouseleave = () => {
        draggingIdx = null;
        hoverIdx = null;
        hoverEdge = null;
        isPanning = false;
        draw();
    };
    canvas.ondblclick = e => {
        const {x: mx, y: my} = getCursorCanvasCoords(e);
        let idx = points.findIndex(p => Math.hypot(mx - p.x, my - p.y) < 13);
        if (idx !== -1 && points.length > 3) {
            points.splice(idx, 1);
            undoStack.push([...points.map(p => ({...p}))]);
            redoStack = [];
            draw();
        }
    };

    window.onkeydown = e => {
        if (e.key === "Escape") {
            points = [];
            drawing = true;
            draw();
        }
        if (e.key === "Enter" && drawing && points.length >= 3) {
            drawing = false;
            undoStack.push([...points.map(p => ({...p}))]);
            redoStack = [];
            draw();
        }
        if (e.ctrlKey && e.key === "z") {
            if (undoStack.length) {
                redoStack.push([...points.map(p => ({...p}))]);
                points = undoStack.pop() || [];
                draw();
            }
        }
        if (e.ctrlKey && (e.key === "y" || (e.shiftKey && e.key === "Z"))) {
            if (redoStack.length) {
                undoStack.push([...points.map(p => ({...p}))]);
                points = redoStack.pop() || points;
                draw();
            }
        }
        if (e.key === "+" || e.key === "=") {
            zoom = Math.min(zoom * 1.2, 8);
            draw();
        }
        if (e.key === "-") {
            zoom = Math.max(zoom / 1.2, 0.1);
            draw();
        }
    };

    document.getElementById('save-shape-btn').onclick = () => {
        if (!points || points.length < 3 || drawing) {
            alert("Zamknij kształt (min 3 punkty)!");
            return;
        }
        const edges = [];
        for (let i = 0; i < points.length; i++) {
            let j = (i + 1) % points.length;
            let p1 = points[i], p2 = points[j];
            edges.push({
                from: i, to: j,
                length: pxToMeters(edgeLength(p1, p2), pxPerMeter),
                actualLengthPx: edgeLength(p1, p2)
            });
        }
        const project = {
            schemaVersion: 2,
            id: "prk_" + Date.now().toString(36) + "_" + Math.random().toString(36).substring(2, 8),
            name: place,
            place,
            createdAt: new Date().toISOString(),
            type: "custom",
            pxPerMeter,
            canvas: {
                polygon: points,
                width: canvas.width,
                height: canvas.height,
                edges
            },
            objects: [],
            stats: {
                area: lastArea,
                occupied: 0
            }
        };
        saveProjectToStorage(project);
        alert("Parkur został zapisany! Możesz go otworzyć z historii.");
    };

    document.getElementById('export-shape-btn').onclick = () => {
        if (!points || points.length < 3 || drawing) {
            alert("Zamknij kształt!");
            return;
        }
        const edges = [];
        for (let i = 0; i < points.length; i++) {
            let j = (i + 1) % points.length;
            let p1 = points[i], p2 = points[j];
            edges.push({
                from: i, to: j,
                length: pxToMeters(edgeLength(p1, p2), pxPerMeter),
                actualLengthPx: edgeLength(p1, p2)
            });
        }
        const exportObj = {
            schemaVersion: 2,
            id: "prk_" + Date.now().toString(36) + "_" + Math.random().toString(36).substring(2, 8),
            name: place,
            place,
            createdAt: new Date().toISOString(),
            type: "custom",
            pxPerMeter,
            canvas: {
                polygon: points,
                width: canvas.width,
                height: canvas.height,
                edges
            },
            objects: [],
            stats: {
                area: lastArea,
                occupied: 0
            }
        };
        const blob = new Blob([JSON.stringify(exportObj, null, 2)], {type: 'application/json'});
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `parkur_${Date.now()}.json`;
        a.click();
    };

    draw();
}
