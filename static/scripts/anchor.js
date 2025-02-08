document.addEventListener("DOMContentLoaded", () => {
    if (window.location.hash) {
        smoothScroll(window.location.hash);
    }

    const navMobile = document.querySelector(".nav-mobile");
    const overlay = document.querySelector(".overlay");
    const body = document.querySelector("body");

    if (navMobile) {
        addSmoothScrolling(navMobile);
    }

    function closeMenu() {
        navMobile.classList.remove("active");
        overlay.classList.remove("active");
        body.style.overflow = "";
    }

    function addSmoothScrolling(container) {
        container.querySelectorAll('a[href^="/#"], a[href^="#"]').forEach((link) => {
            link.addEventListener("click", (e) => {
                const hash = link.getAttribute("href").replace("/", "");
                const isSamePage = window.location.pathname === "/";

                if (isSamePage) {
                    e.preventDefault();
                    history.pushState(null, null, hash);
                    smoothScroll(hash);
                    closeMenu();
                } else {
                    window.location.href = "/" + hash;
                }
            });
        });
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