import { parseCSV } from "../utils.js";
import { createCard } from "../components/movieCards.js";
export async function renderListPage() {
    const documentFragment = document.createDocumentFragment();
    const divElement = document.createElement("div");
    documentFragment.append(divElement);
    const mainElement1 = document.querySelector("main");
    const mainElement = document.createElement("div");
    mainElement1.innerHTML = ``;
    mainElement.classList.value = ``;
    mainElement.classList.add("reload");
    const cardsElement = document.createElement("div");
    cardsElement.classList.add("cards");
    mainElement.appendChild(documentFragment);
    // mainElement.prepend(documentFragment);
    const allCards = await parseCSV("../Top_100_Movies.csv");
    console.log(allCards);
    for (let i = 0; i < allCards.length; i++) {
        const newCard = createCard(allCards[i]);
        cardsElement.appendChild(newCard);
    }
    mainElement.appendChild(cardsElement);
    mainElement1.appendChild(mainElement);
}
