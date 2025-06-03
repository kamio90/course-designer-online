import { initUI } from './ui.js';
import { setupHistory } from './history.js';
import { startRouter, goTo } from './router.js';
import { renderLoginForm } from './components/LoginForm/index.js';
import { renderRegisterForm } from './components/RegisterForm/index.js';
import { renderCourseList } from './components/CourseList/index.js';
import { renderNewProjectForm } from './components/NewProjectForm/index.js';
import { renderParkurBuilder } from './components/ParkurBuilder/index.js';
import { renderParkurCanvasDraw } from './components/ParkurCanvasDraw/index.js';

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
  renderCourseList({
    container: document.getElementById('main-content'),
    onNew: () => goTo(viewNewProject)
  });
}

function viewNewProject() {
  renderNewProjectForm({
    onSubmit: config => {
      if (config.mode === 'draw') goTo(viewCanvasDraw, config);
      else goTo(viewBuilder, config);
    }
  });
}

function viewBuilder(config) {
  renderParkurBuilder(config);
}

function viewCanvasDraw(config) {
  renderParkurCanvasDraw(config);
}

document.addEventListener('DOMContentLoaded', () => {
  initUI();
  startRouter(viewLogin);
  setupHistory();
});
