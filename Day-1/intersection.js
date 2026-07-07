const callBack = (entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("animate");
        } else {
            entry.target.classList.remove("animate");
        }
    });
};
const observer = new IntersectionObserver(callBack);
document.querySelectorAll(".blogss .card").forEach((card) => {
    observer.observe(card);
});
const target = document.querySelector(".blogss");
const config = { attributes: true, childList: true, subtree: true };
const overlay = document.querySelector(".overlayToast");
const mutateCallback = (mutationList) => {
    for (const list of mutationList) {
        if (list.type === "childList") {
            if (list.addedNodes.length != 0) {
                list.addedNodes.forEach((el) => {
                    overlay.textContent += `ADDED A CHILD OF TYPE ${el.nodeName} \n\n`;
                    observer.observe(el);
                });
            }
            if (list.removedNodes.length != 0) {
                list.removedNodes.forEach((el) => {
                    overlay.textContent += `REMOVED A CHILD OF TYPE ${el.nodeName} \n\n`;
                });
            }
        }
        if (list.type === "attributes") {
            overlay.textContent += `ATTRIBUTE ${list.attributeName} CHANGED \n\n`;
        }
    }
};
const mutant = document.querySelector(".blogss");
const mutationObserver = new MutationObserver(mutateCallback);
mutationObserver.observe(mutant, config);
function addBlogs() {
    const card = document.createElement("article");
    card.classList.add("card");
    const title = document.createElement("h2");
    title.textContent = `BLOG TITLE`;
    const text = document.createElement("p");
    text.textContent = `   Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi deleniti autem corporis molestias a sint unde temporibus, deserunt suscipit eos sapiente maxime quisquam voluptates totam nisi, incidunt nostrum eligendi aliquid tenetur alias! Hic obcaecati soluta labore expedita inventore eum alias consequuntur, dolorum placeat consectetur omnis ducimus, delectus ratione consequatur voluptates beatae. Molestiae commodi libero quas eveniet at facilis necessitatibus, excepturi repudiandae, quos in optio, est dolore dolorem. Obcaecati sapiente recusandae natus odio repellendus aspernatur saepe ut et eaque numquam perspiciatis velit beatae sit corporis dolores consectetur perferendis alias, soluta quos quibusdam iste nisi. Doloremque, tempore. Asperiores iste id earum similique, voluptatibus obcaecati sed ipsam delectus qui fugiat accusamus vitae animi deleniti doloremque veritatis doloribus repudiandae labore facilis quidem aut! Dolorum optio corporis quod cupiditate, non reiciendis eligendi maiores laudantium tempore aspernatur distinctio iure voluptates accusamus quo mollitia iusto debitis asperiores ducimus, dolorem voluptatibus. Esse quibusdam sed recusandae numquam possimus, assumenda eaque, commodi maiores rerum voluptatibus modi voluptate itaque rem laborum voluptas excepturi reprehenderit? Fuga inventore iure autem corporis mollitia dolore aspernatur, veritatis assumenda eveniet vero exercitationem doloremque alias quas a, debitis enim animi explicabo dolores iste omnis! Unde pariatur corrupti provident, itaque id ut! Magni at tempora quo dolor totam.`;
    card.appendChild(title);
    card.appendChild(text);
    mutant.appendChild(card);
}
addBlogs();
