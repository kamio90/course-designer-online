const initialState = {
  user: null,
  token: null,
  locale: 'en',
  view: null,
  area: null,
  objects: [],
  history: { undo: [], redo: [] },
  ui: {}
};

let state = { ...initialState };
const listeners = [];

export function getState() {
  return state;
}

export function subscribe(fn) {
  listeners.push(fn);
  return () => {
    const i = listeners.indexOf(fn);
    if (i >= 0) listeners.splice(i, 1);
  };
}

function notify() {
  for (const fn of listeners) fn(state);
}

function copy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function dispatch(action) {
  switch (action.type) {
    case 'SET_USER':
      state = { ...state, user: action.user, token: action.token };
      break;
    case 'LOGOUT':
      state = { ...state, user: null, token: null };
      break;
    case 'SET_LOCALE':
      state = { ...state, locale: action.locale };
      break;
    case 'SET_VIEW':
      state = { ...state, view: action.view };
      break;
    case 'PUSH_UNDO':
      state = {
        ...state,
        history: { undo: [...state.history.undo, action.snapshot], redo: [] }
      };
      break;
    case 'UNDO':
      if (!state.history.undo.length) break;
      {
        const prev = state.history.undo[state.history.undo.length - 1];
        state = {
          ...prev,
          history: {
            undo: state.history.undo.slice(0, -1),
            redo: [copy(state), ...state.history.redo]
          }
        };
      }
      break;
    case 'REDO':
      if (!state.history.redo.length) break;
      {
        const next = state.history.redo[0];
        state = {
          ...next,
          history: {
            undo: [...state.history.undo, copy(state)],
            redo: state.history.redo.slice(1)
          }
        };
      }
      break;
    default:
      return;
  }
  notify();
}

export const actions = {
  setUser: (user, token) => ({ type: 'SET_USER', user, token }),
  logout: () => ({ type: 'LOGOUT' }),
  setLocale: (locale) => ({ type: 'SET_LOCALE', locale }),
  setView: (view) => ({ type: 'SET_VIEW', view }),
  pushUndo: (snapshot) => ({ type: 'PUSH_UNDO', snapshot }),
  undo: () => ({ type: 'UNDO' }),
  redo: () => ({ type: 'REDO' })
};

export function resetStore() {
  state = { ...initialState };
  notify();
}
