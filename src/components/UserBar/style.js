let injected;
export function injectStyles(){
  if(injected) return;
  const s=document.createElement('style');
  s.textContent=`
    .user-bar{display:flex;align-items:center;justify-content:flex-end;gap:16px;padding:12px 20px;background:var(--surface);box-shadow:0 2px 4px rgba(0,0,0,0.05);border-bottom:1px solid #e8e8e8;}
    .user-bar select{padding:6px 10px;font-size:1rem;border:1px solid #cfd6e6;border-radius:6px;}
    .user-bar button{background:var(--primary);color:var(--on-primary);border:none;border-radius:6px;padding:8px 14px;cursor:pointer;transition:background var(--transition);font-size:1rem;}
    .user-bar button:hover{background:var(--primary-dark);}
  `;
  document.head.appendChild(s);
  injected=true;
}
