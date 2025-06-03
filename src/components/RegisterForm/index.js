/**
 * RegisterForm component
 * - Renders registration form UI using Material Design styles
 * - Validates inputs and submits via fake async API
 * - Accessible with ARIA labels and keyboard navigation
 *
 * Props:
 *   container: HTMLElement to render into
 *   onSuccess: function(user)
 *   onLogin: function() - optional
 */
import { t } from '../../i18n.js';
import { injectStyles } from './style.js';
import { dispatch, actions } from '../../store.js';

function fakeRegisterApi(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data.username && data.email && data.password) resolve(data);
      else reject(new Error('invalid'));
    }, 400);
  });
}

export function renderRegisterForm({ container, onSuccess, onLogin } = {}) {
  if (!container) throw new Error('container required');
  injectStyles();
  container.innerHTML = `
    <form class="register-form" aria-labelledby="register-title">
      <h2 id="register-title">${t('register.title')}</h2>
      <label>
        <span>${t('register.username')}</span>
        <input type="text" name="username" required aria-required="true" />
      </label>
      <label>
        <span>${t('register.email')}</span>
        <input type="email" name="email" required aria-required="true" />
      </label>
      <label>
        <span>${t('register.password')}</span>
        <input type="password" name="password" required aria-required="true" />
      </label>
      <label>
        <span>${t('register.confirm')}</span>
        <input type="password" name="confirm" required aria-required="true" />
      </label>
      <label class="checkbox">
        <input type="checkbox" name="tos" required aria-required="true" />
        <span>${t('register.tos')}</span>
      </label>
      <button type="submit" class="primary">${t('register.submit')}</button>
      <div class="register-links">
        <a href="#" class="login">${t('register.login')}</a>
      </div>
      <div class="register-error" aria-live="polite"></div>
    </form>
  `;
  const form = container.querySelector('.register-form');
  const errorBox = form.querySelector('.register-error');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    if (data.password !== data.confirm || !form.tos.checked) {
      errorBox.textContent = t('register.error');
      return;
    }
    form.querySelector('button[type="submit"]').disabled = true;
    try {
      const user = await fakeRegisterApi({
        username: data.username,
        email: data.email,
        password: data.password,
      });
      dispatch(actions.setUser(user, 'fake-token'));
      if (onSuccess) onSuccess(user);
    } catch (err) {
      errorBox.textContent = t('register.error');
    } finally {
      form.querySelector('button[type="submit"]').disabled = false;
    }
  });
  form.querySelector('.login').addEventListener('click', (e) => {
    e.preventDefault();
    if (onLogin) onLogin();
  });
}
