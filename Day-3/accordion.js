function openDrawer(button, content) {
    const isOpen = content.classList.toggle("isToggled");
    if (isOpen) {
        content.style.maxHeight = "500px";
        content.style.padding = "20px";
        content.ariaExpanded = true;
    } else {
        content.style.maxHeight = "0px";
        content.style.padding = "0px";
        content.ariaExpanded = false;
        content.style.overflow = "hidden";
    }
}

function openDrawer1(e) {
    openDrawer(e.currentTarget, document.querySelector(".drawer"));
}
module.exports = openDrawer;
