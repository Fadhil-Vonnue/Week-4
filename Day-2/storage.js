localStorage.setItem("key", "result");
sessionStorage.setItem("key", "result");
function storageManager() {
    return {
        get: (key) => {
            const val = JSON.parse(localStorage.getItem(key));
            if (Date.now() < val.expire) {
                return val;
            } else {
                localStorage.removeItem(key);
                return null;
            }
        },
        set: (key, value, ttl) => {
            const obj = {
                value,
                expire: Date.now() + ttl,
            };
            localStorage.setItem(key, JSON.stringify(obj));
        },
        delete(key) {
            localStorage.removeItem(key);
        },
        clear() {
            localStorage.clear();
        },
    };
}
const obj = storageManager();
const employee = {
    id: 1,
    name: "hawas",
};
const req = window.indexedDB.open("database", 1);
req.onupgradeneeded = (e) => {
    const db = req.result;
    const objectStore = db.createObjectStore("employees", { keyPath: "id" });
};
req.onsuccess = (e) => {
    const db = req.result;
    const transaction = db.transaction("employees", "readwrite");
    const objectStore = transaction.objectStore("employees");
    objectStore.put(employee);
    const res = objectStore.get(1);
    res.onsuccess = (e) => {
        console.log(res.result);
    };
};
