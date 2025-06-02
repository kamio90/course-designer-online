const stack = [];

export function goTo(viewFn, params) {
    stack.push({viewFn, params});
    renderTop();
}

export function goBack() {
    if (stack.length > 1) {
        stack.pop();
        renderTop();
    }
}

function renderTop() {
    const top = stack[stack.length - 1];
    if (top) top.viewFn(top.params);
}

export function startRouter(viewFn, params) {
    stack.length = 0;
    stack.push({viewFn, params});
    renderTop();
}

export function getStack() {
    return stack.map(s => s.viewFn.name);
}
