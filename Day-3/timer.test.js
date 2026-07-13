const obj = require("./timerMocks");

describe("testing fetchJSOn", () => {
    const mockData = { id: 1, name: "test" };
    test("Successful fetch", async () => {
        jest.spyOn(global, "fetch").mockResolvedValueOnce({
            json: async () => mockData,
            ok: true,
        });
        const data = await obj.fetchJson("/example");
        expect(data).toEqual(mockData);
    });
    test("Http error", async () => {
        jest.spyOn(global, "fetch").mockResolvedValueOnce({
            json: async () => mockData,
            ok: false,
        });
        await expect(obj.fetchJson("/example")).rejects.toThrow("HTTP Error");
    });
});

jest.useFakeTimers();

test("callback", () => {
    const callBackfn = jest.fn();
    const debouncefn = obj.debounce(callBackfn, 1000);
    for (let i = 0; i < 10; i++) debouncefn();
    jest.runAllTimers();
    expect(callBackfn).toHaveBeenCalled();
    expect(callBackfn).toHaveBeenCalledTimes(1);
});

test("Memoize", () => {
    const callBackfn = jest.fn((a) => a * a * a);
    const memoizeFn = obj.memoize(callBackfn);
    for (let i = 0; i < 10; i++) memoizeFn(3);
    expect(callBackfn).toHaveBeenCalled();
    expect(callBackfn).toHaveBeenCalledTimes(1);
    for (let i = 0; i < 10; i++) memoizeFn(4);
    expect(callBackfn).toHaveBeenCalledTimes(2);
});

test("Abort", async () => {
    jest.useFakeTimers();
    const controller = new AbortController();
    let response = obj.fetchJson("https://jsonplaceholder.typicode.com/todos", {
        signal: controller.signal,
    });
    setTimeout(() => {
        controller.abort();
    }, 2000);
    jest.advanceTimersByTime(2000);
    await expect(response).rejects.toThrow();
});
