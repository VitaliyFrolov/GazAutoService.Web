document.addEventListener('DOMContentLoaded', () => {
    const openButton = document.getElementById('openPopup');
    const closeButton = document.getElementById('closePopup');
    const popupOverlay = document.getElementById('popupOverlay');

    openButton.addEventListener('click', () => {
        popupOverlay.style.display = 'flex';
    });

    closeButton.addEventListener('click', () => {
        popupOverlay.style.display = 'none';
    });

    popupOverlay.addEventListener('click', (event) => {
        if (event.target === popupOverlay) {
            popupOverlay.style.display = 'none';
        }
    });
});