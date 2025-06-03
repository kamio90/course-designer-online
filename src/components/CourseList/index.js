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

export function renderCourseList({
  container,
  onNew,
  onOpen,
  onEdit,
  onShare,
  onDuplicate,
  onDelete
} = {}) {
  if (!container) throw new Error('container required');
  injectStyles();
  const projects = getProjects();
  const shared = [
    { id: 's1', name: 'Demo course', author: 'Alice', shares: 5 },
    { id: 's2', name: 'Training arena', author: 'Bob', shares: 2 }
  ];
  let current = 'my';
  container.innerHTML = `
    <div class="course-list" aria-labelledby="courses-title">
      <header class="cl-header">
        <h2 id="courses-title">${t('courseList.title')}</h2>
        <input type="search" id="cl-search" placeholder="${t('courseList.search')}" aria-label="${t('courseList.search')}">
        <label class="cl-sort-label">${t('courseList.sortLabel')}
          <select id="cl-sort">
            <option value="name">${t('courseList.sortName')}</option>
            <option value="date">${t('courseList.sortDate')}</option>
          </select>
        </label>
        <button id="cl-new" class="fab" aria-label="${t('courseList.newCourse')}">+</button>
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
    menu.innerHTML=`
      <button data-act="open">${t('courseList.open')}</button>
      <button data-act="edit">${t('courseList.edit')}</button>
      <button data-act="share">${t('courseList.share')}</button>
      <button data-act="duplicate">${t('courseList.duplicate')}</button>
      <button data-act="delete">${t('courseList.delete')}</button>`;
    function handler(e){
      if(e.target.tagName!=='BUTTON') return;
      const act=e.target.dataset.act;
      if(act==='open' && onOpen) onOpen(proj);
      if(act==='edit' && onEdit) onEdit(proj);
      if(act==='share' && onShare) onShare(proj);
      if(act==='duplicate'){
        const copy={...proj,id:'c'+Date.now(),name:proj.name+' copy',createdAt:new Date().toISOString()};
        projects.push(copy);
        if(onDuplicate) onDuplicate(copy);
        if(current==='my') renderList();
      }
      if(act==='delete'){
        if(confirm(t('courseList.deleteConfirm'))){
          const idx=list.indexOf(proj);
          if(idx>-1){ list.splice(idx,1); if(onDelete) onDelete(proj); renderList(); }
        }
      }
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
    cardsContainer.innerHTML = filtered.length ? filtered.map(p => {
      const meta = current==='shared' ? `<div class="cl-meta">${t('courseList.author')}: ${p.author} • ${t('courseList.shares')}: ${p.shares}</div>` : '';
      return `<div class="cl-card" data-id="${p.id}">
        <div class="cl-preview" aria-hidden="true"></div>
        <div class="cl-info"><h4>${p.name}</h4>${meta}</div>
        <button class="cl-menu-btn" aria-label="${t('courseList.menu')}">⋮</button>
      </div>`;}).join('') : `<p class="cl-empty">${t('courseList.empty')}</p>`;
    cardsContainer.querySelectorAll('.cl-card').forEach(card => {
      const id = card.dataset.id;
      const proj = list.find(p => p.id === id);
      card.querySelector('.cl-preview').addEventListener('click',()=>{ if(onOpen) onOpen(proj);});
      card.addEventListener('contextmenu',e=>{ e.preventDefault(); showMenu(e.clientX,e.clientY,proj); });
      card.querySelector('.cl-menu-btn').addEventListener('click',e=>{ e.stopPropagation(); const rect=e.target.getBoundingClientRect(); showMenu(rect.right,rect.bottom,proj); });
    });
  }
  renderList();

  const newBtn = container.querySelector('#cl-new');
  newBtn.addEventListener('click', e => {
    e.preventDefault();
    if (onNew) onNew();
  });
  container.querySelector('#cl-search').addEventListener('input', renderList);
  container.querySelector('#cl-sort').addEventListener('change', renderList);
  container.querySelector('#tab-my').addEventListener('click',()=>{current='my';list=projects.slice(); container.querySelector('#tab-my').classList.add('active'); container.querySelector('#tab-shared').classList.remove('active'); renderList();});
  container.querySelector('#tab-shared').addEventListener('click',()=>{current='shared';list=shared.slice(); container.querySelector('#tab-shared').classList.add('active'); container.querySelector('#tab-my').classList.remove('active'); renderList();});
}
