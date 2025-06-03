/**
 * LoginForm component
 * - Renders login form UI using Material Design styles
 * - Handles form submission via fake async API
 * - Accessible with ARIA labels and keyboard navigation
 *
 * Props:
 *   container: HTMLElement to render into
 *   onSuccess: function(user)
 *   onRegister: function() - optional
 *   onForgot: function() - optional
 */
import { t } from '../../i18n.js';
import { injectStyles } from './style.js';
import { dispatch, actions } from '../../store.js';

function fakeLoginApi(username, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username && password) resolve({ username });
      else reject(new Error('invalid'));
    }, 400);
  });
}

export function renderLoginForm({ container, onSuccess, onRegister, onForgot } = {}) {
  if (!container) throw new Error('container required');
  injectStyles();
  container.innerHTML = `
    <form class="login-form" aria-labelledby="login-title">
      <h2 id="login-title">${t('login.title')}</h2>
      <label>
        <span>${t('login.username')}</span>
        <input type="text" name="username" required aria-required="true" />
      </label>
      <label>
        <span>${t('login.password')}</span>
        <input type="password" name="password" required aria-required="true" />
      </label>
      <button type="submit" class="primary">${t('login.submit')}</button>
      <button type="button" class="google">${t('login.google')}</button>
      <button type="button" class="facebook">${t('login.facebook')}</button>
      <div class="login-links">
        <a href="#" class="forgot">${t('login.forgot')}</a>
        <a href="#" class="register">${t('login.register')}</a>
      </div>
      <div class="login-error" aria-live="polite"></div>
    </form>
  `;
  const form = container.querySelector('.login-form');
  const errorBox = form.querySelector('.login-error');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    form.querySelector('button[type="submit"]').disabled = true;
    try {
      const user = await fakeLoginApi(data.get('username'), data.get('password'));
      dispatch(actions.setUser(user, 'fake-token'));
      if (onSuccess) onSuccess(user);
    } catch (err) {
      errorBox.textContent = t('login.error');
    } finally {
      form.querySelector('button[type="submit"]').disabled = false;
    }
  });
  form.querySelector('.register').addEventListener('click', (e) => {
    e.preventDefault();
    if (onRegister) onRegister();
  });
  form.querySelector('.forgot').addEventListener('click', (e) => {
    e.preventDefault();
    if (onForgot) onForgot();
  });
}
