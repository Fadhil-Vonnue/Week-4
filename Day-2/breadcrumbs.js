const url = window.location.href;
const filename = url.split("/").pop().split(".")[0];
const targets = document.querySelectorAll(".link");
for (const target of targets) {
    target.style.backgroundColor = "purple";
    target.style.color = "white";
    target.querySelector("a").style.color = "white";
    if (target.id === filename) break;
}
