export function registerPath(routes, path, component) {
    routes[path] = component;
}

export function navigate(routes, path) {
    console.log(path, routes, "navi");
    let fn = routes[path];
    console.log(fn);
    if (fn) {
        console.log("YESS");
        fn();
        return true;
    } else {
        console.log("NO");
        return false;
    }
}
export function createButton() {}

export function createCard() {}

export function createModal() {}

export function fetchJSON(url) {}
export function reducer(state, action) {
    switch (action.type) {
        case "ROUTE_CHANGED":
            return { ...state, route: action.payload };
        default:
            return state;
    }
}
export function createStore(initialState, reducer) {
    let state = initialState;
    let listeners = new Set();
    return {
        getState() {
            return state;
        },
        dispatch(action) {
            state = reducer(state, action);
            listeners.forEach((listener) => listener(state));
        },
        subscribe(listener) {
            listeners.add(listener);
            return () => listeners.delete(listener);
        },
    };
}
