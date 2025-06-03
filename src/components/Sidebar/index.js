/**
 * Sidebar component for area/obstacle tools.
 * Props: container - HTMLElement to render into
 *   onAccept, onBack, onAddStatic - callbacks
 */
import { t } from '../../i18n.js';
import { injectStyles } from './style.js';

export function renderSidebar({ container, onAccept, onBack, onAddStatic } = {}) {
  if(!container) throw new Error('container required');
  injectStyles();
  container.innerHTML = `
    <aside class="sidebar">
      <button id="sb-accept" class="mat-btn">${t('sidebar.acceptArea')}</button>
      <div class="sb-static hidden" id="sb-static">
        <div>${t('sidebar.addStatic')}</div>
        <button data-type="pond">${t('sidebar.pond')}</button>
        <button data-type="bush">${t('sidebar.bush')}</button>
        <button data-type="grass">${t('sidebar.grass')}</button>
      </div>
      <button id="sb-back" class="mat-btn">${t('sidebar.backEdit')}</button>
    </aside>`;
  const q=id=>container.querySelector(id);
  if(onAccept) q('#sb-accept').onclick = () => { q('#sb-static').classList.remove('hidden'); onAccept(); };
  if(onBack) q('#sb-back').onclick = onBack;
  if(onAddStatic){
    q('#sb-static').querySelectorAll('button[data-type]').forEach(btn=>{
      btn.onclick = ()=> onAddStatic(btn.dataset.type);
    });
  }
}
