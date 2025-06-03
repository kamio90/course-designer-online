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
  container.innerHTML = `
    <div class="course-list" aria-labelledby="courses-title">
      <header class="cl-header">
        <h2 id="courses-title">${t('courseList.title')}</h2>
        <button id="cl-new" aria-label="${t('courseList.newCourse')}">+</button>
      </header>
      <div class="cl-cards">
        ${projects.length ? projects.map(p => `
          <div class="cl-card" data-id="${p.id}">${p.name}</div>
        `).join('') : `<p class="cl-empty">${t('courseList.empty')}</p>`}
      </div>
    </div>
  `;
  container.querySelector('#cl-new').onclick = () => { if (onNew) onNew(); };
  container.querySelectorAll('.cl-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.dataset.id;
      const proj = projects.find(p => p.id === id);
      if (onOpen && proj) onOpen(proj);
    });
  });
}
