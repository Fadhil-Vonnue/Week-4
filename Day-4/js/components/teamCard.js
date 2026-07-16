import { fetchJSON } from "../util.js";
import { showToast } from "../util.js";
import { lightBox } from "./lightbox.js";
import { addSkeleton, removeSkeleton } from "./skeleton.js";
import { createRetryButton } from "../util.js";
export async function renderTeamCards() {
    addSkeleton();
    try {
        const data = await fetchJSON(
            "https://jsonplaceholder.typicode.com/users"
        );

        let containerName;
        data.forEach((el, index) => {
            if (index < 6) {
                containerName = "leadership";
            } else {
                containerName = "executive";
            }
            const parent = document.querySelector(
                `#${containerName} .container`
            );
            const card = document.createElement("div");
            card.classList.add("card");
            const figure = document.createElement("figure");
            const imageElement = document.createElement("img");
            imageElement.loading = "lazy";
            imageElement.alt = "Random Image";
            imageElement.src = `https://picsum.photos/id/${el.id * 51}/300/300`;
            const figcaption = document.createElement("figcaption");
            const h3 = document.createElement("h3");
            h3.textContent = el.name;
            const para = document.createElement("p");
            para.textContent = el.username;
            const paraDesc = document.createElement("p");
            const content = `I'm ${el.name}, I come from ${el.address.street}. I ${el.company.bs}. Known for my high-energy, collaborative leadership style`;
            paraDesc.textContent = content;
            const socials = document.createElement("div");
            socials.classList.add("socials");
            socials.innerHTML = `
              <button>
                <img loading="lazy" width="30" height="30" src="icons8-instagram-48.png" alt="Instagram">
              </button>
              <button>
                <img loading="lazy" width="30" height="30" src="icons8-twitter-48.png" alt="twitter">
              </button>
              <button>
                <img loading="lazy" width="30" height="30" src="icons8-facebook-48.png" alt="facebook">
              </button>`;
            figure.appendChild(imageElement);
            figcaption.appendChild(h3);
            figure.appendChild(figcaption);
            card.appendChild(figure);
            card.appendChild(para);
            card.appendChild(paraDesc);
            card.appendChild(socials);
            parent.appendChild(card);
        });
        lightBox();
        removeSkeleton();
    } catch (err) {
        const retry = createRetryButton(renderTeamCards);
        document.querySelector(".teampage").appendChild(retry);
        showToast(err, 3, "error");
    }
}
