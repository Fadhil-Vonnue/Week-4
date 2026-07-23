import { fetchJSON } from "../utils.js";
import { createSearchCard } from "../components/searchCards.js";
import { createModal } from "../components/createModal.js";
import { createButton } from "../components/createButton.js";
export async function renderWatchListPage() {
    const mainElement1 = document.querySelector("main");
    mainElement1.style.textAlign = "center";
    mainElement1.innerHTML = "";
    const mainElement = document.createElement("div");
    mainElement.classList.value = "";
    mainElement.classList.add("reload");
    const documentFragment1 = createModal();
    const spinTop = document.createElement("div");
    spinTop.classList.add("spintop");
    const spin = document.createElement("div");
    spin.classList.add("spin");
    spinTop.classList.add("hidden");
    spinTop.appendChild(spin);
    const cardsElement = document.createElement("div");
    cardsElement.classList.add("cards");
    const but = createButton("Add to Watchlist");
    but.classList.add("openModal");
    but.addEventListener("click", (e) => {
        documentFragment1.style.display = "flex";
    });
    mainElement.appendChild(but);
    mainElement.appendChild(spinTop);
    mainElement.appendChild(documentFragment1);
    mainElement.appendChild(cardsElement);
    mainElement1.appendChild(mainElement);
}
