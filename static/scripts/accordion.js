document.addEventListener("click", (event) => {
    if (event.target.classList.contains("vacancies__title")) {
        const parentItem = event.target.closest(".vacancies__item");
        const content = parentItem.querySelector(".vacancies__item-content");

        if (content) {
            const allContents = document.querySelectorAll(".vacancies__item-content.active");
            allContents.forEach((openContent) => {
                if (openContent !== content) {
                    openContent.classList.remove("active");
                }
            });

            content.classList.toggle("active");
        }
    }
});