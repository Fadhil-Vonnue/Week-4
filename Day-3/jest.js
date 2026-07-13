orders = [
    {
        orderId: 1,
        items: [1, 2, 3, 4],
    },
    {
        orderId: 1,
        items: [5, 6, 7, 8],
    },
];
let parentId = 1;
let Items = orders.flatMap((obj) => {
    if (obj.orderId === parentId) return obj.items;
});

arr = [
    "success",
    "Validationerror",
    "success",
    "success",
    "Validationerror",
    "success",
    "success",
];
const test = arr.findLast((el) => {
    return el.includes("error");
});
const test1 = arr.findLastIndex((el) => {
    return el.includes("error");
});

function chunk(arr, size) {
    const chunkArray = [];
    let i;
    for (i = 0; i < arr.length - 1; i += size) {
        chunkArray.push(arr.slice(i, i + size));
    }
    chunkArray.push(arr.slice(i - size + 2));
    return chunkArray;
}

const hey = chunk(arr, 2);

const zip = (...arr) => {
    let array = Array.from(
        { length: Math.max(...arr.map((a) => a.length)) },
        (_, i) => arr.map((a) => a[i])
    );
    array = array.flat(1);
    return array;
};

newarrr = [
    { name: "john", type: "boy" },
    { name: "doe", type: "boy" },
    { name: "rose", type: "girl" },
    { name: "john", type: "boy" },
];
function groupBy(arr, keyFn) {
    return arr.reduce((result, item) => {
        const key = keyFn(item);
        if (!result[key]) {
            result[key] = [];
        }
        result[key].push(item);
        return result;
    }, {});
}

function pipe(...fns) {
    return function (x) {
        let res = x;
        fns.forEach((fn) => {
            res = fn(res);
        });
        return res;
    };
}

function compose(...fns) {
    return function (x) {
        let res = x;
        fns.toReversed().forEach((fn) => {
            res = fn(res);
        });
        return res;
    };
}

function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        } else {
            return function (...args2) {
                return curried.apply(this, args.concat(args2));
            };
        }
    };
}

function partial(fn, ...presetArgs) {
    return function (...rem) {
        return fn(...presetArgs, ...rem);
    };
}
module.exports = { chunk, zip, groupBy, pipe, compose, curry, partial };
