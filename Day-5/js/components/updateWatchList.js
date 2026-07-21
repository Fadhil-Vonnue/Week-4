import { showToast } from "../utils.js";
import { addToList } from "./addWatchlistCard.js";
export function updateWatchList(state) {
    console.log(state, "SECONDSTATE");
    let list = state.list;
    const imdbID = state.id;
    if (state.type === "Add") {
        addToList(imdbID);
    }
    if (state.type === "Delete") {
        const delCard = document.querySelector(`.card[data-id="${imdbID}"]`);
        delCard.remove();
    }
    localStorage.setItem("watchList", JSON.stringify([...list]));
}
