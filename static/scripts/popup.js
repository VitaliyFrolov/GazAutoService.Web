document.addEventListener('DOMContentLoaded', () => {
    const openButtons = document.querySelectorAll('.open-popup');
    const closeButton = document.querySelector('[data-popup-close]');
    const popupOverlay = document.querySelector('[data-popup-overlay]');

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

    const submitButton = document.querySelector('[data-popup-close-on-submit]');
    if (submitButton) {
        submitButton.addEventListener('click', () => {
            setTimeout(() => {
                closePopup();
            }, 1000);
        });
    }
});

const clearFormAndClosePopup = () => {
    const form = document.querySelector('[data-form]');
    if (form) {
        form.reset();
    }
};

const clearErrorMessages = () => {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach((message) => {
        message.remove();
    });
};
