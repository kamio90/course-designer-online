/**
 * Sidebar component for area/obstacle tools.
 * Props: container - HTMLElement to render into
 *   onAccept, onBack, onAddStatic
 * Returns API with setMode() and setAcceptEnabled()
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
  const acceptBtn=q('#sb-accept');
  const staticBox=q('#sb-static');
  if(onAccept) acceptBtn.onclick=()=>onAccept();
  if(onBack) q('#sb-back').onclick=onBack;
  if(onAddStatic){
    staticBox.querySelectorAll('button[data-type]').forEach(btn=>{
      btn.onclick=()=>onAddStatic(btn.dataset.type);
    });
  }
  return {
    setMode(mode){
      if(mode==='static') staticBox.classList.remove('hidden');
      else staticBox.classList.add('hidden');
    },
    setAcceptEnabled(en){ acceptBtn.disabled=!en; }
  };
}
