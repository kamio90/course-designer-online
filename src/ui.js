export function initUI() {
    const toolbar = document.getElementById('toolbar');
    const toggleBtn = document.getElementById('toggle-toolbar');
    const closeBtn = document.getElementById('close-toolbar');
    if (toggleBtn && toolbar) {
        toggleBtn.addEventListener('click', () => toolbar.classList.toggle('hidden'));
    }
    if (closeBtn && toolbar) {
        closeBtn.addEventListener('click', () => toolbar.classList.add('hidden'));
    }
}
