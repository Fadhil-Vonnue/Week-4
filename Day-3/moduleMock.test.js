const init = require("./darkMode.js");
beforeEach(() => {
    console.log(document.body.innerHTML);
    document.body.innerHTML = "<div id=app></div>";
});
afterEach(() => {
    jest.restoreAllMocks();
    //It restores the original implementation of mocks created with spyOn
});
describe("Darkmode Init", () => {
    const spy = jest
        .spyOn(Storage.prototype, "getItem")
        .mockImplementationOnce((data) => {
            if (data === "theme") return "dark";
        });
    test("Darkmode ", async () => {
        const item = localStorage.getItem("theme");
        await expect(item).toBe("dark");
    });
    test("Darkmode test", async () => {
        init.onLoadSetTheme();
        expect(spy).toHaveBeenCalledWith("theme");
    });
});
const search = require("./weather.js");
const fetchWeather = require("./utils.js");
jest.mock("./utils.js");
describe("Weather API test", () => {
    test("TESTING API", async () => {
        let city = "GERMANY";
        await search.search(city);
        await expect(fetchWeather).toHaveBeenCalledWith(
            `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`
        );
    });
});
