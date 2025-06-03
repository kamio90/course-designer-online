import { t } from '../../i18n.js';
import { injectStyles } from './style.js';

export const ZoneToolbar = {
  init(){
    const aside = document.getElementById('zone-toolbar');
    if(!aside) return;
    injectStyles();
    aside.innerHTML = `
      <div class="zone-toolbar">
        <div>${t('zone.add')}</div>
        <button data-zone="green">${t('zone.green')}</button>
        <button data-zone="altana">${t('zone.shelter')}</button>
        <button data-zone="oczko">${t('zone.pond')}</button>
        <button data-zone="drzewo">${t('zone.tree')}</button>
        <button data-zone="krzak">${t('zone.bush')}</button>
      </div>`;
  }
};
