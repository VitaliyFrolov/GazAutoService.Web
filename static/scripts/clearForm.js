function clearForms() {
    setTimeout(() => {
        const forms = document.querySelectorAll('[data-form]');
        const modal = document.querySelector('[data-completed-popup]');

        forms.forEach((form) => form.reset());

        if (modal) {
            modal.classList.add("show");

            setTimeout(() => {
                modal.classList.remove("show");
            }, 2000);
        }
    }, 500);
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector('[data-form]');
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            clearForms();
        });
    }
});
