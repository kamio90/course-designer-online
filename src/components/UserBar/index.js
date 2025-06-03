import { t } from '../../i18n.js';
import { injectStyles } from './style.js';
import { getState, subscribe, dispatch, actions } from '../../store.js';
import { setLocale } from '../../i18n.js';

export function renderUserBar({ container, onLogout } = {}) {
  if (!container) throw new Error('container required');
  injectStyles();
  function update() {
    const { user, locale } = getState();
    container.innerHTML = `
      <div class="user-bar">
        <span class="ub-name">${user ? user.username || user.name || 'Guest' : 'Guest'}</span>
        <button id="ub-lang" aria-label="${t('userBar.language')}">${locale.toUpperCase()}</button>
        <button id="ub-logout" aria-label="${t('userBar.logout')}">${t('userBar.logout')}</button>
      </div>`;
    container.querySelector('#ub-logout').onclick = () => {
      dispatch(actions.logout());
      if (onLogout) onLogout();
    };
    container.querySelector('#ub-lang').onclick = () => {
      const newLocale = locale === 'en' ? 'pl' : 'en';
      dispatch(actions.setLocale(newLocale));
      setLocale(newLocale);
      update();
    };
  }
  update();
  return subscribe(update);
}
