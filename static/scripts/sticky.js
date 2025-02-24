document.addEventListener("DOMContentLoaded", function () {
    const nav = document.querySelector('.nav');
    const header = document.querySelector('.header');
    const headerOffset = header.offsetTop + header.offsetHeight;

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > headerOffset) {
            nav.classList.add('fixed');
        } else {
            nav.classList.remove('fixed');
        }
    });
});
