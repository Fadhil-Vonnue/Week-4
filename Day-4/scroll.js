let ItemArray = [];

(function createArray() {
    for (let i = 0; i < 10000; i++) {
        ItemArray.push({
            id: i,
            title: `Title ${i}`,
            description: `this is the description of item number ${i}`,
        });
    }
})();

const containerElement = document.querySelector(".container");
const extra = document.querySelector(".extra");
const content = document.querySelector(".content");

function createCard(id, title, description, i) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.classList.add(`number${i}`);

    const idElement = document.createElement("span");
    idElement.textContent = id;

    const titleElement = document.createElement("h2");
    titleElement.textContent = title;

    const textBox = document.createElement("p");
    textBox.textContent = description;

    card.append(idElement, titleElement, textBox);

    return card;
}

const itemHeight = 170;
const buffer = 5;

extra.style.height = `${ItemArray.length * itemHeight}px`;

function renderCards() {
    const scrollTop = containerElement.scrollTop;

    const visibleCount = Math.ceil(containerElement.clientHeight / itemHeight);

    const start = Math.max(0, Math.floor(scrollTop / itemHeight) - buffer);

    const end = Math.min(ItemArray.length, start + visibleCount + buffer * 2);

    content.innerHTML = "";

    const fragment = document.createDocumentFragment();

    for (let i = start; i < end; i++) {
        fragment.appendChild(
            createCard(
                ItemArray[i].id,
                ItemArray[i].title,
                ItemArray[i].description,
                i
            )
        );
    }

    content.style.transform = `translateY(${start * itemHeight}px)`;

    content.appendChild(fragment);
}

let frame = false;

containerElement.addEventListener("scroll", () => {
    if (frame) return;

    frame = true;

    requestAnimationFrame(() => {
        renderCards();
        frame = false;
    });
});

renderCards();
