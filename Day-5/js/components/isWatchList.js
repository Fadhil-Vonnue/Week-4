import { addToList } from "./addWatchlistCard.js";
import { fetchJSON1 } from "../utils.js";
import { createCard1 } from "./movieCards.js";
export async function isWatchList() {
    if (!document.location.pathname.includes("watchlist")) return;
    const datas = await JSON.parse(localStorage.getItem("watchList"));
    if (datas) {
        const spinTop = document.querySelector(".spintop");
        spinTop.classList.toggle("hidden");
        const frag = document.createDocumentFragment();
        for (let element of datas) {
            const url = `http://www.omdbapi.com/?apikey=d65b40df&i=${element}`;
            const data = await fetchJSON1(url);
            const card = createCard1({
                title: data.Title,
                year: data.Year,
                image: data.Poster,
                rating: data.imdbRating,
                genre: data.Genre.split(","),
                id: element,
            });
            card.dataset.id = element;
            frag.appendChild(card);
        }

        const mainElement = document.querySelector(".cards");
        spinTop.classList.toggle("hidden");
        mainElement.appendChild(frag);
    }
}
