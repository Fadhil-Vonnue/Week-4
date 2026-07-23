import { fetchJSON1 } from "../utils.js";
import { createCard1 } from "./movieCards.js";

export async function addToList(id) {
    const url = `http://www.omdbapi.com/?apikey=d65b40df&i=${id}`;
    const data = await fetchJSON1(url);
    const card = createCard1({
        title: data.Title,
        year: data.Year,
        image: data.Poster,
        rating: data.imdbRating,
        genre: data.Genre.split(","),
        id,
    });
    card.dataset.id = id;
    const mainElement = document.querySelector(".cards");
    mainElement.appendChild(card);
}
