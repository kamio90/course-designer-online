const STORAGE_KEY = 'course-projects';

export function getProjects() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
        return [];
    }
}

export function saveProjectToStorage(proj) {
    const projects = getProjects();
    projects.push(proj);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function getProjectsGroupedByDate() {
    const projects = getProjects();
    const grouped = {};
    for (const p of projects) {
        const date = (p.createdAt || p.date || '').split('T')[0];
        if (!grouped[date]) grouped[date] = [];
        grouped[date].push(p);
    }
    return grouped;
}
