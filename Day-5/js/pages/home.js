import { parseCSV, showToast } from "../utils.js";
import { createCard } from "../components/movieCards.js";
export async function renderHomePage() {
    try {
        let div = document.createElement("div");
        div.classList.add("hero");
        let img = document.createElement("img");
        img.src = "../../assets/collage.jpg";
        let div1 = document.createElement("div");
        div1.classList.add("fade-overlay");
        div.appendChild(img);
        div.appendChild(div1);
        div1 = document.createElement("div");
        div1.classList.add("black-overlay");
        div.appendChild(div1);
        const mainElement1 = document.querySelector("main");
        const mainElement = document.createElement("div");
        mainElement1.innerHTML = ``;
        mainElement.classList.add("reload");
        const cardsElement = document.createElement("div");
        cardsElement.classList.add("cards");
        mainElement.appendChild(div);
        const allCards = await parseCSV("../Top_100_Movies.csv");
        for (let i = 0; i < 6; i++) {
            const newCard = await createCard(allCards[i]);
            cardsElement.appendChild(newCard);
        }
        mainElement.appendChild(cardsElement);
        mainElement1.appendChild(mainElement);
    } catch (err) {
        showToast(err);
    }
}
