let injected;
export function injectStyles(){
  if(injected) return;
  const style = document.createElement('style');
  style.textContent = `
    .register-form{max-width:340px;margin:40px auto;padding:24px;background:var(--surface);box-shadow:var(--shadow);border-radius:12px;display:flex;flex-direction:column;gap:16px;animation:fadeIn .3s;}
    .register-form h2{margin:0;font-size:1.4rem;color:var(--primary-dark);text-align:center;}
    .register-form label{display:flex;flex-direction:column;font-size:.9rem;color:var(--primary-dark);}
    .register-form label.checkbox{flex-direction:row;align-items:center;gap:8px;}
    .register-form input[type="text"],
    .register-form input[type="email"],
    .register-form input[type="password"]{padding:8px 12px;font-size:1rem;border:1px solid #cfd6e6;border-radius:4px;}
    .register-form button{padding:10px 16px;font-size:1rem;border:none;border-radius:4px;cursor:pointer;transition:background var(--transition);}
    .register-form button.primary{background:var(--primary);color:var(--on-primary);}
    .register-form button.primary:hover{background:var(--primary-dark);}
    .register-links{display:flex;justify-content:flex-end;font-size:.85rem;}
    .register-links a{color:var(--primary);text-decoration:none;}
    .register-links a:hover{text-decoration:underline;}
    .register-error{color:#b00020;font-size:.9rem;min-height:1.2em;text-align:center;}
  `;
  document.head.appendChild(style);
  injected = true;
}
