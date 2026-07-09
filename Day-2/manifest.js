let prompt = null;
const button = document.querySelector("#install");

window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    prompt = event;
    button.removeAttribute("hidden");
});
button.addEventListener("click", async () => {
    if (!prompt) {
        return;
    }
    const result = await prompt.prompt();
    console.log(`Install prompt was: ${result.outcome}`);
    prompt = null;
    button.setAttribute("hidden", "");
});
