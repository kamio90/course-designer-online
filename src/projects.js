import {saveProjectToStorage} from './storage.js';

export function saveProject(data) {
    saveProjectToStorage({
        ...data,
        createdAt: new Date().toISOString()
    });
}
