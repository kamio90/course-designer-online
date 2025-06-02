import {initUI} from './ui.js';
import {setupHistory} from './history.js';
import {startRouter} from './router.js';
import {renderWelcomeBox} from './components/WelcomeBox.js';

document.addEventListener('DOMContentLoaded', () => {
    initUI();
    startRouter(renderWelcomeBox);
    setupHistory();
});
