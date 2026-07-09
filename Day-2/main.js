import { images } from "./imageLists.js";

const registerServiceWorker = async () => {
    if ("serviceWorker" in navigator) {
        try {
            const registration = await navigator.serviceWorker.register(
                "/Week-4/Day-2/sw.js"
            );
            if (registration.installing) {
                console.log("Service worker installing");
            } else if (registration.waiting) {
                console.log("Service worker installed");
            } else if (registration.active) {
                console.log("Service worker active");
            }
        } catch (err) {
            console.error(`Registration failed with ${err}`);
        }
    }
};

registerServiceWorker();
const getImageBlob = async (url) => {
    const imageResponse = await fetch(url);
    if (!imageResponse.ok) {
        throw new Error(
            `Image didn't load successfully; error code: ${
                imageResponse.statusText || imageResponse.status
            }`
        );
    }
    return imageResponse.blob();
};
const loadImages = async (image) => {
    try {
        const parent = document.querySelector("main");
        const imageURL = await getImageBlob(image.url);
        const Image = document.createElement("img");
        Image.style.width = "400";
        Image.style.height = "600";
        Image.src = window.URL.createObjectURL(imageURL);
        parent.append(Image);
    } catch (err) {
        console.log(err);
    }
};
images.map(loadImages);
async function fetchJSON(url, options) {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error("Error while fetching");
        }
        const data = await response.json();
        return data;
    } catch (err) {
        return Promise.reject(err);
    }
}
async function renderCards() {
    try {
        const data = await fetchJSON(
            "https://jsonplaceholder.typicode.com/users"
        );
        data.forEach((element) => {
            const div = document.createElement("div");
            div.textContent = element.name;
            document.body.appendChild(div);
        });
    } catch (err) {
        alert("COULDN FETCH");
    }
}
renderCards();
