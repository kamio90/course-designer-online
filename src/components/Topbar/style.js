let injected;
export function injectStyles(){
  if(injected) return;
  const s = document.createElement('style');
  s.textContent = `
    .topbar{display:flex;gap:8px;align-items:center;background:var(--surface);padding:8px 12px;border-radius:12px;box-shadow:var(--shadow);}
    .topbar button{background:none;border:none;padding:6px 8px;border-radius:8px;cursor:pointer;transition:background var(--transition);font-size:1rem;}
    .topbar button:hover, .topbar button:focus{background:var(--primary-light);color:var(--on-primary);outline:none;}
  `;
  document.head.appendChild(s);
  injected = true;
}
