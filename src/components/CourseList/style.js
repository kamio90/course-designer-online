let injected;
export function injectStyles(){
  if(injected) return;
  const s=document.createElement('style');
  s.textContent=`
    .course-list{max-width:800px;width:100%;margin:0 auto;animation:fadeIn .3s;}
    .cl-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;}
    .cl-header h2{margin:0;font-size:1.6rem;color:var(--primary-dark);}
    #cl-new{background:var(--primary);color:#fff;border:none;border-radius:50%;width:44px;height:44px;font-size:1.8rem;cursor:pointer;box-shadow:0 2px 8px rgba(21,101,192,0.2);transition:background var(--transition);}
    #cl-new:hover{background:var(--primary-dark);}
    .cl-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:16px;}
    .cl-card{background:var(--surface);border-radius:12px;padding:18px;box-shadow:var(--shadow);cursor:pointer;transition:box-shadow var(--transition);text-align:center;}
    .cl-card:hover{box-shadow:0 6px 18px rgba(33,33,33,0.12);}
    .cl-empty{text-align:center;color:#666;font-size:1rem;}
  `;
  document.head.appendChild(s);
  injected=true;
}
