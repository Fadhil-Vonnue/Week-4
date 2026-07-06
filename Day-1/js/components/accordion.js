export function init() {
    document.querySelector(".hamb").addEventListener("click", (e) => {
        openHam1(e);
    });
    document.querySelectorAll(".accordion-but").forEach((el) => {
        el.addEventListener("click", (e) => {
            const button = e.currentTarget;
            const content =
                e.currentTarget.parentElement.querySelector(
                    ".accordionContent"
                );
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
        });
    });
}
