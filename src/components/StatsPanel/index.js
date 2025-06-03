/**
 * StatsPanel component
 * Displays course statistics.
 * Props: container - element to render into
 *   stats - {area, perimeter, vertices, edges, occupied}
 */
import { t } from '../../i18n.js';
import { injectStyles } from './style.js';

export function renderStatsPanel({ container, stats = {} } = {}) {
  if (!container) throw new Error('container required');
  injectStyles();
  const { area = 0, perimeter = 0, vertices = 0, edges = 0, occupied = 0 } = stats;
  container.innerHTML = `
    <div class="stats-panel" aria-live="polite">
      <h3>${t('canvas.stats')}</h3>
      <div><b>${t('canvas.totalArea')}</b> <span id="sp-area">${area}</span> m²</div>
      <div><b>${t('canvas.perimeter')}</b> <span id="sp-perim">${perimeter}</span> m</div>
      <div><b>${t('canvas.vertices')}</b> <span id="sp-vert">${vertices}</span></div>
      <div><b>${t('canvas.edges')}</b> <span id="sp-edge">${edges}</span></div>
      <div><b>${t('canvas.occupied')}</b> <span id="sp-occ">${occupied}</span> m²</div>
    </div>`;
}

export function updateStats(container, stats){
  if(!container) return;
  if(stats.area!==undefined) container.querySelector('#sp-area').textContent = stats.area;
  if(stats.perimeter!==undefined) container.querySelector('#sp-perim').textContent = stats.perimeter;
  if(stats.vertices!==undefined) container.querySelector('#sp-vert').textContent = stats.vertices;
  if(stats.edges!==undefined) container.querySelector('#sp-edge').textContent = stats.edges;
  if(stats.occupied!==undefined) container.querySelector('#sp-occ').textContent = stats.occupied;
}
