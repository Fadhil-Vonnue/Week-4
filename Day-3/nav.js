function openHam(button, content) {
    const isOpen = content.classList.toggle("isToggled");
    if (isOpen) {
        content.style.maxHeight = "500px";
        content.style.padding = "20px";
        content.ariaExpanded = true;
        document.body.style.overflow = "hidden";
        // document.querySelector(".top-top").classList.add("hidden");
    } else {
        content.style.maxHeight = "0px";
        content.style.padding = "0px";
        content.ariaExpanded = false;
        content.style.overflow = "hidden";
        document.body.style.overflow = "visible";
        // document.querySelector(".top-top").classList.remove("hidden");
    }
}

const drawer = document.querySelector(".drawer");

function trapFocus(element) {
    const focusableSelectors = "a[href]";
    const focusableElements = element.querySelectorAll(focusableSelectors);

    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    if (firstFocusable) firstFocusable.focus();

    element.addEventListener("keydown", function (e) {
        if (e.key !== "Tab") return;

        if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
                lastFocusable.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastFocusable) {
                firstFocusable.focus();
                e.preventDefault();
            }
        }
    });
}

module.exports = { openHam, trapFocus };
