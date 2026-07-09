const buttons = document.querySelectorAll(".copy-button");
for (const button of buttons)
    button.addEventListener("click", async () => {
        const text = button.previousElementSibling.textContent;
        navigator.clipboard.writeText(text).then(
            () => {
                alert("TEXT COPIED");
            },
            () => {
                alert("FAILED TO COPY");
            }
        );
    });
const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
    if ((!"Notification") in window) {
        alert("NOTIFICATION NOT SUPPORTED");
    } else if (Notification.permission === "granted") {
        const notif = new Notification("Form sent successfully");
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
                const notif = new Notification("Form sent successfully");
            }
        });
    }
});
function success(location) {
    const longitude = location.coords.longitude;
    const latitude = location.coords.latitude;
    getCityName(latitude, longitude).then((data) => {
        document.querySelector("#location").value = data.city;
    });
}
function err(msg) {
    alert("please share location to autofill location");
}

navigator.geolocation.getCurrentPosition(success, err);

async function getCityName(lat, lon) {
    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching city name:", error);
    }
}
getCityName(40.7128, -74.006);
const button = document.getElementById("share");

const shareData = {
    title: document.title,
    text: "Check this page",
    url: window.location.href,
};

button.addEventListener("click", async () => {
    if (navigator.share) {
        try {
            await navigator.share(shareData);
            console.log("Content shared");
        } catch (err) {
            console.log(`Couldnt share - ${err}`);
        }
    } else {
        try {
            await navigator.clipboard.writeText(shareData.url);
            const originalText = button.textContent;
            button.textContent = "Link copied";
            setTimeout(() => {
                button.textContent = originalText;
            }, 2000);
        } catch (copyErr) {
            alert(`Could not copy link - ${shareData.url} to clipboard.`);
        }
    }
});
