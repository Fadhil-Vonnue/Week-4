export function searchFilter() {
    function findCards() {
        const noresult = document.querySelector(".noresult");
        noresult.style.display = "none";
        var prevQuery = "";
        const query = document
            .getElementById("searchCard")
            .value.toLowerCase()
            .trim();
        let count = 0;
        document.querySelectorAll(".card").forEach((e) => {
            if (e.innerText.toLowerCase().includes(query)) {
                e.style.display = "flex";
                e.innerHTML = e.innerHTML.replace(
                    /(<span class="highlight">|<\/span>)/gim,
                    ""
                );
                if (query !== "") {
                    var regQuery = new RegExp(query, "gi");
                    e.innerHTML = e.innerHTML.replaceAll(
                        regQuery,
                        `<span class="highlight">$&</span>`
                    );
                }
            } else {
                count++;
                e.style.display = "none";
            }
        });
        if (count == document.querySelectorAll(".card").length) {
            noresult.style.display = "block";
        }
    }
    document.getElementById("searchCard").addEventListener("input", () => {
        findCards1();
    });
    const params1 = new URLSearchParams(location.search);
    const getquery = params1.get("query");
    if (getquery) {
        document.getElementById("searchCard").value = getquery;
        findCards();
    } else {
        try {
            const initialState = {
                allcontent: document.querySelector(".cards").innerHTML,
                searchquery: getquery ? getquery : "",
            };
            history.replaceState(initialState, "", document.location.href);
        } catch (err) {
            alert(err);
        }
    }
    window.addEventListener("popstate", (event) => {
        if (event.state) {
            document.querySelector(".cards").innerHTML = event.state.allcontent;
            document.getElementById("searchCard").value =
                event.state.searchquery;
        }
    });
    function findCards1() {
        findCards();
        try {
            const result = {
                allcontent: document.querySelector(".cards").innerHTML,
                searchquery: document.getElementById("searchCard").value,
            };
            history.pushState(
                result,
                "",
                `service.html?query=${document.getElementById("searchCard").value}`
            );
        } catch (err) {
            alert(err);
        }
    }
}
