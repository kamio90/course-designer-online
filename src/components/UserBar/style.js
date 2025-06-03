let injected;
export function injectStyles(){
  if(injected) return;
  const s=document.createElement('style');
  s.textContent=`
    .user-bar{display:flex;align-items:center;gap:12px;margin:8px 16px;}
    .user-bar button{background:var(--primary);color:var(--on-primary);border:none;border-radius:8px;padding:4px 10px;cursor:pointer;font-size:0.9rem;transition:background var(--transition);}
    .user-bar button:hover{background:var(--primary-dark);}
  `;
  document.head.appendChild(s);
  injected=true;
}
