import { fetchJSON } from "../util.js";
import { showToast } from "../util.js";
import { addSkeleton, removeSkeleton } from "./skeleton.js";
import { createRetryButton } from "../util.js";
export async function latestPost() {
    addSkeleton();
    const parent = document.querySelector(".latestPosts");
    try {
        const datas = await fetchJSON(
            "https://jsonplaceholder.typicode.com/posts"
        );
        const data = datas.slice(-3);

        data.forEach((el) => {
            const card = document.createElement("section");
            card.classList.add("latestPost");
            const h3 = document.createElement("h3");
            h3.textContent = el.title;
            const para = document.createElement("p");
            para.textContent = el.body;
            card.appendChild(h3);
            card.appendChild(para);
            parent.appendChild(card);
        });
        removeSkeleton();
    } catch (err) {
        removeSkeleton();
        const retry = createRetryButton(latestPost);
        parent.appendChild(retry);
        showToast(err, 3, "error");
    }
}
