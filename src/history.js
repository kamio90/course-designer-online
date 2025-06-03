import {getProjects, getProjectsGroupedByDate} from './storage.js';
import { renderParkurCanvasDraw } from './components/ParkurCanvasDraw/index.js';
import { renderParkurBuilder } from './components/ParkurBuilder/index.js';

export function setupHistory() {
    const historyList = document.querySelector('.history-list');
    if (!historyList) return;

    // Renderowanie historii
    const grouped = getProjectsGroupedByDate();
    historyList.innerHTML = '';

    Object.keys(grouped).sort((a, b) => b.localeCompare(a)).forEach(date => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="history-date">${date}</span>
            <ul>
                ${grouped[date].map(proj =>
            `<li data-id="${proj.id}" class="history-project-link" style="cursor:pointer;">
                        ${proj.place || proj.name}
                    </li>`
        ).join('')}
            </ul>
        `;
        historyList.appendChild(li);
    });

    // Obsługa kliknięcia w projekt w historii
    historyList.addEventListener('click', (e) => {
        const li = e.target.closest('li[data-id]');
        if (li && li.dataset.id) {
            const id = li.dataset.id;
            const project = getProjects().find(p => p.id === id);
            if (!project) return;

            if (project.type === "custom") {
                renderParkurCanvasDraw(project);
            } else if (project.type === "rect") {
                renderParkurBuilder(project);
            }
        }
    });
}
