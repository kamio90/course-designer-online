import {goTo} from '../router.js';
import {renderNewProjectForm} from './NewProjectForm.js';

export function renderWelcomeBox() {
    const root = document.getElementById('main-content');
    root.innerHTML = `
        <div class="welcome-box">
            <h1>Course Designer Online</h1>
            <p>Start designing your new equestrian course or browse your previous arenas.</p>
            <button id="create-project-btn">
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>
                <span>Nowy projekt parkuru</span>
            </button>
        </div>
    `;
    // Teraz zawsze działa
    document.getElementById('create-project-btn').onclick = () => {
        goTo(renderNewProjectForm, {
            onSubmit: (data) => {
                // Ten callback routerowy — przechodzimy do buildera
                const {renderParkurBuilder} = require('./ParkurBuilder.js');
                goTo(renderParkurBuilder, data);
            }
        });
    };
}
