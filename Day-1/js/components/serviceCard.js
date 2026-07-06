import { fetchJSON } from "../util.js";
import { showToast } from "../util.js";
import { addSkeleton, removeSkeleton } from "./skeleton.js";
import { createRetryButton } from "../util.js";
export async function renderServiceCards() {
    addSkeleton();
    const parent = document.querySelector(".cards");
    try {
        const data = await fetchJSON(
            "https://jsonplaceholder.typicode.com/posts"
        );
        data.forEach((el) => {
            const card = document.createElement("article");
            card.classList.add("card");
            const h2 = document.createElement("h2");
            h2.textContent = el.title;
            const para = document.createElement("p");
            para.textContent = el.body;
            card.appendChild(h2);
            card.appendChild(para);
            parent.appendChild(card);
        });
        removeSkeleton();
    } catch (err) {
        const retry = createRetryButton(renderServiceCards);
        parent.appendChild(retry);
        showToast(err, 3, "error");
    }
}
