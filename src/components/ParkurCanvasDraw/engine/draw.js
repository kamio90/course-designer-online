import {edgeLength, polygonArea, pxToMeters} from './state.js';

// Tooltip enterprise-grade
export function drawTooltip(ctx, x, y, text, direction = "top") {
    ctx.save();
    ctx.font = "bold 13px Inter";
    const metrics = ctx.measureText(text);
    const padding = 8, height = 28;
    let tx = x - metrics.width / 2 - padding;
    let ty = y - (direction === "top" ? 36 : -8);
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

// Rysuje cały canvas: siatka, polygon, punkty, metry, tooltipy
export function drawAll(ctx, state) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.save();
    ctx.setTransform(state.zoom, 0, 0, state.zoom, state.panX, state.panY);

    // Siatka
    ctx.strokeStyle = "#1565c033";
    ctx.lineWidth = 1;
    for (let x = 0; x <= ctx.canvas.width; x += state.pxPerMeter) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, ctx.canvas.height);
        ctx.stroke();
    }
    for (let y = 0; y <= ctx.canvas.height; y += state.pxPerMeter) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(ctx.canvas.width, y);
        ctx.stroke();
    }

    // Polygon z zaokrągleniami
    if (state.points.length) {
        ctx.strokeStyle = "#1565c0";
        ctx.lineWidth = 2.6;
        ctx.beginPath();
        let n = state.points.length;
        for (let i = 0; i < n; i++) {
            let prev = state.points[(i - 1 + n) % n];
            let curr = state.points[i];
            let next = state.points[(i + 1) % n];
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
        if (!state.drawing) ctx.closePath();
        ctx.stroke();

        // KRAWĘDZIE + METRY + Tooltip na hover
        for (let i = 0; i < state.points.length; i++) {
            let j = (i + 1) % state.points.length;
            if (state.drawing && j === 0) break;
            let p1 = state.points[i], p2 = state.points[j];
            let lenPx = edgeLength(p1, p2);
            let lenM = pxToMeters(lenPx, state.pxPerMeter);
            const midX = (p1.x + p2.x) / 2, midY = (p1.y + p2.y) / 2;
            ctx.save();
            ctx.font = "bold 15px Inter";
            ctx.fillStyle = state.hoverEdge === i ? "#1fa870" : "#003c8f";
            ctx.strokeStyle = "#fff";
            ctx.lineWidth = 4;
            ctx.strokeText(lenM.toFixed(2) + "m", midX + 1, midY - 13 + 1);
            ctx.fillText(lenM.toFixed(2) + "m", midX, midY - 13);
            if (state.hoverEdge === i && state.hoverTooltip) {
                drawTooltip(ctx, midX, midY - 24, "Prawy klik: menu | Lewy klik: dodaj/edytuj");
            }
            ctx.restore();
        }
    }

    // Punkty + tooltip na hover
    state.points.forEach((p, idx) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, (idx === state.hoverIdx ? 11 : 8), 0, Math.PI * 2);
        ctx.fillStyle = idx === state.draggingIdx ? "#1fa870" : (idx === state.hoverIdx ? "#1565c0" : "#fff");
        ctx.fill();
        ctx.lineWidth = idx === state.hoverIdx ? 3 : 2;
        ctx.strokeStyle = idx === state.hoverIdx ? "#1fa870" : "#1565c0";
        ctx.stroke();
        ctx.font = "bold 12px Inter";
        ctx.fillStyle = "#222";
        ctx.textAlign = "center";
        ctx.fillText(idx + 1, p.x, p.y - 17);
        if ((p.radius || 0) > 0) {
            ctx.font = "10px Inter";
            ctx.fillStyle = "#1976d2";
            ctx.fillText("r=" + pxToMeters(p.radius, state.pxPerMeter) + "m", p.x, p.y + 18);
        }
        if (state.hoverIdx === idx && state.hoverTooltip) {
            drawTooltip(ctx, p.x, p.y - 28, "Prawy klik: menu | Lewy drag: przesuwaj punkt");
        }
    });

    ctx.restore();
}

// Aktualizuje statystyki DOM
export function updateStatsDOM(state, dom) {
    const area = state.points.length >= 3 ? polygonArea(state.points, state.pxPerMeter) : 0;
    const perim = state.points.length >= 2
        ? state.points.reduce((acc, pt, i, arr) => {
            let j = (i + 1) % arr.length;
            return acc + pxToMeters(edgeLength(pt, arr[j]), state.pxPerMeter);
        }, 0) : 0;
    if (dom.statsArea) dom.statsArea.textContent = area.toFixed(2);
    if (dom.statsLen) dom.statsLen.textContent = perim.toFixed(2);
    if (dom.statsPts) dom.statsPts.textContent = state.points.length;
    if (dom.statsEdges) dom.statsEdges.textContent = state.points.length;
    if (dom.statsOcc) dom.statsOcc.textContent = "–";
    state.lastArea = area;
}
