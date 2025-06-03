import { attachBackButtonHandler, BackButton } from '../BackButton/index.js';
import { t } from '../../i18n.js';
import { injectStyles } from './style.js';

export function renderNewProjectForm({ onSubmit }) {
  const root = document.getElementById('main-content');
  injectStyles();
  root.innerHTML = `
    <form id="new-parkur-form" class="new-parkur-form">
      ${BackButton()}
      <h2>${t('newProject.title')}</h2>
      <label>${t('newProject.place')} <input name="place" required></label>
      <label>${t('newProject.modeLabel')}
        <select name="mode">
          <option value="draw">${t('newProject.modeDraw')}</option>
          <option value="rect">${t('newProject.modeRect')}</option>
        </select>
      </label>
      <div id="dimensions">
        <label>${t('newProject.width')} <input name="width" type="number" min="1" value="40" required></label>
        <label>${t('newProject.height')} <input name="height" type="number" min="1" value="70" required></label>
      </div>
      <label>${t('newProject.pxPerMeter')} <input name="pxPerMeter" type="number" min="1" value="20" required></label>
      <button type="submit">${t('newProject.start')}</button>
    </form>`;

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
    if (data.mode === 'draw') {
      onSubmit({ mode: 'draw', place: data.place, pxPerMeter: Number(data.pxPerMeter) });
    } else {
      if (data.mode === 'rect') {
        data.width = Number(data.width);
        data.height = Number(data.height);
      } else {
        delete data.width;
        delete data.height;
      }
      data.pxPerMeter = Number(data.pxPerMeter);
      onSubmit(data);
    }
  });
}
