import {saveProjectToStorage} from '../../storage.js';
import {t} from '../../i18n.js';
import {drawAll, updateStatsDOM} from './engine/draw.js';
import {setupToolbarEvents} from './engine/toolbar-events.js';
import {setupCanvasEvents} from './engine/canvas-events.js';
import {renderHelpBox} from '../HelpBox/index.js';
import {saveProjectToStorage} from '../../storage.js';
import {injectStyles} from './style.js';
import {t} from "../../i18n.js";

function centerViewOnPoints(state, dom) {
    if (!state.points.length) {
        state.panX = state.panY = 0;
        state.zoom = 1;
        return;
    }
    const minX = Math.min(...state.points.map(p => p.x));
    const maxX = Math.max(...state.points.map(p => p.x));
    const minY = Math.min(...state.points.map(p => p.y));
    const maxY = Math.max(...state.points.map(p => p.y));
    const cx = (minX + maxX) / 2, cy = (minY + maxY) / 2;
    const wrap = dom.canvas.parentElement;
    const wrapRect = wrap.getBoundingClientRect();
    state.panX = wrapRect.width / 2 - cx * state.zoom;
    state.panY = wrapRect.height / 2 - cy * state.zoom;
}

export function renderParkurCanvasDraw(config = {}) {
    injectStyles();
    const state = createParkurState(config);
    const dom = renderParkurDOM(state);

    function updateCanvas() {
        drawAll(dom.canvas.getContext('2d'), state);
        updateStatsDOM(state, dom);
    }

    setupToolbarEvents(state, dom, updateCanvas, {
        onSave: () => {
            if (!state.points || state.points.length < 3 || state.drawing) {
                alert(t('alert.closeShape'));
                return;
            }
            const edges = [];
            for (let i = 0; i < state.points.length; i++) {
                let j = (i + 1) % state.points.length;
                let p1 = state.points[i], p2 = state.points[j];
                edges.push({
                    from: i, to: j,
                    length: pxToMeters(edgeLength(p1, p2), state.pxPerMeter),
                    actualLengthPx: edgeLength(p1, p2)
                });
            }
            const project = {
                schemaVersion: 2,
                id: "prk_" + Date.now().toString(36) + "_" + Math.random().toString(36).substring(2, 8),
                name: state.place,
                place: state.place,
                createdAt: new Date().toISOString(),
                type: "custom",
                pxPerMeter: state.pxPerMeter,
                canvas: {
                    polygon: state.points,
                    width: dom.canvas.width,
                    height: dom.canvas.height,
                    edges
                },
                objects: [],
                stats: {
                    area: state.lastArea,
                    occupied: 0
                }
            };
            saveProjectToStorage(project);
            alert(t('alert.saved'));
        },
        onExport: () => {
            if (!state.points || state.points.length < 3 || state.drawing) {
                alert(t('alert.closeShapeExport'));
                return;
            }
            const edges = [];
            for (let i = 0; i < state.points.length; i++) {
                let j = (i + 1) % state.points.length;
                let p1 = state.points[i], p2 = state.points[j];
                edges.push({
                    from: i, to: j,
                    length: pxToMeters(edgeLength(p1, p2), state.pxPerMeter),
                    actualLengthPx: edgeLength(p1, p2)
                });
            }
            const exportObj = {
                schemaVersion: 2,
                id: "prk_" + Date.now().toString(36) + "_" + Math.random().toString(36).substring(2, 8),
                name: state.place,
                place: state.place,
                createdAt: new Date().toISOString(),
                type: "custom",
                pxPerMeter: state.pxPerMeter,
                canvas: {
                    polygon: state.points,
                    width: dom.canvas.width,
                    height: dom.canvas.height,
                    edges
                },
                objects: [],
                stats: {
                    area: state.lastArea,
                    occupied: 0
                }
            };
            const blob = new Blob([JSON.stringify(exportObj, null, 2)], {type: 'application/json'});
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = `parkur_${Date.now()}.json`;
            a.click();
        },
        onClear: () => {
            state.points = [];
            state.drawing = true;
            state.undoStack = [];
            state.redoStack = [];
            updateCanvas();
        }
    });

    setupCanvasEvents(state, dom, updateCanvas);

    // Center logic
    window.addEventListener('keydown', e => {
        if (e.key.toLowerCase() === 'f' && !e.ctrlKey && !e.metaKey) {
            centerViewOnPoints(state, dom);
            updateCanvas();
        }
    });
    dom.centerBtn.onclick = () => {
        centerViewOnPoints(state, dom);
        updateCanvas();
    };

    renderHelpBox();
    updateCanvas();
}
