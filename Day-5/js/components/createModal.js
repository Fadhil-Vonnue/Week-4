import { fetchJSON, showToast } from "../utils.js";
import { createSearchCard } from "./searchCards.js";
export function createModal() {
    const documentFragment1 = document.createElement("div");
    documentFragment1.classList.add("modalOverlay");
    documentFragment1.innerHTML = `
                <div class="searchTop">
                    <div class="searchMovies">
                        <div class="searchboxtop">
                            <div class="searchbox">
                                <form action="">
                                    <input
                                        id="movie-input"
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
    documentFragment1.querySelector("form").addEventListener("submit", (e) => {
        e.preventDefault();
    });
    documentFragment1
        .querySelector(".searchbutton")
        .addEventListener("click", async (e) => {
            const value = document.querySelector("#movie-input").value;
            const form = {};
            form["movieTitle"] = { value };
            if (form["movieTitle"].value.length < 3) {
                showToast({ error: "Minlength is 3" });
            } else {
                const data = await fetchJSON(form["movieTitle"].value);
                if (data.Response == "False") {
                    alert(data.Error);
                } else {
                    const mainElement =
                        document.querySelector(".searchResults");
                    mainElement.style.display = "flex";
                    mainElement.innerHTML = ``;
                    data.Search.forEach((el) => {
                        const card1 = createSearchCard(el);
                        mainElement.appendChild(card1);
                    });
                }
            }
        });
    return documentFragment1;
}
