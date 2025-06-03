import { injectTheme } from './constants/theme.js';
import { initUI } from './ui.js';
import { setupHistory } from './history.js';
import { startRouter, goTo } from './router.js';
import { renderLoginForm } from './components/LoginForm/index.js';
import { renderRegisterForm } from './components/RegisterForm/index.js';
import { renderCourseList } from './components/CourseList/index.js';
import { renderUserBar } from './components/UserBar/index.js';
import { renderNewProjectForm } from './components/NewProjectForm/index.js';
import { renderCourseAreaEditor } from './components/CourseAreaEditor/index.js';
import { renderCourseEditor } from './components/CourseEditor/index.js';

function viewLogin() {
  renderLoginForm({
    container: document.getElementById('main-content'),
    onSuccess: () => goTo(viewCourseList),
    onRegister: () => goTo(viewRegister)
  });
}

function viewRegister() {
  renderRegisterForm({
    container: document.getElementById('main-content'),
    onSuccess: () => goTo(viewCourseList),
    onLogin: () => goTo(viewLogin)
  });
}

function viewCourseList() {
  const main = document.getElementById('main-content');
  main.innerHTML = '<div id="dashboard"><div id="ub-container"></div><div id="cl-container"></div></div>';
  renderUserBar({
    container: main.querySelector('#ub-container'),
    onLogout: () => goTo(viewLogin)
  });
  renderCourseList({
    container: main.querySelector('#cl-container'),
    onNew: () => goTo(viewNewProject)
  });
}

function viewNewProject() {
  renderNewProjectForm({
    onSubmit: config => {
      if (config.mode === 'draw') goTo(viewCourseAreaEditor, config);
      else goTo(viewCourseEditor, config);
    }
  });
}

function viewCourseAreaEditor(config) {
  renderCourseAreaEditor(config);
}

function viewCourseEditor(config) {
  renderCourseEditor(config);
}

document.addEventListener('DOMContentLoaded', () => {
  injectTheme();
  initUI();
  startRouter(viewLogin);
  setupHistory();
});
