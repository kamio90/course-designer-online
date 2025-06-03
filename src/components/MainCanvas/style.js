let injected;
export function injectStyles(){
  if(injected) return;
  const s=document.createElement('style');
  s.textContent=`
    .main-canvas{background:#e3ecfa;border:2px solid var(--primary);border-radius:12px;box-shadow:var(--shadow);display:block;outline:none;}
  `;
  document.head.appendChild(s);
  injected=true;
}
