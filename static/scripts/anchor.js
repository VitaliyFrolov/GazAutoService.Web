document.addEventListener("DOMContentLoaded", () => {
    if (window.location.hash) {
        smoothScroll(window.location.hash);
    }

    const navMobile = document.querySelector(".nav-mobile");
    if (navMobile) {
        addSmoothScrolling(navMobile);
    }
});

function smoothScroll(hash) {
    const target = document.querySelector(hash);
    if (target) {
        setTimeout(() => {
            window.scrollTo({
                top: target.offsetTop - 50,
                behavior: "smooth",
            });
        }, 100);
    }
}

function addSmoothScrolling(container) {
    container.querySelectorAll('a[href^="/#"]').forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const hash = link.getAttribute("href").replace("/", "");
            history.pushState(null, null, hash);
            smoothScroll(hash);
        });
    });
}
