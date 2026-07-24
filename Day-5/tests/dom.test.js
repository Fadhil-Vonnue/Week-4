import { renderHomePage } from "../js/pages/home.js";
import { navigate } from "../js/utils.js";
import { registerPath } from "../js/utils.js";
import { onRouteChange } from "../main.js";
import { renderDetailPage } from "../js/pages/detail.js";
import { renderListPage } from "../js/pages/list.js";
import { renderSettingsPage } from "../js/pages/settings.js";
import { renderWatchListPage } from "../js/pages/watchlist.js";
import { parseCSV } from "../js/utils.js";
import { resolve } from "node:dns";
const fetch = require("cross-fetch");
global.fetch = fetch;
describe("Test Routing", () => {
    document.body.innerHTML = `        <header>
            <div class="navLeft">
                <a id="home" href="">Home</a>
                <a id="list" href="">List</a>
                <a id="watchlist" href="">Watchlist</a>
            </div>
            <div class="navRight">
                <a id="settings" href="">
                    <img src="/assets/settings.svg" alt="" />
                </a>
            </div>
        </header>
        <main>
      
        </main>
        <div id="hidden">
            <div class="detailed-card">
                <div class="detailed-card-img">
                    <img
                        src="https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_QL75_UX380_CR0,0,380,562_.jpg"
                        alt=""
                    />
                </div>
                <div class="detailed-card-desc">
                    <h1 class="detail-title">Star Wars: Return of the Jedi</h1>
                    <hr />
                    <div class="card-rating">
                        9.3 &starf; 󠁯
                        <span>•󠁏󠁏 2,811,614 votes</span>
                    </div>
                    <div class="detail-span">Action, Adventure, Sci-Fi</div>
                    <div class="detail-span">English, Japanese, French</div>
                    <div class="detail-plot">
                        A thief who steals corporate secrets through the use of
                        dream-sharing technology is given the inverse task of
                        planting an idea into the mind of a CEO, but his tragic
                        past may doom the project and his team to disaster.
                    </div>
                    <div class="fields">
                        <span>Director</span><span>Christopher Nolan</span>
                    </div>
                    <div class="fields">
                        <span>Actors </span
                        ><span
                            >Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot
                            Page</span
                        >
                    </div>
                    <div class="fields">
                        <span>Release</span><span>16 Jul 2010</span>
                    </div>
                    <div class="fields">
                        <span>Runtime</span><span>148 min</span>
                    </div>
                    <div class="detailed-buttons">
                        <button>Watch Now</button><button>Favourite</button>
                    </div>
                </div>
            </div>
        </div>`;
    let routes = {};
    let a = 20;

    test("test home register", () => {
        let path = "/home";
        registerPath(routes, path, renderHomePage);
        expect(routes[path]).toBe(renderHomePage);
    });
    test("test list register", () => {
        let path = "/list";
        registerPath(routes, path, renderListPage);
        expect(routes[path]).toBe(renderListPage);
    });
    test("test list register", () => {
        let path = "/settings";
        registerPath(routes, path, renderSettingsPage);
        expect(routes[path]).toBe(renderSettingsPage);
    });
    test("test list register", () => {
        let path = "/watchlist";
        registerPath(routes, path, renderWatchListPage);
        expect(routes[path]).toBe(renderWatchListPage);
    });
    test("test detail register", () => {
        let path = "/detail";
        registerPath(routes, path, renderDetailPage);
        console.log(document.location.href);
        expect(routes[path]).toBe(renderDetailPage);
    });
    test("navigate to Home without params", async () => {
        const res = await navigate(routes, "/home");
        expect(res).toBe(true);
    });
    test("navigate to List without params", async () => {
        const res = await navigate(routes, "/list");
        expect(res).toBe(true);
    });
    test("navigate to Settings without params", async () => {
        const res = await navigate(routes, "/settings");
        expect(res).toBe(true);
    });
    test("navigate to Detail with params", async () => {
        const res = await navigate(routes, "/detail", {
            imdbID: "tt0111161",
        });
        expect(res).toBe(true);
    });
    test("navigate to WatchList without params", async () => {
        const res = await navigate(routes, "/watchlist");
        expect(res).toBe(true);
        document.querySelector(".openModal").click();
    });
    test("search movies", async () => {
        const form = document.querySelector("#movie-input");
        form.value = "Inception";
        document.querySelector(".searchbutton").click();
        await new Promise((resolve) => setTimeout(resolve, 3000));
    });
    test("URL change", () => {
        document.querySelectorAll("a").forEach((el) => {
            el.addEventListener("click", (e) => {
                e.preventDefault();
                const url = `/${event.currentTarget.id}`;
                if (url !== document.location.pathname) {
                    history.pushState({}, null, url);
                }
            });
        });
        const links = document.querySelectorAll("a");
        links[2].click();
        expect(document.location.pathname).toContain("watchlist");
    });
});
describe("Test State Manager", () => {});
