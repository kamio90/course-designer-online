import { renderHelpBox } from '../HelpBox/index.js';

export function setupToolbarEvents(state, dom, updateCanvas, {onSave, onExport, onClear}) {
    dom.scaleSelect.value = state.pxPerMeter;
    dom.widthInput.value = Math.round(state.width / state.pxPerMeter);
    dom.heightInput.value = Math.round(state.height / state.pxPerMeter);

    dom.scaleSelect.onchange = function () {
        state.pxPerMeter = Number(this.value);
        dom.canvas.width = Number(dom.widthInput.value) * state.pxPerMeter;
        dom.canvas.height = Number(dom.heightInput.value) * state.pxPerMeter;
        updateCanvas();
    };
    dom.resizeBtn.onclick = function () {
        const w = Number(dom.widthInput.value);
        const h = Number(dom.heightInput.value);
        dom.canvas.width = w * state.pxPerMeter;
        dom.canvas.height = h * state.pxPerMeter;
        updateCanvas();
    };
    dom.zoomInBtn.onclick = function () {
        state.zoom = Math.min(state.zoom * 1.2, 8);
        updateCanvas();
    };
    dom.zoomOutBtn.onclick = function () {
        state.zoom = Math.max(state.zoom / 1.2, 0.1);
        updateCanvas();
    };
    dom.centerBtn.onclick = () => {
    }; // center logic jest teraz w głównym komponencie!
    dom.helpBtn.onclick = () => renderHelpBox();

    dom.saveBtn.onclick = () => {
        if (onSave) onSave();
    };
    dom.exportBtn.onclick = () => {
        if (onExport) onExport();
    };

    dom.clearBtn.onclick = () => {
        if (onClear) onClear();
    };

    dom.toggleStatsBtn.onclick = () => {
        dom.statsPanel.classList.toggle('collapsed');
    };

    window.addEventListener('keydown', e => {
        if (e.key.toLowerCase() === 'c' && !e.ctrlKey && !e.metaKey) {
            if (onClear) onClear();
        }
    });
}
