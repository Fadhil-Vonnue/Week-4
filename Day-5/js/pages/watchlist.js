import { fetchJSON } from "../utils.js";
import { createSearchCard } from "../components/searchCards.js";
export async function renderWatchListPage() {
    const mainElement1 = document.querySelector("main");
    mainElement1.innerHTML = "";
    const mainElement = document.createElement("div");
    mainElement.classList.value = "";
    mainElement.classList.add("reload");
    const documentFragment1 = document.createElement("div");
    documentFragment1.classList.add("modalOverlay");
    documentFragment1.innerHTML = `
                <div class="searchTop">
                    <div class="searchMovies">
                        <div class="searchboxtop">
                            <div class="searchbox">
                                <form action="">
                                    <input
                                        name="movieTitle"
                                        type="text"
                                        placeholder="Search"
                                    />
                                </form>
                                <div class="searchResults"></div>
                            </div>
                            <button class="searchbutton">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="white"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    width="24"
                                >
                                    <path
                                        d="M11 2a9 9 0 105.641 16.01.966.966 0 00.152.197l3.5 3.5a1 1 0 101.414-1.414l-3.5-3.5a1 1 0 00-.197-.153A8.96 8.96 0 0020 11a9 9 0 00-9-9Zm0 2a7 7 0 110 14 7 7 0 010-14Z"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            `;
    const spinTop = document.createElement("div");
    spinTop.classList.add("spintop");
    const spin = document.createElement("div");
    spin.classList.add("spin");
    spinTop.classList.add("hidden");
    spinTop.appendChild(spin);
    const cardsElement = document.createElement("div");
    cardsElement.classList.add("cards");
    const but = document.createElement("button");
    but.textContent = "ADD TO LIST";
    but.addEventListener("click", (e) => {
        documentFragment1.style.display = "flex";
    });
    mainElement.appendChild(but);
    mainElement.appendChild(spinTop);
    mainElement.appendChild(documentFragment1);
    mainElement.appendChild(cardsElement);
    mainElement1.appendChild(mainElement);
    console.log(mainElement);
    document.querySelector("form").addEventListener("submit", (e) => {
        e.preventDefault();
    });
    document
        .querySelector(".searchbutton")
        .addEventListener("click", async (e) => {
            const form = document.querySelector("form");
            console.log(form["movieTitle"]);
            if (form["movieTitle"].value.length < 3) {
                alert("Minlength is 3");
            } else {
                const data = await fetchJSON(form["movieTitle"].value);
                if (data.Response == "False") {
                    alert(data.Error);
                } else {
                    console.log(data);
                    const mainElement =
                        document.querySelector(".searchResults");
                    mainElement.style.display = "flex";
                    data.Search.forEach((el) => {
                        const card1 = createSearchCard(el);
                        mainElement.appendChild(card1);
                    });
                }
            }
        });
}
