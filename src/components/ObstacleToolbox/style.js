let injected;
export function injectStyles(){
  if(injected) return;
  const s=document.createElement('style');
  s.textContent=`
    .obstacle-toolbox{background:var(--surface);padding:12px;border-radius:12px;box-shadow:var(--shadow);width:200px;}
    .obstacle-toolbox h3{margin:0 0 8px 0;font-size:1.2rem;color:var(--primary-dark);}
    .ot-list{display:flex;flex-direction:column;gap:6px;}
    .ot-item{background:#fff;border:1px solid var(--primary);border-radius:8px;padding:6px;cursor:grab;}
    .ot-item:active{cursor:grabbing;background:var(--primary-light);color:var(--on-primary);}
  `;
  document.head.appendChild(s);
  injected=true;
}
