import { navigate } from "./js/utils.js";
import { registerPath } from "./js/utils.js";
import { renderHomePage } from "./js/pages/home.js";
import { renderDetailPage } from "./js/pages/detail.js";
import { renderListPage } from "./js/pages/list.js";
import { renderSettingsPage } from "./js/pages/settings.js";
import { createStore, reducer } from "./js/utils.js";
import { createCard } from "./js/components/movieCards.js";
import { renderWatchListPage } from "./js/pages/watchlist.js";
import { fetchJSON } from "./js/utils.js";
import { createSearchCard } from "./js/components/searchCards.js";
import { updateWatchList } from "./js/components/updateWatchList.js";
import { isWatchList } from "./js/components/isWatchList.js";
const initialState = {
    route: {
        path: "/home",
        params: {},
    },
    watchList: {
        list: new Set(),
        id: "",
        type: "Add",
    },
};
const datas = await JSON.parse(localStorage.getItem("watchList"));
if (datas) {
    initialState.watchList.list = new Set(datas);
}
const store = createStore(initialState, reducer);
const allRoutes = ["/home", "/list", "/detail", "/settings", "/watchlist"];
const routes = {};
console.log(routes);
registerPath(routes, "/home", renderHomePage);
registerPath(routes, "/list", renderListPage);
registerPath(routes, "/detail", renderDetailPage);
registerPath(routes, "/settings", renderSettingsPage);
registerPath(routes, "/watchlist", renderWatchListPage);
document.querySelectorAll("a").forEach((el) => {
    el.addEventListener("click", (e) => {
        e.preventDefault();
        const url = `/${event.currentTarget.id}`;
        if (url !== document.location.pathname) {
            history.pushState({}, null, url);
            onRouteChange(document.location.pathname, {});
        }
    });
});
window.onload = (e) => {
    init();
};
function init() {
    let pathname = document.location.pathname;
    let obj = {};
    if (pathname.includes(":")) {
        console.log("HEYYEYE");
        let pathnames = pathname.split("/");
        pathname = pathnames.slice(0, -1).join("/");
        let imdbId = pathnames[pathnames.length - 1].slice(1);
        obj = { imdbID: imdbId };
    }
    if (allRoutes.includes(pathname)) {
        onRouteChange(pathname, obj);
    } else {
        try {
            const url = `/home`;
            onRouteChange(`/home`, obj);
            history.replaceState({}, "", url);
        } catch (err) {
            alert(err);
        }
    }
    // if (!allRoutes.includes(window.location.pathname)) {
    //     try {
    //         const url = `/home`;
    //         onRouteChange(`/home`, {});
    //         history.replaceState({}, "", url);
    //     } catch (err) {
    //         alert(err);
    //     }
    // } else {
    //     onRouteChange(document.location.pathname, {});
    // }
}

export function onRouteChange(path, params) {
    store.dispatch({
        type: "ROUTE_CHANGED",
        payload: {
            path,
            params,
        },
    });
}
// export function onMovieAdded(movieList) {
//     store.dispatch({
//         type: "MOVIE_ADDED",
//         payload: movieList,
//     });
// }
export function onMovieAdded(movieId, list) {
    console.log("HEY ADDED MOVIEE");
    store.dispatch({
        type: "MOVIE_ADDED",
        payload: {
            id: movieId,
            type: "Add",
        },
    });
}
export function onMovieDelete(movieId) {
    store.dispatch({
        type: "MOVIE_ADDED",
        payload: {
            id: movieId,
            type: "Delete",
        },
    });
}
store.subscribe("ROUTE_CHANGED", (state) => {
    navigate(routes, state.route.path, state.route.params);
    isWatchList();
});
store.subscribe("MOVIE_ADDED", (state) => {
    updateWatchList(state.watchList);
});

window.onpopstate = (event) => {
    onRouteChange(document.location.pathname, {});
};
function createCard1() {
    const card = createCard();
    const cards = document.querySelector(".cards");
    cards.appendChild(card);
}

// Title: 'Inception', Year: '2010', imdbID: 'tt1375666', Type: 'movie', Poster: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3Nj…TcwNTI5OTM0Mw@@._V1_QL75_UX380_CR0,0,380,562_.jpg'
window.addEventListener("keydown", (e) => {
    const overlay = document.querySelector(".modalOverlay");
    if (overlay.style.display === "flex")
        if (e.key === "Escape") {
            overlay.style.display = "none";
        }
    if (e.key === "Enter") {
        console.log("HEYYUYUHOIH");
        overlay.querySelector(".searchbutton").click();
    }
});
