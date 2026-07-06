export async function fetchJSON(url, options) {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error("Error while fetching");
        }
        const data = await response.json();
        return data;
    } catch (err) {
        return Promise.reject(err);
    }
}

export function debounce(fn, time = 300) {
    setTimeout(fn, time);
}

export function showToast(err, duration, type = "error") {
    const check = document.querySelector(".toaster");
    if (check) {
        check.remove();
    }
    const toaster = document.createElement("div");
    toaster.classList.add("toaster");
    const toasterWarning = document.createElement("div");
    toasterWarning.classList.add("toastWarning");
    const toasterErrorMessage = document.createElement("div");
    toasterErrorMessage.classList.add("toastErrormessage");
    const toastProgress = document.createElement("div");
    toastProgress.classList.add("toastProgress");
    const CSSstyle = document.createElement("style");
    let toastColor = "#ffd7d3";
    let toastProgressBar = "red";
    if (type.toLowerCase() == "error") {
        toasterWarning.innerHTML = `<img width="20" height="20" src="https://img.icons8.com/?size=100&id=8122&format=png&color=FF0000"/>`;
    }
    if (type.toLowerCase() === "success") {
        toasterWarning.innerHTML = `<img width="20" height="20" src="https://img.icons8.com/?size=100&id=63312&format=png&color=000000"/>`;
        toastColor = "#8dddae;";
        toastProgressBar = "green";
    }
    if (type.toLowerCase() === "info") {
        toasterWarning.innerHTML = `<img width="20" height="20" src="https://img.icons8.com/?size=100&id=63308&format=png&color=000000"/>`;
        toastColor = "#7db5f5;";
        toastProgressBar = "blue";
    }
    if (type.toLowerCase() === "warning") {
        toasterWarning.innerHTML = `<img width="20" height="20" src="https://img.icons8.com/?size=100&id=EggHJUeUuU6C&format=png&color=000000"/>`;
        toastColor = "#f5d97d;";
        toastProgressBar = "#ffc400;";
    }
    https: toasterErrorMessage.textContent = err.message;
    CSSstyle.textContent += `*{
      box-sizing: border-box;
     }
  .animateToaster{
        animation:
          slideInRight 0.3s ease-in-out forwards,
          fadeOut 0.5s ease-in-out forwards ${duration}s;
      }
      .animateProgressBar{
        animation: toastProgress ${duration}s ease-in-out forwards;
      }
        
    .toaster {
      max-width: 300px;
      border-radius: 4px;
      border: 1px solid ${toastProgressBar};
      position: fixed;
      top: 25px;
      right: 25px;
      display: flex;
      background-color: ${toastColor};
      box-shadow: -1px 1px 10px rgba(0, 0, 0, 0.3);
      z-index: 1023;
      animation:
        slideInRight 0.3s ease-in-out forwards,
        fadeOut 0.5s ease-in-out forwards ${duration}s;
      transform: translateX(120%);
    }
    .toastErrormessage {
      padding: 0.5rem 0.5rem calc(0.5rem + 4px) 0;
    }
    .toastWarning {
      width: 30px;
      display:flex;
      justify-content:center;
      padding-bottom:12px;
      padding-top:8px;
    }
    .toastProgress {
      position: absolute;
      width: 100%;
      background-color: ${toastProgressBar};
      height: 4px;
      bottom: 0;
      left: 0;
      animation: toastProgress ${duration}s ease-in-out forwards;
    }
    @keyframes slideInRight {
      0% {
        transform: translateX(110%);
      }

      75% {
        transform: translateX(-10%);
      }

      100% {
        transform: translateX(0%);
      }
    }

    @keyframes slideOutRight {
      0% {
        transform: translateX(0%);
      }

      25% {
        transform: translateX(-10%);
      }

      100% {
        transform: translateX(110%);
      }
    }

    @keyframes fadeOut {
      0% {
        opacity: 1;
      }

      100% {
        opacity: 0;
      }
    }

    @keyframes toastProgress {
      0% {
        width: 100%;
      }

      100% {
        width: 0%;
      }
    }`;
    document.head.appendChild(CSSstyle);
    toaster.appendChild(toasterWarning);
    toaster.appendChild(toasterErrorMessage);
    toaster.appendChild(toastProgress);
    document.body.prepend(toaster);
}
export function createRetryButton(fn) {
    const div = document.createElement("div");
    div.classList.add("retryButton");
    const imageElement = document.createElement("img");
    imageElement.src = `https://img.icons8.com/?size=100&id=11684&format=png&color=FFFFFF`;
    imageElement.width = "40";
    imageElement.alt = "";
    div.appendChild(imageElement);
    imageElement.addEventListener("click", (e) => {
        fn();
        div.classList.add("hidden");
        div.remove();
    });
    return div;
}
