const utils = require("./jest");
function double(x) {
    return 2 * x;
}
function addOne(x) {
    return x + 1;
}
function add(a, b, c) {
    return a + b + c;
}
test("CHUNKS - Happy Path : chunks arrays into size 2", () => {
    expect(utils.chunk(arr, 2)).toStrictEqual([
        ["success", "Validationerror"],
        ["success", "success"],
        ["Validationerror", "success"],
        ["success"],
    ]);
});

test("CHUNKS - Edge Case : chunks arrays into size 2", () => {
    expect(utils.chunk([], 2)).toEqual([[]]);
});
test("CHUNKS - Error Case : chunks arrays into size 2", () => {
    expect(() => {
        utils.chunk({}, 2);
    }).toThrow();
});
test("GROUP BY TYPE - Happy Path :", () => {
    expect(utils.groupBy(newarrr, (type) => type.type)).toEqual({
        boy: [
            { name: "john", type: "boy" },
            { name: "doe", type: "boy" },
            { name: "john", type: "boy" },
        ],
        girl: [{ name: "rose", type: "girl" }],
    });
});
test("GROUP BY TYPE - Edge Case :", () => {
    expect(utils.groupBy([], (type) => type.type)).toEqual({});
});
test("GROUP BY TYPE - Error Case :", () => {
    expect(() => {
        utils.groupBy({}, (type) => type.type);
    }).toThrow();
});
test("Zip - Happy Path : ", () => {
    expect(utils.zip(["1", 2, 3, 4, 5], [11, 12, 21, 45, 11])).toHaveLength(10);
});
test("Zip - Edge Case: ", () => {
    expect(utils.zip([], [])).toEqual([]);
});
test("Zip - Error Case : ", () => {
    expect(() => {
        utils.zip(undefined, []);
    }).toThrow();
});

test("Pipe functions - Happy Path: doubles 5 to 10, doubles 10 to 20 and adds one to equal 21", () => {
    expect(utils.pipe(double, double)(0)).toBeFalsy();
});
test("Pipe functions - Edge Case ", () => {
    expect(utils.pipe()(5)).toBeTruthy();
});
test("Pipe functions - Error Case ", () => {
    expect(() => {
        utils.pipe(fn, 5);
    }).toThrow();
});

test("Compose functions - Happy Path : Adds one to 5, doubles 6 to 12, doubles 12 to equal 24", () => {
    expect(utils.compose(double, double, addOne)(5)).toBe(24);
});
test("Compose functions - Edge Case : ", () => {
    expect(utils.compose(double)(5)).toBe(10);
});
test("Compose functions - Error Case : Adds one to 5, doubles 6 to 12, doubles 12 to equal 24", () => {
    expect(() => {
        utils.compose(null)(5);
    }).toThrow();
});
test("Curry functions - Happy Path: Adds one to 5, doubles 6 to 12, doubles 12 to equal 24", () => {
    expect(utils.curry(add)(1, 2)(3)).toBe(6);
});
test("Curry functions - Edge Case : ", () => {
    expect(utils.curry(add)(1, 2, 3)).toBe(6);
});
test("Curry functions - Error Case : ", () => {
    expect(() => {
        utils.curry()(1, 2, 3);
    }).toThrow();
});
test("Curry functions - toBeCloseTo", () => {
    expect(utils.curry(add)(0.1, 2)(0.33)).toBeCloseTo(2.43);
});
test("Partial functions - Happy Path : Adds one to 5, doubles 6 to 12, doubles 12 to equal 24", () => {
    expect(utils.partial(add, 1, 2)(3)).toBe(6);
});
test("Partial functions - Edge Case : Adds one to 5, doubles 6 to 12, doubles 12 to equal 24", () => {
    expect(utils.partial(add, 1, 2)(3, 4)).toBe(6);
});
test("Partial functions - Error Case : Adds one to 5, doubles 6 to 12, doubles 12 to equal 24", () => {
    expect(() => {
        utils.partial(undefined, 1, 2)(3);
    }).toThrow();
});
test("CHUNKS - toContain: chunks arrays into size 2", () => {
    expect([1, 2, 3]).toContain(3);
});
