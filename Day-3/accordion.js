function accordion(button, content) {
    function openDrawer() {
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

    button.addEventListener("click", (e) => {
        openDrawer();
    });
}
module.exports = accordion;
