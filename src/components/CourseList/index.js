/**
 * CourseList component
 * Displays user's courses and allows creating a new one.
 * Props:
 *   container: HTMLElement to render into
 *   onNew: callback() when create button clicked
 *   onOpen: callback(project) when a course is selected
 */
import { t } from '../../i18n.js';
import { injectStyles } from './style.js';
import { getProjects } from '../../storage.js';

export function renderCourseList({ container, onNew, onOpen } = {}) {
  if (!container) throw new Error('container required');
  injectStyles();
  const projects = getProjects();
  const shared = [];
  let current = 'my';
  container.innerHTML = `
    <div class="course-list" aria-labelledby="courses-title">
      <header class="cl-header">
        <h2 id="courses-title">${t('courseList.title')}</h2>
        <input type="search" id="cl-search" placeholder="${t('courseList.search')}" aria-label="${t('courseList.search')}">
        <select id="cl-sort" aria-label="sort">
          <option value="name">Name</option>
          <option value="date">Date</option>
        </select>
        <button id="cl-new" aria-label="${t('courseList.newCourse')}">+</button>
      </header>
      <div class="cl-tabs">
        <button id="tab-my" class="active">${t('courseList.my')}</button>
        <button id="tab-shared">${t('courseList.shared')}</button>
      </div>
      <div class="cl-cards"></div>
      <div class="cl-menu" id="cl-menu"></div>
    </div>
  `;

  const cardsContainer = container.querySelector('.cl-cards');
  const menu = container.querySelector('#cl-menu');

  function showMenu(x, y, proj){
    menu.style.display='block';
    menu.style.left=x+'px';
    menu.style.top=y+'px';
    menu.innerHTML=`<button data-act="open">Open</button><button data-act="rename">Rename</button><button data-act="delete">Delete</button>`;
    function handler(e){
      if(e.target.tagName!=='BUTTON') return;
      const act=e.target.dataset.act;
      if(act==='open'&&onOpen) onOpen(proj);
      if(act==='rename'){ const n=prompt('Name',proj.name); if(n){ proj.name=n; renderList(); }}
      if(act==='delete'){ if(confirm('Delete?')){ const idx=list.indexOf(proj); if(idx>-1){ list.splice(idx,1); renderList(); }} }
      hide();
    }
    function hide(){ menu.style.display='none'; document.removeEventListener('click',hide); menu.removeEventListener('click',handler); }
    menu.addEventListener('click',handler);
    document.addEventListener('click',hide);
  }

  let list = projects.slice();
  function renderList(){
    const term = container.querySelector('#cl-search').value.toLowerCase();
    let filtered = list.filter(p=>p.name.toLowerCase().includes(term));
    const sortVal = container.querySelector('#cl-sort').value;
    filtered.sort((a,b)=> sortVal==='name'? a.name.localeCompare(b.name): (b.createdAt||'').localeCompare(a.createdAt||''));
    cardsContainer.innerHTML = filtered.length ? filtered.map(p => `<div class="cl-card" data-id="${p.id}">${p.name}</div>`).join('') : `<p class="cl-empty">${t('courseList.empty')}</p>`;
    cardsContainer.querySelectorAll('.cl-card').forEach(card => {
      const id = card.dataset.id;
      const proj = list.find(p => p.id === id);
      card.addEventListener('click', () => { if(onOpen) onOpen(proj); });
      card.addEventListener('contextmenu',e=>{ e.preventDefault(); showMenu(e.clientX,e.clientY,proj); });
    });
  }
  renderList();

  container.querySelector('#cl-new').onclick = () => { if (onNew) onNew(); };
  container.querySelector('#cl-search').addEventListener('input', renderList);
  container.querySelector('#cl-sort').addEventListener('change', renderList);
  container.querySelector('#tab-my').addEventListener('click',()=>{current='my';list=projects.slice(); container.querySelector('#tab-my').classList.add('active'); container.querySelector('#tab-shared').classList.remove('active'); renderList();});
  container.querySelector('#tab-shared').addEventListener('click',()=>{current='shared';list=shared.slice(); container.querySelector('#tab-shared').classList.add('active'); container.querySelector('#tab-my').classList.remove('active'); renderList();});
}
