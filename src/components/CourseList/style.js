let injected;
export function injectStyles(){
  if(injected) return;
  const s=document.createElement('style');
  s.textContent=`
    .course-list{max-width:800px;width:100%;margin:0 auto;animation:fadeIn .3s;position:relative;}
    .cl-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;gap:12px;}
    .cl-header h2{margin:0;font-size:1.6rem;color:var(--primary-dark);flex:1;}
    .cl-tabs{display:flex;gap:6px;margin-bottom:12px;}
    .cl-tabs button{background:none;border:none;padding:6px 10px;border-radius:8px;cursor:pointer;font-size:1rem;transition:background var(--transition);}
    .cl-tabs button.active{background:var(--primary);color:var(--on-primary);}
    #cl-search{flex:2;padding:8px 12px;font-size:1rem;border:1px solid #cfd6e6;border-radius:6px;}
    #cl-sort{margin-left:auto;padding:8px 12px;border:1px solid #cfd6e6;border-radius:6px;}
    #cl-new{background:var(--primary);color:#fff;border:none;border-radius:50%;width:44px;height:44px;font-size:1.8rem;cursor:pointer;box-shadow:0 2px 8px rgba(21,101,192,0.2);transition:background var(--transition);}
    #cl-new:hover{background:var(--primary-dark);}
    .cl-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:16px;}
    .cl-card{background:var(--surface);border-radius:12px;padding:18px;box-shadow:var(--shadow);cursor:pointer;transition:box-shadow var(--transition);text-align:center;position:relative;}
    .cl-card:hover{box-shadow:0 6px 18px rgba(33,33,33,0.12);}
    .cl-empty{text-align:center;color:#666;font-size:1rem;}
    .cl-menu{position:absolute;background:var(--surface);box-shadow:var(--shadow);border-radius:6px;padding:4px 0;display:none;z-index:100;}
    .cl-menu button{display:block;width:100%;background:none;border:none;padding:6px 14px;text-align:left;font-size:0.95rem;cursor:pointer;}
    .cl-menu button:hover{background:var(--primary-light);color:var(--on-primary);}
  `;
  document.head.appendChild(s);
  injected=true;
}
