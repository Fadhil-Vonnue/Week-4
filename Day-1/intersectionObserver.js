const callBack = (entries) => {
    entries.forEach((e) => {
        if (e.isIntersecting) e.target.src = e.target.getAttribute("data-src");
    });
};
const root = document.documentElement;

const observer = new IntersectionObserver(callBack);
document.querySelectorAll(".card img").forEach((card) => {
    observer.observe(card);
});
const header = document.querySelector("header");
const headerHeight = header.offsetHeight;
const container = document.querySelector(".scroller");
const options = {
    root: container,
    rootMargin: `43px`,
    threshold: 1.0,
};
const stickyCallback = (entries) => {
    entries.forEach((e) => {
        if (e.isIntersecting) {
            if (e.target.getAttribute("data-counter") == "") {
                requestAnimationFrame(step);
            }
            const header = document.querySelector("header h1");
            header.textContent = e.target.querySelector("h2").textContent;
            root.style.setProperty("--primary-color", "#f2308e");
            root.style.setProperty("--secondary-color", "#faf2c8");
            console.log(e.target);
        }
    });
};
const stickyObserver = new IntersectionObserver(stickyCallback, options);
document.querySelectorAll("[data-section]").forEach((card) => {
    stickyObserver.observe(card);
});
const element = document.getElementById("counter");
const count = Number(element.getAttribute("data-id"));
let start;
function step(timestamp) {
    if (start === undefined) {
        start = timestamp;
    }
    const elapsed = timestamp - start;
    const shift = Math.floor(Math.min((count / 2000) * elapsed, count));
    element.textContent = `${shift}`;
    if (elapsed < 2000) {
        requestAnimationFrame(step);
    }
}
