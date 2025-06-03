/**
 * ObstacleToolbox component
 * Displays draggable obstacle cards.
 * Props: container - HTMLElement
 *   obstacles - array of {id,name}
 *   onSelect(id)
 */
import { t } from '../../i18n.js';
import { injectStyles } from './style.js';

export function renderObstacleToolbox({container, obstacles=[], onSelect}={}){
  if(!container) throw new Error('container required');
  injectStyles();
  container.innerHTML=`
    <div class="obstacle-toolbox">
      <h3>${t('obstacleToolbox.title')}</h3>
      <div class="ot-list">
        ${obstacles.map(o=>`<button class="ot-item" data-id="${o.id}">${o.name}</button>`).join('')}
      </div>
    </div>`;
  if(onSelect){
    container.querySelectorAll('.ot-item').forEach(btn=>{
      btn.onmousedown=e=>{ e.preventDefault(); onSelect(btn.dataset.id); };
    });
  }
}
