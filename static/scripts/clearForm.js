function clearForms() {
    setTimeout(() => {
        const forms = document.querySelectorAll('[data-form]');
        forms.forEach((form) => form.reset());
    }, 500);
}
