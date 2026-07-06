import { init as initDarkMode } from "./darkMode.js";
import { init as initAccordion } from "./accordion.js";
import { init as initNav } from "./nav.js";
import { lightBox, trapFocus } from "./js/components/lightbox.js";
import { progressBar } from "./js/components/progressbar.js";
import { rules, FormValidator } from "./js/components/formValidator.js";
import { showToast } from "./js/util.js";
import { renderServiceCards } from "./js/components/serviceCard.js";
import { searchFilter } from "./js/components/searchfilter.js";
import { renderTeamCards } from "./js/components/teamCard.js";
import { latestPost } from "./js/components/latestPosts.js";

window.onload = (event) => {
    initDarkMode();
    initAccordion();
    initNav();
    window.addEventListener("scroll", (e) => {
        if (window.scrollY >= 600) {
            document.querySelector(".backtop").style.display = "flex";
            document.querySelector(".backtop").style.display = "none";
        }
    });
    document.querySelector(".backtop").addEventListener("click", (e) => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });
    const path = window.location.pathname;
    if (path.includes("team")) {
        renderTeamCards();
        const overlay = document.getElementsByClassName("image-overlay")[0];
        trapFocus(overlay);
    }
    if (path.includes("home")) {
        latestPost();
        progressBar();
        const callBack = (entries) => {
            const target = document.querySelectorAll(".feature");
            if (!entries[0].isIntersecting) {
                return;
            } else {
                document.querySelector(".mainheader").style.opacity = "100";
                target.forEach((el) => {
                    el.classList.add("animateOnScroll");
                });
            }
        };
        const observer = new IntersectionObserver(callBack);
        observer.observe(document.querySelector(".homegrid"));
    }
    if (path.includes("contact")) {
        let flag;
        const form = document.querySelector("form");
        const newform = new FormValidator(form, rules);
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            e.target.querySelector(`[type="submit"]`).disabled = true;
            document.querySelector(".spin").style.display = "inline-block";
            setTimeout(() => {
                document.querySelector(".spin").style.display = "none";
                flag = newform.validateAll();
                if (flag) {
                    showToast({ message: "Form unsuccessful" }, 3, "error");
                } else {
                    showToast(
                        { message: "Form sent successfully" },
                        3,
                        "success"
                    );
                }
                document.querySelector(`[type="submit"]`).disabled = false;
                form.reset();
            }, 1500);
        });
    }
    if (path.includes("services")) {
        renderServiceCards();
        searchFilter();
    }
};
