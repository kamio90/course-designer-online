import { goTo } from '../../router.js';
import { renderNewProjectForm } from '../NewProjectForm/index.js';
import { renderParkurBuilder } from '../ParkurBuilder/index.js';
import { t } from '../../i18n.js';
import { injectStyles } from './style.js';

export function renderWelcomeBox(){
  const root=document.getElementById('main-content');
  injectStyles();
  root.innerHTML=`
    <div class="welcome-box">
      <h1>${t('welcome.title')}</h1>
      <p>${t('welcome.desc')}</p>
      <button id="create-project-btn">
        <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>
        <span>${t('welcome.newProject')}</span>
      </button>
    </div>`;
  document.getElementById('create-project-btn').onclick=()=>{
    goTo(renderNewProjectForm,{onSubmit:data=>goTo(renderParkurBuilder,data)});
  };
}
