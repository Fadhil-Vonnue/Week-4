let id = 0;
let allcomms = {};
const hashmap = new Map();
class Comments {
    constructor(id, text) {
        this.id = id;
        this.text = text;
        this.innercomms = [];
        this.like = false;
    }
    addReply(id, text) {
        const newob = new Comments(id, text);
        this.innercomms.push(newob);
        return newob;
    }
}
function listener() {
    document.querySelectorAll(".post-but").forEach((el) => {
        el.addEventListener("click", (e) => {
            const inputText = e.target.previousElementSibling.value;
            const comment = createComm(inputText);
            const parent =
                e.target.parentElement.parentElement.querySelector(".comments");
            parent.appendChild(comment);
            id++;
            const obj = new Comments(id, inputText);
            e.target.previousElementSibling.value = "";
            comment.id = id;
            hashmap.set(comment.id, obj);
            console.log(hashmap);
            blogID = e.target.parentElement.parentElement.parentElement.id;
            if (!(blogID in allcomms)) {
                allcomms[blogID] = [];
            }
            allcomms[blogID].push(obj);
            console.log(allcomms);
            updatestorage();
        });
    });

    document.querySelectorAll(".comment").forEach(Commentlistener);
}
listener();
function updatestorage() {
    Object.keys(allcomms).forEach((el) => {
        localStorage.setItem(el, JSON.stringify(allcomms[el]));
    });
}

function Commentlistener(element) {
    const replyBut = element.querySelector(".reply-but");
    replyBut.addEventListener("click", (e) => {
        const form = e.target.closest(".comment").querySelector(".post");
        form.classList.toggle("hide");
    });
    const likeBut = element.querySelector(".like-but");

    likeBut.addEventListener("click", (e) => {
        const ob1 = hashmap.get(e.currentTarget.parentElement.parentElement.id);
        ob1.like = !ob1.like;
        console.log(ob1);
        updatestorage();
        if (ob1.like) {
            e.currentTarget.querySelector("svg").classList.add("liked");
        } else {
            e.currentTarget.querySelector("svg").classList.remove("liked");
        }
    });

    const replyPostBut = element.querySelector(".reply-post");

    replyPostBut.addEventListener("click", (e) => {
        const inputText = e.target.previousElementSibling.value;
        const newComment = createComm(inputText);
        const parentComments = e.target.parentElement.parentElement;
        const newobj = hashmap.get(parentComments.id);
        console.log(parentComments.id);
        id++;
        newComment.id = id;
        const newobj1 = newobj.addReply(id, inputText);
        hashmap.set(newComment.id, newobj1);
        console.log(newobj, newobj1, hashmap);
        e.target.parentElement.classList.toggle("hide");
        parentComments.appendChild(newComment);
        updatestorage();
    });
}

function createComm(input) {
    const inputText = input;

    const comment = document.createElement("div");
    comment.classList.add("comment");

    const commentText = document.createElement("span");
    commentText.textContent = inputText;

    const interact = document.createElement("div");
    interact.classList.add("interact");
    const post = document.createElement("button");
    post.classList.add("reply-but");
    post.textContent = "Reply";
    const like = document.createElement("button");
    like.classList.add("like-but");
    like.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 1.95-1.57l1.3-6a2 2 0 0 0-.3-1.78A2 2 0 0 0 21.28 12H16" />
    <path d="M9 22H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h5" />
  </svg>`;
    interact.appendChild(post);
    interact.appendChild(like);
    comment.appendChild(commentText);
    comment.appendChild(interact);

    const pos = document.createElement("div");
    pos.classList.add("post", "hide");
    const inp = document.createElement("input");
    inp.type = "text";
    inp.placeholder = "Enter a comment";
    const rep = document.createElement("button");
    rep.textContent = "Post";
    rep.classList.add("reply-post");
    pos.appendChild(inp);
    pos.appendChild(rep);
    comment.appendChild(pos);
    Commentlistener(comment);
    return comment;
}
let c = 1;
const cards = document.querySelectorAll(".card");
for (let car of cards) {
    if (localStorage.getItem(car.id) !== null) {
        const parentt = car.querySelector(".comments");
        const parob = JSON.parse(localStorage.getItem(car.id));
        console.log(parob, "parob");
        allcomms[car.id] = parob;
        for (let els in parob) {
            const ob = parob[els];
            console.log(ob, "heheheh");
            id = Math.max(id, ob.id);
            const par = createComm(ob.text);
            const likebut = par.querySelector(".like-but").querySelector("svg");
            if (ob.like) {
                likebut.classList.add("liked");
            }
            par.id = ob.id;
            const obj = new Comments(ob.id, ob.text);
            hashmap.set(par.id, obj);
            console.log(ob);
            par.id = ob.id;
            innerReplies(ob.innercomms, par);
            parentt.appendChild(par);
            console.log(id);
        }
        c++;
    }
}

function innerReplies(ob, par) {
    console.log("inner", ob);
    if (ob.length !== 0) {
        for (let el of ob) {
            const child = createComm(el.text);
            const newobj = hashmap.get(par.id);
            child.id = el.id;
            id = Math.max(id, child.id);
            const likebut = child
                .querySelector(".like-but")
                .querySelector("svg");
            if (el.like) {
                likebut.classList.add("liked");
            }
            const newobj1 = newobj.addReply(el.id, el.text);
            hashmap.set(child.id, newobj1);
            console.log(hashmap, "heheh");
            par.appendChild(child);
            innerReplies(el.innercomms, child);
        }
    }
    return;
}
