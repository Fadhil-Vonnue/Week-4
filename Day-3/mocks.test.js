const obj = require("./eventMocks.js");

test("event emitter listener mocking", () => {
    const listener = jest.fn((x) => console.log(x));
    obj.emitter.on("listener1", listener);
    let arg = "Argument";
    obj.emitter.emit("listener1", arg);
    expect(listener).toHaveBeenCalledWith(arg);
});

describe("testing fetchJSOn", () => {
    const mockData = { id: 1, name: "test" };
    test("Successful fetch", async () => {
        jest.spyOn(global, "fetch").mockResolvedValueOnce({
            json: async () => mockData,
            ok: true,
        });
        const data = await obj.fetchJson("/example");
        expect(data).toEqual(mockData);
        expect(fetch).toHaveBeenCalledWith("/example");
    });
    test("Http error", async () => {
        jest.spyOn(global, "fetch").mockResolvedValueOnce({
            json: async () => mockData,
            ok: false,
        });
        await expect(obj.fetchJson("/example")).rejects.toThrow("HTTP Error");
    });
    test("Fetch Failure", async () => {
        jest.spyOn(global, "fetch").mockResolvedValueOnce(
            Promise.reject(new Error("fetch failed"))
        );
        await expect(obj.fetchJson("/example")).rejects.toThrow("fetch failed");
    });
});
describe("Retry logic", () => {
    const retry = jest.fn(() => {
        return Promise.resolve("Original Call");
    });
    test("Mocking Retry fetch", async () => {
        retry.mockImplementationOnce(() =>
            Promise.reject(new Error("Failed to fetch, RETRY"))
        );
        expect(retry()).rejects.toThrow();
    });
    test("Mocking Retry again fetch", async () => {
        expect(retry()).resolves.toBe("Original Call");
    });
});
