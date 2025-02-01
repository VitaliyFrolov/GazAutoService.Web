document.addEventListener('DOMContentLoaded', () => {
    const burgerButton = document.querySelector('.header__burger-menu');
    const navMobile = document.querySelector('.nav-mobile');
    const overlay = document.querySelector('.overlay');
    const body = document.querySelector('body');
    const exitButton = document.querySelector('.ex-btn');

    const toggleMenu = () => {
        navMobile.classList.toggle('active');
        overlay.classList.toggle('active');

        if (navMobile.classList.contains('active')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
        }
    };

    const exitMenu = () => {
        navMobile.classList.remove('active');
        overlay.classList.remove('active');
        body.style.overflow = '';
    }

    burgerButton.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    if (exitButton) {
        exitButton.addEventListener('click', exitMenu);
    }
});
