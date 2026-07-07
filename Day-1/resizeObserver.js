let initialW;
let initialH;
const container = document.getElementById("myChart");
const content = document.getElementById("chartBar");
const bars = document.querySelectorAll("#chartBar bar");
const resizeObserver = new ResizeObserver((entries) => {
    for (let entry of entries) {
        if (initialH === undefined && initialW === undefined) {
            initialH = Math.round(entry.contentRect.height);
            initialW = Math.round(entry.contentRect.width);
        }
        const width = Math.round(entry.contentRect.width);
        const height = Math.round(entry.contentRect.height);
        bars.forEach((bar) => {
            bar.style.width = `${bar.style.width * (width / initialW)}`;
            bar.style.height = `${bar.style.height * (height / initialH)}`;
        });
    }
});
resizeObserver.observe(container);

const mediaQuery1 = window.matchMedia("(min-width: 768px)");
console.log(mediaQuery1);
mediaQuery1.addEventListener("change", (e) => {
    if (mediaQuery1.matches) console.log("Crossed 1024");
});
