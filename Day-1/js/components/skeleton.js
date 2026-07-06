export function addSkeleton() {
    const allDivs = document.querySelectorAll(".skeletonPlaceholder");
    allDivs.forEach((el) => {
        el.classList.remove("hidden");
        el.classList.add("skeleton");
    });
}
export function removeSkeleton() {
    const allDivs = document.querySelectorAll(".skeletonPlaceholder");
    allDivs.forEach((el) => {
        el.classList.add("hidden");
        el.classList.remove("skeleton");
    });
}
