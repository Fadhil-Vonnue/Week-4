function pipe(...fns) {
    return function (x) {
        let res = x;
        fns.forEach((fn) => {
            res = fn(res);
        });
        return res;
    };
}
function double(x) {
    return 2 * x;
}
function addOne(x) {
    return x + 1;
}
console.log(pipe(double, double, addOne)(5));
console.log(pipe(double, double, addOne, double)(5));
console.log(pipe(double, double)(5));

function compose(...fns) {
    return function (x) {
        let res = x;
        fns.toReversed().forEach((fn) => {
            res = fn(res);
        });
        return res;
    };
}

console.log(compose(double, double, addOne)(5));
console.log(compose(double, double)(5));
console.log(compose(double, double, addOne, addOne)(5));
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
function add(a, b, c) {
    return a + b + c;
}
function addAll(...all) {
    let res = 0;
    all.forEach((el) => {
        res += el;
    });
    return res;
}
console.log(curry(add)(1, 2)(3));
console.log(curry(add)(1)(3)(2));
console.log(curry(add)(1, 3, 2));
console.log(curry(add)(1)(3, 2));

function partial(fn, ...presetArgs) {
    return function (...rem) {
        return fn(...presetArgs, ...rem);
    };
}
console.log(partial(add, 1, 2)(3));
console.log(partial(add, 1)(2, 3));
console.log(partial(addAll, 1)(2, 3, 4, 5));
console.log(partial(addAll, 1, 5)(2, 3, 4, 5));
