import { t } from '../../i18n.js';
import { injectStyles } from './style.js';

export function renderHelpBox({ onClose } = {}) {
  const main = document.getElementById('main-content');
  if (!main || document.getElementById('helpbox')) return;
  injectStyles();
  const box = document.createElement('div');
  box.id = 'helpbox';
  box.innerHTML = `
    <div class="helpbox-content">
      <div class="helpbox-title">
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="#1565c0" stroke-width="2" />
          <text x="12" y="17" text-anchor="middle" fill="#1565c0" font-size="14" font-family="Inter" font-weight="bold">?</text>
        </svg>
        <span>${t('help.title')}</span>
        <button id="helpbox-close-btn" aria-label="${t('close')}">&times;</button>
      </div>
      <div class="helpbox-body">
        <b>${t('help.shortcuts')}</b>
        <ul>
          <li><b>Lewy klik</b> — dodaj punkt / przesuwaj punkt</li>
          <li><b>Klik w krawędź</b> — dodaj punkt na krawędzi</li>
          <li><b>Klik w metry</b> — edytuj długość krawędzi</li>
          <li><b>Double-click na punkcie</b> — usuń punkt</li>
          <li><b>Drag punktu</b> — przesuwaj (Shift: snap do siatki)</li>
          <li><b>Alt + Drag punktu</b> — zaokrąglaj róg</li>
          <li><b>Prawy klik na punkcie/krawędzi</b> — menu akcji (usuń, zaokrąglij, dodaj, wyprostuj...)</li>
          <li><b>Ctrl+Z / Ctrl+Y</b> — cofnij / ponów</li>
          <li><b>ESC</b> — anuluj rysowanie/edycję</li>
          <li><b>ENTER</b> — zamknij kształt</li>
          <li><b>Space+Drag / środkowy przycisk / touchpad drag</b> — przesuwanie (panning)</li>
          <li><b>Scroll/Wheel / Pinch</b> — zoom + przesuwanie</li>
          <li><b>+</b> lub <b>-</b> — zoom in/out</li>
          <li><b>F</b> — <b>Wyśrodkuj widok</b> (lub ikonka na pasku narzędzi)</li>
        </ul>
        <b>${t('help.tips')}</b>
        <ul>
          <li>Panel statystyk możesz schować / pokazać przyciskiem po prawej</li>
          <li>Eksportuj parkur do JSON jednym kliknięciem</li>
        </ul>
      </div>
    </div>`;
  main.prepend(box);
  setTimeout(() => box.classList.add('show'), 30);
  box.querySelector('#helpbox-close-btn').onclick = () => {
    box.classList.remove('show');
    setTimeout(() => box.remove(), 300);
    if (onClose) onClose();
  };
}
