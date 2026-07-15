const container = document.querySelector(".main");

for (let i = 0; i < 10000; i++) {
    let offheight = container.offsetHeight;
    container.style.height = `${offheight++}px`;
}
