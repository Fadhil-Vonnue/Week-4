export function renderSettingsPage() {
    const documentFragment = document.createDocumentFragment();
    const divElement = document.createElement("div");
    const h2Element = document.createElement("h2");
    h2Element.textContent = "Settings Page";
    divElement.append(h2Element);
    documentFragment.append(divElement);
    const mainElement1 = document.querySelector("main");
    const mainElement = document.createElement("div");
    mainElement1.innerHTML = ``;
    mainElement.classList.value = ``;
    mainElement.classList.add("reload");
    mainElement.innerHTML = "";
    mainElement.append(documentFragment);
    mainElement1.appendChild(mainElement);
}
