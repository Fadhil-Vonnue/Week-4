import { onMovieDelete, onRouteChange } from "../../main.js";
import { onMovieAdded } from "../../main.js";
export function createCard(details) {
    const card = document.createElement("div");
    card.classList.add("card");
    const cardImage = document.createElement("div");
    cardImage.classList.add("card-img");
    const cardDesc = document.createElement("div");
    cardDesc.classList.add("card-desc");
    const overlay = document.createElement("div");
    overlay.classList.add("fade-overlay");
    const cardTitle = document.createElement("div");
    cardTitle.textContent = details.title + `(` + details.year + `)`;
    cardTitle.classList.add("card-title");
    const cardGenres = document.createElement("div");
    cardGenres.classList.add("card-genres");
    const cardImg = document.createElement("img");
    cardImg.src = details.image;
    cardImg.addEventListener("error", handleImageError);
    const starSvg = document.createElement("img");
    starSvg.src = "./assets/star.svg";
    starSvg.style.width = `${12}px`;
    const cardRating = document.createElement("div");
    cardRating.textContent = details.rating;
    cardRating.classList.add("card-rating");
    cardImage.appendChild(cardImg);
    cardImage.appendChild(overlay);
    cardRating.appendChild(starSvg);
    cardDesc.appendChild(cardTitle);
    cardDesc.appendChild(cardRating);
    const str = details.genre;
    const arr = JSON.parse(str.replace(/'/g, '"'));
    for (let i = 0; i < (arr.length <= 3 ? arr.length : 3); i++) {
        const cardGenre = document.createElement("div");
        cardGenre.classList.add("card-genre");
        cardGenre.textContent = arr[i];
        cardGenres.appendChild(cardGenre);
    }
    cardDesc.appendChild(cardGenres);
    card.appendChild(cardImage);
    card.appendChild(cardDesc);
    const newimg = document.createElement("img");
    newimg.classList.add("addToFav-button");
    newimg.src = "assets/addtofav.svg";
    newimg.style.width = "20px";
    newimg.addEventListener("click", (e) => {
        const imbdbID = e.currentTarget.parentElement.dataset.id;
        onMovieAdded(imbdbID);
        newimg.src = "assets/close.svg";
    });
    card.appendChild(newimg);
    function handleImageError() {
        cardImg.onerror = null;
        cardImg.src = "https://picsum.photos/id/1/200/300";
    }
    card.dataset.id = details.imdbid;
    card.addEventListener("click", (e) => {
        if (e.target.className !== "addToFav-button") {
            const url = `/detail/:${details.imdbid}`;
            history.pushState({}, null, url);
            const obj = { imdbID: details.imdbid };
            onRouteChange(url.split("/").slice(0, -1).join("/"), obj);
        }
    });
    return card;
}
export function createCard1(details) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.id = details.id;
    const cardImage = document.createElement("div");
    cardImage.classList.add("card-img");
    const cardDesc = document.createElement("div");
    cardDesc.classList.add("card-desc");
    const overlay = document.createElement("div");
    overlay.classList.add("fade-overlay");
    const cardTitle = document.createElement("div");
    cardTitle.textContent = details.title + `(` + details.year + `)`;
    cardTitle.classList.add("card-title");
    const cardGenres = document.createElement("div");
    cardGenres.classList.add("card-genres");
    const cardImg = document.createElement("img");
    cardImg.src = details.image;
    cardImg.addEventListener("error", handleImageError);
    const starSvg = document.createElement("img");
    starSvg.src = "./assets/star.svg";
    starSvg.style.width = `${12}px`;
    const cardRating = document.createElement("div");
    cardRating.textContent = details.rating;
    cardRating.classList.add("card-rating");
    cardImage.appendChild(cardImg);
    cardImage.appendChild(overlay);
    cardRating.appendChild(starSvg);
    cardDesc.appendChild(cardTitle);
    cardDesc.appendChild(cardRating);
    const arr = details.genre;
    for (let i = 0; i < (arr.length <= 3 ? arr.length : 3); i++) {
        const cardGenre = document.createElement("div");
        cardGenre.classList.add("card-genre");
        cardGenre.textContent = arr[i];
        cardGenres.appendChild(cardGenre);
    }
    cardDesc.appendChild(cardGenres);
    card.appendChild(cardImage);
    card.appendChild(cardDesc);
    const newimg = document.createElement("img");
    newimg.classList.add("addToFav-button");
    newimg.src = "assets/close.svg";
    newimg.style.width = "20px";
    newimg.addEventListener("click", (e) => {
        onMovieDelete(details.id);
        document
            .querySelector(`.results[data-id=${details.id}]`)
            .querySelector(".AddButton")
            .querySelector("img").style.display = "flex";
    });
    card.appendChild(newimg);
    function handleImageError() {
        cardImg.onerror = null;
        cardImg.src = "https://picsum.photos/id/1/200/300";
    }
    return card;
}
