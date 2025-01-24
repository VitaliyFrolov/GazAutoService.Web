document.addEventListener('DOMContentLoaded', () => {
    const openButtons = document.querySelectorAll('.open-popup');
    const closeButton = document.getElementById('closePopup');
    const popupOverlay = document.getElementById('popupOverlay');

    const closePopup = () => {
        popupOverlay.style.display = 'none';
        document.body.classList.remove('no-scroll');
        document.removeEventListener('keydown', handleEscapeKey);
    };

    const handleEscapeKey = (event) => {
        if (event.key === 'Escape') {
            closePopup();
        }
    };

    openButtons.forEach((button) => {
        button.addEventListener('click', () => {
            popupOverlay.style.display = 'flex';
            document.body.classList.add('no-scroll');
            document.addEventListener('keydown', handleEscapeKey);
        });
    });

    closeButton.addEventListener('click', closePopup);

    popupOverlay.addEventListener('click', (event) => {
        if (event.target === popupOverlay) {
            closePopup();
        }
    });
});
