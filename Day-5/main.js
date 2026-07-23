import { navigate } from "./js/utils.js";
import { registerPath } from "./js/utils.js";
import { renderHomePage } from "./js/pages/home.js";
import { renderDetailPage } from "./js/pages/detail.js";
import { renderListPage } from "./js/pages/list.js";
import { renderSettingsPage } from "./js/pages/settings.js";
import { createStore, reducer } from "./js/utils.js";

const initialState = {
    route: {
        path: "#home",
        params: {},
    },
};
const store = createStore(initialState, reducer);
const allRoutes = ["#home", "#list", "#detail", "#settings"];
const routes = {};
console.log(routes);
registerPath(routes, "#home", renderHomePage);
registerPath(routes, "#list", renderListPage);
registerPath(routes, "#detail", renderDetailPage);
registerPath(routes, "#settings", renderSettingsPage);
document.querySelectorAll("a").forEach((el) => {
    el.addEventListener("click", (e) => {
        e.preventDefault();
        // let pathname = document.location.href;
        // pathname = pathname.split("/").slice(0, -1).join("/");
        console.log(document.location.origin);
        const url = `#${event.target.id}`;
        if (url !== document.location.hash) {
            history.pushState({}, null, url);
            console.log(document.location.hash);
            onRouteChange(document.location.hash, {});
        }
    });
});
window.onload = (e) => {
    init();
};
function init() {
    if (!allRoutes.includes(window.location.hash)) {
        try {
            // let pathname = document.location.href;
            const url = `#home`;
            onRouteChange(`#home`, {});
            history.replaceState({}, "", url);
        } catch (err) {
            alert(err);
        }
    } else {
        onRouteChange(document.location.hash, {});
    }
}

function onRouteChange(path, params) {
    store.dispatch({
        type: "ROUTE_CHANGED",
        payload: {
            path,
            params,
        },
    });
}
store.subscribe((state) => {
    navigate(routes, state.route.path);
});
window.onpopstate = (event) => {
    onRouteChange(document.location.hash, {});
};
