async function fetchJson(url, options = {}) {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error("HTTP Error");
        }
        const responseJson = await response.json();
        return responseJson;
    } catch (error) {
        return Promise.reject(error);
    }
}
let url = "https://jsonplaceholder.typicode.com/todos";
function debounce(func, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

const memoize = function (fn) {
    const cache = new Map();
    return (...args) => {
        let strkey = args.join(",");
        if (!cache.get(strkey)) {
            cache.set(strkey, fn.apply(this, args));
        }
        return cache.get(strkey);
    };
};
module.exports = { fetchJson, debounce, memoize };
