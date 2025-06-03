let injected;
export function injectStyles(){
  if(injected) return;
  const s=document.createElement('style');
  s.textContent=`
    .sidebar{display:flex;flex-direction:column;gap:12px;background:var(--surface);padding:16px;border-radius:12px;box-shadow:var(--shadow);max-width:220px;}
    .sidebar button{background:#fff;border:1px solid var(--primary);color:var(--primary);border-radius:8px;padding:6px;margin:2px 0;cursor:pointer;transition:background var(--transition);}
    .sidebar button:hover,.sidebar button:focus{background:var(--primary-light);color:var(--on-primary);outline:none;}
    .sb-static.hidden{display:none;}
  `;
  document.head.appendChild(s);
  injected=true;
}
