document.addEventListener('DOMContentLoaded', () => {
    const openButton = document.getElementById('openPopup');
    const closeButton = document.getElementById('closePopup');
    const popupOverlay = document.getElementById('popupOverlay');

    openButton.addEventListener('click', () => {
        popupOverlay.style.display = 'flex';
        document.body.classList.add('no-scroll');
    });

    closeButton.addEventListener('click', () => {
        popupOverlay.style.display = 'none';
        document.body.classList.remove('no-scroll')
    });

    popupOverlay.addEventListener('click', (event) => {
        if (event.target === popupOverlay) {
            popupOverlay.style.display = 'none';
            document.body.classList.remove('no-scroll');
        }
    });
});