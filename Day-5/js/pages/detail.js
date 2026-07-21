import { fetchJSON1 } from "../utils.js";
export async function renderDetailPage(imdbID) {
    console.log(imdbID, "IMDB");
    const url = `http://www.omdbapi.com/?apikey=d65b40df&i=${imdbID}`;
    const details = await fetchJSON1(url);
    console.log(details);
    const documentFragment = document.createDocumentFragment();
    const divElement = document.createElement("div");
    documentFragment.append(divElement);
    const mainElement = document.querySelector("main");
    mainElement.classList.value = "";
    mainElement.classList.add("reload");
    mainElement.innerHTML = ``;
    const newDiv = document.querySelector(".detailed-card");
    const newCard = newDiv.cloneNode(true);
    newCard.querySelector(".detailed-card-img img").src = details.Poster;
    newCard.querySelector(".detail-title").textContent =
        details.Title + ` ` + `(` + details.Year + `)`;
    newCard.querySelector(".detailed-card .card-rating").innerHTML =
        `${details.imdbRating}  &starf; 󠁯
                        <span>•󠁏󠁏 ${details.imdbVotes} votes</span>`;

    let cards = newCard.querySelectorAll(".detail-span");
    cards[0].textContent = details.Genre;
    cards[1].textContent = details.Language;
    newCard.querySelector(".detail-plot").textContent = details.Plot;
    cards = newCard.querySelectorAll(".fields");
    cards[0].querySelector("span:nth-child(2)").textContent = details.Director;
    cards[1].querySelector("span:nth-child(2)").textContent = details.Actors;
    cards[2].querySelector("span:nth-child(2)").textContent = details.Released;
    cards[3].querySelector("span:nth-child(2)").textContent = details.Runtime;
    mainElement.appendChild(documentFragment);
    mainElement.appendChild(newCard);
}
