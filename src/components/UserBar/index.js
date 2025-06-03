/**
 * UserBar component
 * Displays logged-in user name, language switcher, and logout button.
 * Props:
 *   container: HTMLElement to render into (required)
 *   onLogout: optional callback when user logs out
 */
import { injectStyles } from './style.js';
import { getState, dispatch, actions } from '../../store.js';
import { t, setLocale } from '../../i18n.js';

export function renderUserBar({ container, onLogout } = {}) {
  if (!container) throw new Error('container required');
  injectStyles();
  const state = getState();
  const userName = state.user ? state.user.username || state.user.name || '' : '';
  const avatar = userName ? userName[0].toUpperCase() : '?';
  container.innerHTML = `
    <div class="user-bar">
      <span class="ub-avatar" aria-label="${t('userBar.avatar')}">${avatar}</span>
      <span class="ub-user">${userName}</span>
      <select class="ub-lang" aria-label="${t('userBar.language')}">
        <option value="en"${state.locale === 'en' ? ' selected' : ''}>${t('userBar.english')}</option>
        <option value="pl"${state.locale === 'pl' ? ' selected' : ''}>${t('userBar.polish')}</option>
      </select>
      <button id="ub-logout" aria-label="${t('userBar.logout')}">${t('userBar.logout')}</button>
    </div>
  `;
  const langSel = container.querySelector('.ub-lang');
  langSel.addEventListener('change', () => {
    const lang = langSel.value;
    setLocale(lang);
    dispatch(actions.setLocale(lang));
  });
  const logoutBtn = container.querySelector('#ub-logout');
  logoutBtn.addEventListener('click', () => {
    dispatch(actions.logout());
    if (onLogout) onLogout();
  });
}
