export function createButton(text, bgColor = "white", color = "black") {
    const button = document.querySelector(".detailed-buttons button");
    button.classList.add("new-button");
    const clonedButton = button.cloneNode(true);
    clonedButton.style.backgroundColor = bgColor;
    clonedButton.style.color = color;
    clonedButton.textContent = text;
    return clonedButton;
}
