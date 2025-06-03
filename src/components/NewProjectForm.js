import {attachBackButtonHandler, BackButton} from './BackButton.js';
import {renderParkurCanvasDraw} from './ParkurCanvasDraw.js';

export function renderNewProjectForm({onSubmit}) {
    const root = document.getElementById('main-content');
    root.innerHTML = `
      <form id="new-parkur-form" class="new-parkur-form">
        ${BackButton()}
        <h2>Nowy parkur</h2>
        <label>Miejsce <input name="place" required></label>
        <label>Tryb pola
          <select name="mode">
            <option value="draw">Rysuj kształt</option>
            <option value="rect">Kwadrat/prostokąt</option>
          </select>
        </label>
        <div id="dimensions">
          <label>Szerokość [m] <input name="width" type="number" min="1" value="40" required></label>
          <label>Wysokość [m] <input name="height" type="number" min="1" value="70" required></label>
        </div>
        <label>Przelicznik px/metr <input name="pxPerMeter" type="number" min="1" value="20" required></label>
        <button type="submit">Start</button>
      </form>
    `;

    attachBackButtonHandler(root);

    const form = root.querySelector('#new-parkur-form');
    const modeSelect = form.querySelector('select[name="mode"]');
    const dims = form.querySelector('#dimensions');
    modeSelect.addEventListener('change', () => {
        dims.style.display = (modeSelect.value === 'rect') ? 'block' : 'none';
    });
    dims.style.display = (modeSelect.value === 'rect') ? 'block' : 'none';
    form.addEventListener('submit', e => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(form));
        if (data.mode === "draw") {
            renderParkurCanvasDraw({
                place: data.place,
                pxPerMeter: Number(data.pxPerMeter)
            });
        } else {
            if (data.mode !== 'rect') {
                delete data.width;
                delete data.height;
            } else {
                data.width = Number(data.width);
                data.height = Number(data.height);
            }
            data.pxPerMeter = Number(data.pxPerMeter);
            onSubmit(data);
        }
    });
}
