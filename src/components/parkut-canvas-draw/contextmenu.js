let activeContextMenu = null;

export function closeContextMenu() {
    if (activeContextMenu) {
        activeContextMenu.remove();
        activeContextMenu = null;
    }
}

export function showContextMenu(x, y, items) {
    closeContextMenu();
    const menu = document.createElement('div');
    menu.className = 'pcd-context-menu';
    menu.style.left = x + 'px';
    menu.style.top = y + 'px';
    items.forEach(({label, onClick}) => {
        const el = document.createElement('div');
        el.className = 'pcd-context-menu-item';
        el.textContent = label;
        el.onclick = (e) => {
            e.stopPropagation();
            closeContextMenu();
            onClick();
        };
        menu.appendChild(el);
    });
    document.body.appendChild(menu);
    activeContextMenu = menu;
    setTimeout(() => {
        function handler(evt) {
            if (!menu.contains(evt.target)) closeContextMenu();
            document.removeEventListener('mousedown', handler);
        }

        document.addEventListener('mousedown', handler);
    }, 30);
}
