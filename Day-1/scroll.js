let ItemArray = [];
(function createArray() {
    for (let i = 0; i < 10000; i++) {
        let item = {
            id: i,
            title: `Title ${i}`,
            description: `this is the description of item number ${i}`,
        };
        ItemArray.push(item);
    }
})();
const containerElement = document.querySelector(".container");

function createCard(id, title, description) {
    const card = document.createElement("div");
    card.classList.add("card");
    const idElement = document.createElement("span");
    idElement.textContent = id;
    const titleElement = document.createElement("h2");
    titleElement.textContent = title;
    const textBox = document.createElement("p");
    textBox.textContent = description;
    card.append(idElement, titleElement, textBox);
    return card;
}
const isRender = [];
function renderCards(start, end) {
    for (let i = start; i < end; i++) {
        let card = createCard(
            ItemArray[i].id,
            ItemArray[i].title,
            ItemArray[i].description
        );
        if (isRender.includes(i)) continue;
        isRender.push(i);
        containerElement.appendChild(card);
    }
}

for (let i = 0; i < 3; i++) {
    let card = createCard(
        ItemArray[i].id,
        ItemArray[i].title,
        ItemArray[i].description
    );
    isRender.push(i);
    containerElement.appendChild(card);
}
const item = document.querySelector(".card");
containerElement.addEventListener("scroll", (event) => {
    let startIndex = Math.floor(containerElement.scrollTop / item.offsetHeight);
    let endIndex =
        Math.floor(
            (containerElement.scrollTop + containerElement.offsetHeight) /
                item.offsetHeight
        ) + 10;
    renderCards(startIndex, endIndex);
});
