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
            openPopup();
        });
    });

    closeButton.addEventListener('click', closePopup);

    popupOverlay.addEventListener('click', (event) => {
        if (event.target === popupOverlay) {
            closePopup();
        }
    });

    const openPopup = () => {
        if (popupOverlay.style.display !== 'flex') {
            popupOverlay.style.display = 'flex';
            document.body.classList.add('no-scroll');
            document.addEventListener('keydown', handleEscapeKey);
        }
    };
});

const clearFormAndClosePopup = () => {
    const form = document.getElementById('content-form');
    if (form) {
        form.reset();
    }
    closePopup(); 
};

const clearErrorMessages = () => {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach((message) => {
        message.remove();
    });
};
