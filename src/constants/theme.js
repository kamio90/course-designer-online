export const baseStyles = `
:root {
    --primary: #1565c0;
    --primary-dark: #003c8f;
    --primary-light: #5e92f3;
    --background: #f7fafc;
    --surface: #fff;
    --on-primary: #fff;
    --on-surface: #222;
    --shadow: 0 4px 32px 0 rgba(33, 33, 33, 0.08);
    --border-radius: 18px;
    --transition: 0.25s cubic-bezier(.38, 1.11, .47, 1.12);
}

html, body {
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: 'Inter', sans-serif;
    background: var(--background);
    color: var(--on-surface);
}

#app-root {
    display: flex;
    height: 100vh;
    width: 100vw;
    position: relative;
    overflow: hidden;
}

#toggle-toolbar {
    position: absolute;
    top: 24px;
    right: 24px;
    z-index: 30;
    background: var(--surface);
    border: none;
    border-radius: 50%;
    box-shadow: var(--shadow);
    padding: 10px;
    cursor: pointer;
    transition: background var(--transition);
    display: flex;
    align-items: center;
    justify-content: center;
}

#toggle-toolbar:hover {
    background: var(--primary-light);
}

#toggle-toolbar svg {
    display: block;
}

#toolbar {
    width: 340px;
    max-width: 90vw;
    background: var(--surface);
    box-shadow: -6px 0 24px rgba(33, 33, 33, 0.06);
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 40;
    display: flex;
    flex-direction: column;
    transition: transform var(--transition);
    transform: translateX(0);
    border-top-left-radius: var(--border-radius);
    border-bottom-left-radius: var(--border-radius);
}

#toolbar.hidden {
    transform: translateX(110%);
}

.toolbar-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 22px 24px 10px 24px;
    font-weight: 600;
    font-size: 1.12rem;
    border-bottom: 1px solid #e8e8e8;
}

#close-toolbar {
    background: none;
    border: none;
    font-size: 1.7rem;
    color: var(--primary-dark);
    cursor: pointer;
    padding: 2px 8px;
    border-radius: 8px;
    transition: background var(--transition);
}

#close-toolbar:hover {
    background: #e3edfa;
}

.history-list {
    list-style: none;
    padding: 0 0 12px 0;
    margin: 0;
    overflow-y: auto;
    flex: 1;
}

.history-list > li {
    padding: 18px 26px 8px 26px;
}

.history-date {
    font-weight: 500;
    font-size: 1rem;
    color: var(--primary-dark);
    margin-bottom: 6px;
    display: block;
}

.history-list ul {
    list-style: none;
    margin: 0;
    padding-left: 16px;
}

.history-list ul li {
    font-size: 0.98rem;
    padding: 2px 0;
    color: #444;
}

#main-content {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 0;
    min-width: 0;
}

.welcome-box {
    background: var(--surface);
    box-shadow: var(--shadow);
    border-radius: var(--border-radius);
    padding: 44px 40px 36px 40px;
    max-width: 430px;
    width: 100%;
    text-align: center;
    animation: fadeIn 0.6s cubic-bezier(.2, .8, .4, 1);
}

.welcome-box h1 {
    font-size: 2.35rem;
    font-weight: 700;
    margin: 0 0 16px 0;
}

.welcome-box p {
    font-size: 1.1rem;
    font-weight: 400;
    color: #63676d;
    margin-bottom: 30px;
    margin-top: 0;
}

#create-project-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.7em;
    background: var(--primary);
    color: var(--on-primary);
    border: none;
    font-size: 1.15rem;
    font-weight: 600;
    padding: 14px 34px;
    border-radius: 100px;
    box-shadow: 0 2px 8px 0 rgba(21, 101, 192, 0.13);
    cursor: pointer;
    transition: background var(--transition), box-shadow var(--transition);
}

#create-project-btn:hover {
    background: var(--primary-dark);
    box-shadow: 0 3px 12px 0 rgba(21, 101, 192, 0.19);
}

#create-project-btn svg {
    vertical-align: middle;
}

.builder-layout {
    display: flex;
    width: 100%;
    height: 100%;
    min-height: 540px;
}

#zone-toolbar {
    min-width: 170px;
    max-width: 210px;
    background: #e8f1fa;
    box-shadow: 2px 0 10px 0 rgba(21, 101, 192, 0.06);
    border-radius: 16px;
    margin: 32px 12px 32px 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 18px 12px 18px 12px;
    font-size: 1.01rem;
}

.zone-toolbar button {
    margin: 5px 0;
    width: 100%;
    background: #fff;
    border: 1.5px solid #1565c0;
    border-radius: 8px;
    padding: 6px 10px;
    color: #1565c0;
    font-weight: 600;
    cursor: pointer;
    transition: background .2s;
}

.zone-toolbar button:hover {
    background: #e0e7f8;
}

.canvas-wrap {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
}

#parkur-canvas {
    background: #e3ecfa;
    border: 2px solid #1565c0;
    border-radius: 16px;
    box-shadow: 0 4px 32px 0 rgba(33, 33, 33, 0.09);
    margin: 20px 0;
    display: block;
}

.new-parkur-form {
    background: var(--surface);
    box-shadow: var(--shadow);
    border-radius: var(--border-radius);
    padding: 30px 36px 22px 36px;
    width: 100%;
    max-width: 410px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 22px;
}

.new-parkur-form h2 {
    margin-top: 0;
    margin-bottom: 8px;
    font-size: 1.65rem;
    font-weight: 700;
    color: var(--primary-dark);
}

.new-parkur-form label {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: 1.07rem;
    font-weight: 500;
    color: #232b37;
    gap: 4px;
}

.new-parkur-form input, .new-parkur-form select {
    margin-top: 2px;
    font-size: 1.05rem;
    padding: 7px 11px;
    border: 1px solid #b8c3d3;
    border-radius: 8px;
    width: 100%;
    background: #f4f7fb;
    transition: border-color 0.2s;
}

.new-parkur-form input:focus, .new-parkur-form select:focus {
    outline: none;
    border-color: #1565c0;
}

.new-parkur-form button[type="submit"] {
    margin-top: 14px;
    padding: 12px 0;
    border-radius: 100px;
    background: var(--primary);
    color: #fff;
    border: none;
    font-size: 1.12rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
}

.new-parkur-form button[type="submit"]:hover {
    background: var(--primary-dark);
}

.back-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5em;
    background: #f4f7fb;
    color: #1565c0;
    border: none;
    font-size: 1.07rem;
    font-weight: 600;
    padding: 9px 20px 9px 14px;
    border-radius: 100px;
    box-shadow: 0 1px 5px 0 rgba(21, 101, 192, 0.10);
    cursor: pointer;
    transition: background 0.18s, box-shadow 0.16s, color 0.18s;
    outline: none;
    position: relative;
    margin-bottom: 12px;
    margin-top: 0;
    margin-left: 0;
    user-select: none;
    overflow: hidden;
}

.back-btn svg {
    flex-shrink: 0;
    display: inline-block;
    margin-right: 4px;
    transition: transform 0.22s cubic-bezier(.51, 1.28, .38, 1.17);
}

.back-btn:hover, .back-btn:focus {
    background: #e0e7f8;
    color: #003c8f;
    box-shadow: 0 4px 18px 0 rgba(21, 101, 192, 0.13);
}

.back-btn:active svg {
    transform: translateX(-4px) scale(0.97);
}

.pcd-root {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    height: 100%;
    min-height: 0;
    min-width: 0;
    background: #f8fafc;
}

.pcd-toolbar {
    display: flex;
    align-items: center;
    gap: 20px;
    background: #fff;
    padding: 14px 30px 14px 36px;
    box-shadow: 0 4px 18px 0 rgba(33, 33, 33, 0.05);
    border-bottom: 1.5px solid #e8e8e8;
    position: relative;
    z-index: 6;
}

.pcd-toolbar label {
    display: flex;
    align-items: center;
    gap: 7px;
    color: #1565c0;
    font-weight: 600;
    font-size: 1.07rem;
}

.pcd-main {
    display: flex;
    flex: 1;
    min-height: 0;
    min-width: 0;
    height: 100%;
    width: 100%;
}

.pcd-canvas-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    justify-content: center;
    padding: 28px 0 0 0;
    min-width: 0;
    min-height: 0;
    position: relative;
}

.pcd-canvas {
    background: #e3ecfa;
    border: 2px solid #1565c0;
    border-radius: 16px;
    box-shadow: 0 4px 32px 0 rgba(33, 33, 33, 0.09);
    margin: 0 0 16px 0;
    display: block;
    transition: box-shadow 0.18s;
}

.pcd-canvas-actions {
    display: flex;
    gap: 18px;
    margin-bottom: 16px;
}

.pcd-hints {
    margin-top: 12px;
    color: #606973;
    font-size: 1.01rem;
    text-align: center;
    max-width: 660px;
    font-weight: 500;
}

.pcd-stats-panel {
    min-width: 270px;
    max-width: 320px;
    background: #fff;
    box-shadow: -5px 0 30px #003c8f08;
    border-left: 1.5px solid #e8e8e8;
    padding: 28px 24px 22px 24px;
    font-size: 1.04rem;
    color: #183266;
    display: flex;
    flex-direction: column;
    position: relative;
    transition: right 0.24s cubic-bezier(.4, 2.2, .4, 1), max-width 0.18s;
    z-index: 5;
}

.pcd-stats-panel.collapsed {
    max-width: 35px !important;
    min-width: 35px !important;
    overflow: hidden;
    padding-left: 4px !important;
    padding-right: 4px !important;
}

.pcd-stats-panel h3 {
    margin-top: 2px;
    font-size: 1.20rem;
    color: #1565c0;
    font-weight: 700;
}

.pcd-stats-panel button.mat-mini {
    position: absolute;
    left: -35px;
    top: 24px;
    width: 28px;
    height: 28px;
    padding: 0;
    min-width: unset;
}

.mat-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.3em;
    border: none;
    outline: none;
    font-weight: 600;
    font-size: 1.08rem;
    padding: 9px 22px;
    border-radius: 100px;
    background: #e3ecfa;
    color: #1565c0;
    box-shadow: 0 1.5px 6px 0 rgba(21, 101, 192, 0.09);
    cursor: pointer;
    transition: background .18s, color .18s, box-shadow .16s;
}

.mat-btn:active {
    box-shadow: 0 1px 3px 0 rgba(21, 101, 192, 0.07);
}

.mat-btn:hover, .mat-btn:focus {
    background: #e0e7f8;
    color: #003c8f;
}

.mat-btn.mat-primary {
    background: #1565c0;
    color: #fff;
    box-shadow: 0 2px 8px 0 rgba(21, 101, 192, 0.12);
}

.mat-btn.mat-primary:hover, .mat-btn.mat-primary:focus {
    background: #003c8f;
    color: #fff;
}

.mat-btn.mat-outline {
    background: #fff;
    color: #1565c0;
    border: 1.2px solid #1565c0;
}

.mat-input {
    font-size: 1.06rem;
    padding: 6px 14px;
    border-radius: 8px;
    border: 1.2px solid #c5daf6;
    background: #f6f9ff;
    color: #183266;
    outline: none;
    margin-left: 4px;
    transition: border-color .18s;
}

.mat-input:focus {
    border-color: #1565c0;
}

@media (max-width: 900px) {
    .pcd-main {
        flex-direction: column;
    }

    .pcd-stats-panel {
        max-width: 99vw;
        min-width: 0;
        border-left: none;
        border-top: 2px solid #e8e8e8;
        box-shadow: 0 -3px 25px #003c8f13;
        margin-top: 14px;
    }

    .pcd-toolbar {
        padding: 10px 6px;
        font-size: 0.99rem;
    }
}

@media (max-width: 600px) {
    .pcd-toolbar label, .pcd-toolbar span {
        font-size: 0.93rem;
    }

    .mat-btn, .mat-input {
        font-size: 0.98rem;
        padding: 7px 13px;
    }

    .pcd-canvas-wrap {
        padding: 6px 0 0 0;
    }
}

#helpbox {
    position: absolute;
    top: -420px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 99;
    width: 420px;
    max-width: 99vw;
    background: #fff;
    box-shadow: 0 8px 48px #1565c058;
    border-radius: 18px;
    border: 1.5px solid #e8e8e8;
    opacity: 0;
    transition: top .38s cubic-bezier(.47, 1.36, .45, 1), opacity .18s;
}

#helpbox.show {
    top: 38px;
    opacity: 1;
}

.helpbox-content {
    padding: 28px 30px 18px 30px;
}

.helpbox-title {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 1.18rem;
    font-weight: 700;
    color: #1565c0;
    margin-bottom: 12px;
}

#helpbox-close-btn {
    margin-left: auto;
    border: none;
    background: none;
    color: #003c8f;
    font-size: 2.2rem;
    font-weight: bold;
    border-radius: 8px;
    cursor: pointer;
    transition: background .14s;
    padding: 0 6px;
}

#helpbox-close-btn:hover {
    background: #e3edfa;
}

.helpbox-body ul {
    margin: 7px 0 16px 22px;
    padding-left: 0;
    font-size: 0.98rem;
}

.helpbox-body li {
    margin-bottom: 3px;
}

.pcd-context-menu {
    position: fixed;
    background: #fff;
    border: 1.5px solid #cfd6e6;
    box-shadow: 0 10px 32px #003c8f22;
    border-radius: 12px;
    padding: 6px 0;
    z-index: 999;
    min-width: 210px;
    font-size: 1.07rem;
    animation: popfadein .22s cubic-bezier(.3, 1.3, .43, .97);
}

.pcd-context-menu-item {
    padding: 9px 22px;
    cursor: pointer;
    color: #1565c0;
    font-weight: 600;
    transition: background .13s, color .14s;
    border-radius: 8px;
}

.pcd-context-menu-item:hover {
    background: #e0e7f8;
    color: #003c8f;
}

.pcd-context-menu {
    position: fixed;
    background: #fff;
    border: 1.5px solid #cfd6e6;
    box-shadow: 0 10px 32px #003c8f22;
    border-radius: 12px;
    padding: 6px 0;
    z-index: 999;
    min-width: 210px;
    font-size: 1.07rem;
    animation: popfadein .22s cubic-bezier(.3, 1.3, .43, .97);
    user-select: none;
}

.pcd-context-menu-item {
    padding: 10px 26px;
    cursor: pointer;
    color: #1565c0;
    font-weight: 600;
    transition: background .13s, color .14s;
    border-radius: 8px;
}

.pcd-context-menu-item:hover {
    background: #e0e7f8;
    color: #003c8f;
}

@keyframes popfadein {
    from {
        opacity: 0;
        transform: scale(.93);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}


@keyframes popfadein {
    from {
        opacity: 0;
        transform: scale(.93);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}


@media (max-width: 640px) {
    #toolbar {
        width: 95vw;
        border-radius: 0;
    }

    .welcome-box, .new-parkur-form {
        padding: 18px 5px 12px 5px;
        max-width: 98vw;
    }

    .builder-layout {
        flex-direction: column;
    }

    #zone-toolbar {
        flex-direction: row;
        margin: 12px 2px;
        border-radius: 12px;
        max-width: 98vw;
        min-width: 0;
        gap: 7px;
        font-size: 0.98rem;
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(24px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
`;
export function injectTheme(){
  if(document.getElementById('theme-styles')) return;
  const s=document.createElement('style');
  s.id='theme-styles';
  s.textContent=baseStyles;
  document.head.appendChild(s);
}
