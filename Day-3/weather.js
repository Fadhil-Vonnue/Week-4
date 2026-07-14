const newurl =
    "https://api.open-meteo.com/v1/forecast?latitude=51.5085&longitude=-0.1257&current=temperature_2m,weather_code,wind_speed_10m";
const fetchWeather = require("./utils.js");
async function search(searchInput) {
    const searchinput = searchInput;
    const newsearch = `https://geocoding-api.open-meteo.com/v1/search?name=${searchinput}&count=1&language=en&format=json`;
    try {
        const data = await fetchWeather(newsearch);
    } catch (err) {
        return Promise.reject(err);
    }
}
module.exports = { search };
