document.addEventListener("click", (event) => {
    if (event.target.classList.contains("vacancies__title")) {
        const parentItem = event.target.closest(".vacancies__item");
        const content = parentItem.querySelector(".vacancies__item-content");

        if (content) {
            content.classList.toggle("active");
        }
    }
});