function clearForm() {
    setTimeout(() => {
        const form = document.getElementById('content-form');
        if (form) {
            form.reset();
        }
    }, 500);
}