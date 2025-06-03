import {showContextMenu} from './contextmenu.js';
import {edgeLength, metersToPx, pxToMeters} from './state.js';

export function setupCanvasEvents(state, dom, updateCanvas) {
    let altDragRadius = null;

    // ---- PAN/DRAG/ZOOM ----
    dom.canvas.addEventListener('mousedown', e => {
        const rect = dom.canvas.getBoundingClientRect();
        const mx = (e.clientX - rect.left - state.panX) / state.zoom;
        const my = (e.clientY - rect.top - state.panY) / state.zoom;

        // Alt+Drag = zmiana promienia rogu
        if (e.button === 0 && e.altKey && !state.drawing) {
            let idx = state.points.findIndex(p => Math.hypot(mx - p.x, my - p.y) < 13);
            if (idx !== -1) {
                altDragRadius = idx;
                return;
            }
        }

        if (e.button === 1 || (e.button === 0 && (e.ctrlKey || e.shiftKey))) {
            state.isPanning = true;
            state.panOrigin = {x: e.clientX - state.panX, y: e.clientY - state.panY};
            document.body.style.cursor = 'grab';
            return;
        }

        // LPM: dodawanie punktów, drag punktu, zamykanie poligonu
        if (e.button === 0 && !e.ctrlKey && !e.shiftKey && !state.isPanning && !e.altKey) {
            if (state.drawing) {
                let idx = state.points.findIndex(p => Math.hypot(mx - p.x, my - p.y) < 13);
                if (idx === 0 && state.points.length >= 3) {
                    state.drawing = false;
                    state.undoStack.push([...state.points.map(p => ({...p}))]);
                    state.redoStack = [];
                    updateCanvas();
                    return;
                }
                if (idx !== -1) {
                    state.draggingIdx = idx;
                } else {
                    state.points.push({x: mx, y: my, radius: 0});
                    state.undoStack.push([...state.points.map(p => ({...p}))]);
                    state.redoStack = [];
                }
            } else {
                let idx = state.points.findIndex(p => Math.hypot(mx - p.x, my - p.y) < 13);
                if (idx !== -1) {
                    state.draggingIdx = idx;
                    updateCanvas();
                    return;
                }
            }
            updateCanvas();
        }
    });

    dom.canvas.addEventListener('mousemove', e => {
        if (state.isPanning) {
            state.panX = e.clientX - state.panOrigin.x;
            state.panY = e.clientY - state.panOrigin.y;
            updateCanvas();
        } else if (altDragRadius !== null) {
            const rect = dom.canvas.getBoundingClientRect();
            const mx = (e.clientX - rect.left - state.panX) / state.zoom;
            const my = (e.clientY - rect.top - state.panY) / state.zoom;
            let p = state.points[altDragRadius];
            let r = Math.hypot(mx - p.x, my - p.y);
            p.radius = Math.max(0, Math.min(r, 80));
            updateCanvas();
        } else if (state.draggingIdx !== null) {
            const rect = dom.canvas.getBoundingClientRect();
            const mx = (e.clientX - rect.left - state.panX) / state.zoom;
            const my = (e.clientY - rect.top - state.panY) / state.zoom;
            state.points[state.draggingIdx].x = mx;
            state.points[state.draggingIdx].y = my;
            updateCanvas();
        }
    });

    dom.canvas.addEventListener('mouseup', () => {
        altDragRadius = null;
        state.draggingIdx = null;
        state.isPanning = false;
        document.body.style.cursor = '';
    });

    // ---- CONTEXT MENU ----
    dom.canvas.addEventListener('contextmenu', e => {
        e.preventDefault();
        const rect = dom.canvas.getBoundingClientRect();
        const mx = (e.clientX - rect.left - state.panX) / state.zoom;
        const my = (e.clientY - rect.top - state.panY) / state.zoom;

        // Na punkcie
        let idx = state.points.findIndex(p => Math.hypot(mx - p.x, my - p.y) < 13);
        if (idx !== -1) {
            showContextMenu(e.clientX, e.clientY, [
                {
                    label: "Usuń punkt",
                    onClick: () => {
                        if (state.points.length > 3) {
                            state.points.splice(idx, 1);
                            state.draggingIdx = null;
                            state.hoverIdx = null;
                            updateCanvas();
                        }
                    }
                },
                {
                    label: "Zaokrąglij róg (input)",
                    onClick: () => {
                        let val = prompt("Promień zaokrąglenia [m]:", state.points[idx].radius ? pxToMeters(state.points[idx].radius, state.pxPerMeter) : "0");
                        if (val !== null && !isNaN(val)) {
                            state.points[idx].radius = Math.max(0, metersToPx(Number(val), state.pxPerMeter));
                            updateCanvas();
                        }
                    }
                }
            ]);
            return false;
        }
        // Na krawędzi
        for (let i = 0; i < state.points.length; i++) {
            let j = (i + 1) % state.points.length;
            let p1 = state.points[i], p2 = state.points[j];
            let dist = Math.abs((p2.y - p1.y) * mx - (p2.x - p1.x) * my + p2.x * p1.y - p2.y * p1.x) / Math.hypot(p2.y - p1.y, p2.x - p1.x);
            const midX = (p1.x + p2.x) / 2, midY = (p1.y + p2.y) / 2;
            if ((Math.hypot(mx - midX, my - midY) < 20) || (dist < 8 && Math.min(p1.x, p2.x) - 4 <= mx && mx <= Math.max(p1.x, p2.x) + 4 && Math.min(p1.y, p2.y) - 4 <= my && my <= Math.max(p1.y, p2.y) + 4)) {
                showContextMenu(e.clientX, e.clientY, [
                    {
                        label: "Edytuj długość krawędzi",
                        onClick: () => {
                            let lenPx = edgeLength(p1, p2);
                            let lenM = pxToMeters(lenPx, state.pxPerMeter);
                            let input = prompt("Nowa długość krawędzi (m):", lenM.toFixed(2));
                            if (input && !isNaN(Number(input)) && Number(input) > 0.5) {
                                let scale = Number(input) / lenM;
                                p2.x = p1.x + (p2.x - p1.x) * scale;
                                p2.y = p1.y + (p2.y - p1.y) * scale;
                                updateCanvas();
                            }
                        }
                    },
                    {
                        label: "Dodaj punkt na krawędzi",
                        onClick: () => {
                            state.points.splice(j, 0, {x: mx, y: my, radius: 0});
                            updateCanvas();
                        }
                    },
                    {
                        label: "Wyprostuj krawędź (snap linia prosta)",
                        onClick: () => {
                            const dx = p2.x - p1.x, dy = p2.y - p1.y;
                            if (Math.abs(dx) > Math.abs(dy)) p2.y = p1.y;
                            else p2.x = p1.x;
                            updateCanvas();
                        }
                    }
                ]);
                return false;
            }
        }
        return false;
    });

    // ---- WHEEL/ZOOM (touchpad/wheel) ----
    dom.canvas.addEventListener('wheel', (e) => {
        if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            const delta = -e.deltaY || e.wheelDelta;
            if (delta > 0) state.zoom = Math.min(state.zoom * 1.15, 8);
            else state.zoom = Math.max(state.zoom / 1.15, 0.1);
            updateCanvas();
        } else if (e.shiftKey) {
            e.preventDefault();
            state.panX -= e.deltaY;
            updateCanvas();
        } else {
            state.panY -= e.deltaY;
            updateCanvas();
        }
    }, {passive: false});

    // ---- SHORTCUTS: center, zoom, etc ----
    window.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === 'f' && !e.ctrlKey && !e.metaKey) {
            state.zoom = 1;
            state.panX = state.panY = 0;
            if (dom.canvas && dom.canvas.parentElement) {
                const wrap = dom.canvas.parentElement;
                const wrapRect = wrap.getBoundingClientRect();
                state.panX = (wrapRect.width / 2 - dom.canvas.width / 2);
                state.panY = (wrapRect.height / 2 - dom.canvas.height / 2);
            }
            updateCanvas();
        }
        if (e.key === "+" || e.key === "=") {
            state.zoom = Math.min(state.zoom * 1.2, 8);
            updateCanvas();
        }
        if (e.key === "-") {
            state.zoom = Math.max(state.zoom / 1.2, 0.1);
            updateCanvas();
        }
    });
}
