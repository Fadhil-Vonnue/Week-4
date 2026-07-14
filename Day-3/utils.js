async function fetchWeather(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error while fetching");
        }
        const data = await response.json();
        return data;
    } catch (err) {
        return Promise.reject(err);
    }
}
module.exports = fetchWeather;
