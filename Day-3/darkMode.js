function onLoadSetTheme(toggleElement) {
    let setTheme = localStorage.getItem("theme");
    // if (setTheme) {
    //     document.documentElement.setAttribute("data-theme", setTheme);
    // } else {
    //     const getTheme = window.matchMedia("(prefers-color-scheme: dark)");
    //     if (getTheme.matches) {
    //         localStorage.setItem("theme", "dark");
    //     } else {
    //         localStorage.setItem("theme", "light");
    //     }
    //     setTheme = localStorage.getItem("theme");
    //     document.documentElement.setAttribute("data-theme", setTheme);
    // }
    // toggleElement.setAttribute("aria-pressed", "false");
    // if (setTheme == "dark") {
    //     toggleElement.checked = true;
    //     toggleElement.setAttribute("aria-pressed", "true");
    //     toggleElement
    //         .querySelector("svg")
    //         .querySelector("g")
    //         .querySelector("path").style.fill = "yellow";
    //     toggleElement.style.backgroundColor = "black";
    // }
}

// export function darkModeToggle(e) {
//     if (e.currentTarget.ariaPressed === "false") {
//         document.documentElement.setAttribute("data-theme", "dark");
//         e.currentTarget.setAttribute("aria-pressed", "true");
//         localStorage.setItem("theme", "dark");
//         e.currentTarget
//             .querySelector("svg")
//             .querySelector("g")
//             .querySelector("path").style.fill = "yellow";
//         e.currentTarget.style.backgroundColor = "black";
//     } else {
//         document.documentElement.setAttribute("data-theme", "light");
//         e.currentTarget.setAttribute("aria-pressed", "false");
//         localStorage.setItem("theme", "light");
//         e.currentTarget
//             .querySelector("svg")
//             .querySelector("g")
//             .querySelector("path").style.fill = "black";
//         e.currentTarget.style.backgroundColor = "white";
//     }
// }
const newurl =
    "https://api.open-meteo.com/v1/forecast?latitude=51.5085&longitude=-0.1257&current=temperature_2m,weather_code,wind_speed_10m";

// async function fetchWeather(url) {
//     try {
//         const response = await fetch(url);
//         if (!response.ok) {
//             throw new Error("Error while fetching");
//         }
//         const data = await response.json();
//         return data;
//     } catch (err) {
//         return Promise.reject(err);
//     }
// }

async function search(searchInput) {
    const searchinput = searchInput;
    const newsearch = `https://geocoding-api.open-meteo.com/v1/search?name=${searchinput}&count=1&language=en&format=json`;
    try {
        const response = await fetch(newsearch);
        if (!response.ok) {
            throw new Error("Error while fetching");
        }
        const data = await response.json();
        // if (data.results) {
        //     document.querySelector(".error-message").textContent = "";
        //     let searchurl = `https://api.open-meteo.com/v1/forecast?latitude=${data.results[0].latitude}&longitude=${data.results[0].longitude}&current=temperature_2m,weather_code,wind_speed_10m`;
        //     render(searchurl);
        // } else {
        //     document.querySelector(".error-message").textContent =
        //         "NO RESULTS FOUND";
        // }
    } catch (err) {
        return Promise.reject(err);
    }
}
module.exports = { onLoadSetTheme };
