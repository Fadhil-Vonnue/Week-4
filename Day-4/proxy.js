const obj = { id: 1, name: "hawas" };
const stateObj = {};
const proxy = new Proxy(obj, {
    get(target, property) {
        alert(`${property} property of Object viewed`);
        return target[property];
    },
    set(target, property, value) {
        alert(`${property} property of Object set to ${value}`);
        target[property] = value;
    },
    deleteProperty(target, property) {
        if (property in target) {
            delete target[property];
            alert(`${property} property of Object deleted`);
        }
    },
});
const stateProxy = new Proxy(stateObj, {
    get(target, property) {
        alert(`${property} property of Object viewed`);
        return target[property];
    },
    set(target, property, value) {
        console.log(property, value);
        document.querySelectorAll(`.${property}-span`).forEach((el) => {
            console.log("HEYYY");
            el.textContent = value;
        });
        target[property] = value;
    },
    deleteProperty(target, property) {
        if (property in target) {
            delete target[property];
            alert(`${property} property of Object deleted`);
        }
    },
});

function setProxy() {
    proxy.name = "FADHIL";
    console.log(proxy);
    console.log(proxy.name);
}
function deleteProxy() {
    delete proxy.id;
    console.log(proxy);
}
document.querySelectorAll("input").forEach((el) => {
    el.addEventListener("change", (e) => {
        stateProxy[e.target.name] = e.target.value;
    });
});
