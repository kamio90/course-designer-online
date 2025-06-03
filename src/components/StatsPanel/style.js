let injected;
export function injectStyles(){
  if(injected) return;
  const s=document.createElement('style');
  s.textContent=`
    .stats-panel{background:var(--surface);padding:12px 16px;border-radius:12px;box-shadow:var(--shadow);min-width:150px;font-size:0.95rem;}
    .stats-panel h3{margin-top:0;font-size:1.2rem;color:var(--primary-dark);}
    .stats-panel div{margin:4px 0;}
  `;
  document.head.appendChild(s);
  injected=true;
}
