import {goBack} from '../router.js';

export function BackButton() {
    return `
    <button type="button" class="back-btn" id="back-btn">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="#1565c0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>Wróć</span>
    </button>
    `;
}

export function attachBackButtonHandler(root = document) {
    const btn = root.querySelector('#back-btn');
    if (btn) btn.onclick = () => goBack();
}
