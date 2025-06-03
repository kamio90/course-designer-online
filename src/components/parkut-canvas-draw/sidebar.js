export function renderSidebar({mode, onAcceptArea, onBackToEdit, onAddObject}) {
    let sidebar = document.getElementById('left-sidebar');
    if (sidebar) sidebar.remove();

    sidebar = document.createElement('aside');
    sidebar.id = 'left-sidebar';
    sidebar.className = 'pcd-sidebar';

    if (mode === 'edit-area') {
        sidebar.innerHTML = `
          <button id="accept-area-btn" class="mat-btn mat-primary" style="margin-bottom:24px;">
            ✅ Akceptuj obszar roboczy
          </button>
          <div class="sidebar-label">Narysuj obszar (zamknij kształt), potem kliknij Akceptuj</div>
        `;
    } else if (mode === 'static-objects') {
        sidebar.innerHTML = `
          <button id="back-to-edit-btn" class="mat-btn mat-outline" style="margin-bottom:28px;">
            ⬅️ Wróć do modyfikacji
          </button>
          <div class="sidebar-label" style="margin-bottom:22px;">Dodaj element stały:</div>
          <button class="mat-btn mat-secondary" id="add-obj-oczko">🟦 Oczko wodne</button>
          <button class="mat-btn mat-secondary" id="add-obj-krzak">🌳 Krzak</button>
          <button class="mat-btn mat-secondary" id="add-obj-trawa">🌿 Obszar trawiasty</button>
        `;
    }

    document.body.appendChild(sidebar);

    if (mode === 'edit-area') {
        document.getElementById('accept-area-btn').onclick = onAcceptArea;
    }
    if (mode === 'static-objects') {
        document.getElementById('back-to-edit-btn').onclick = onBackToEdit;
        document.getElementById('add-obj-oczko').onclick = () => onAddObject('oczko');
        document.getElementById('add-obj-krzak').onclick = () => onAddObject('krzak');
        document.getElementById('add-obj-trawa').onclick = () => onAddObject('trawa');
    }
}

// CSS
export const sidebarCSS = `
.pcd-sidebar {
    position: fixed;
    left: 0; top: 0; bottom: 0;
    width: 235px;
    background: #fff;
    border-right: 2px solid #e8e8e8;
    box-shadow: 4px 0 30px #003c8f08;
    padding: 44px 20px 22px 16px;
    z-index: 50;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
.sidebar-label {
    font-size: 1.10rem;
    color: #1976d2;
    margin-bottom: 14px;
    font-weight: 600;
}
@media (max-width: 800px) {
    .pcd-sidebar { position: static; width: 100vw; border-right: none; border-bottom: 2px solid #e8e8e8; flex-direction: row; gap:16px; padding: 13px 6px; }
}
`;

export function injectSidebarCSS() {
    if (document.getElementById('pcd-sidebar-style')) return;
    const style = document.createElement('style');
    style.id = 'pcd-sidebar-style';
    style.innerHTML = sidebarCSS;
    document.head.appendChild(style);
}
