import {getProjectsGroupedByDate} from './storage.js';

export function setupHistory() {
    const historyList = document.querySelector('.history-list');
    if (!historyList) return;

    const grouped = getProjectsGroupedByDate();
    historyList.innerHTML = '';

    Object.keys(grouped).sort((a, b) => b.localeCompare(a)).forEach(date => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="history-date">${date}</span>
            <ul>
                ${grouped[date].map(proj =>
            `<li>${proj.place || proj.name}</li>`
        ).join('')}
            </ul>
        `;
        historyList.appendChild(li);
    });
}
