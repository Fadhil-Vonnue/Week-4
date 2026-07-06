export function lightBox() {
    const cards = document.querySelectorAll(".card");
    const overlay = document.getElementsByClassName("image-overlay")[0];
    var curr;
    cards.forEach((card) => {
        card.addEventListener("click", (event) => {
            overlay.style.display = "flex";
            curr = event.currentTarget;
            const image = event.currentTarget.querySelector("figure img");
            const overlayImage = overlay.querySelector("img");
            overlayImage.src = image.src;
            overlay.style.top = `${scrollY}px`;
            document.body.style.overflow = "hidden";
        });
    });
    document.addEventListener("keydown", (e) => {
        if (e.key == "Escape") {
            overlay.style.display = "none";
            document.body.style.overflow = "visible";
        }
        if (e.key == "ArrowRight") {
            nextMove();
        }
        if (e.key == "ArrowLeft") {
            prevMove();
        }
    });
    function prevMove() {
        if (curr.previousElementSibling !== null) {
            curr = curr.previousElementSibling;
            const image = curr.querySelector("figure img");
            const overlayImage = overlay.querySelector("img");
            overlayImage.src = image.src;
        }
    }
    function nextMove() {
        if (curr.nextElementSibling !== null) {
            curr = curr.nextElementSibling;
            const image = curr.querySelector("figure img");
            const overlayImage = overlay.querySelector("img");
            overlayImage.src = image.src;
        }
    }
    function exitMove() {
        overlay.style.display = "none";
        document.body.style.overflow = "visible";
    }
    overlay.querySelectorAll("button").forEach((el) => {
        el.addEventListener("click", (e) => {
            if (e.target.id == "next-but") {
                nextMove();
            }
            if (e.target.id == "prev-but") {
                prevMove();
            }
            if (e.target.id == "exit-but") {
                exitMove();
            }
        });
    });
    let touchStart, touchEnd;
    overlay.addEventListener("touchstart", (e) => {
        touchStart = e.changedTouches[0].screenX;
    });
    overlay.addEventListener("touchend", (e) => {
        touchEnd = e.changedTouches[0].screenX;
        let touchDiff = touchEnd - touchStart;
        if (Math.abs(touchDiff) > 30) {
            if (touchDiff > 0) {
                prevMove();
            } else {
                nextMove();
            }
        }
    });
}

export function trapFocus(element) {
    const focusableSelectors = "button";
    const focusableElements = element.querySelectorAll("button");

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
// trapFocus(overlay);
