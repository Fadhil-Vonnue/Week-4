export function init() {
    const toggleElement = document.getElementById("dark");
    let setTheme = localStorage.getItem("theme");
    if (setTheme) {
        document.documentElement.setAttribute("data-theme", setTheme);
    } else {
        const getTheme = window.matchMedia("(prefers-color-scheme: dark)");
        if (getTheme.matches) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
        setTheme = localStorage.getItem("theme");
        document.documentElement.setAttribute("data-theme", setTheme);
    }
    toggleElement.setAttribute("aria-pressed", "false");
    if (setTheme == "dark") {
        toggleElement.checked = true;
        toggleElement.setAttribute("aria-pressed", "true");
        toggleElement
            .querySelector("svg")
            .querySelector("g")
            .querySelector("path").style.fill = "yellow";
        toggleElement.style.backgroundColor = "black";
    }

    document.getElementById("dark").addEventListener("click", (e) => {
        if (e.currentTarget.ariaPressed === "false") {
            document.documentElement.setAttribute("data-theme", "dark");
            e.currentTarget.setAttribute("aria-pressed", "true");
            localStorage.setItem("theme", "dark");
            e.currentTarget
                .querySelector("svg")
                .querySelector("g")
                .querySelector("path").style.fill = "yellow";
            e.currentTarget.style.backgroundColor = "black";
        } else {
            document.documentElement.setAttribute("data-theme", "light");
            e.currentTarget.setAttribute("aria-pressed", "false");
            localStorage.setItem("theme", "light");
            e.currentTarget
                .querySelector("svg")
                .querySelector("g")
                .querySelector("path").style.fill = "black";
            e.currentTarget.style.backgroundColor = "white";
        }
    });
}
