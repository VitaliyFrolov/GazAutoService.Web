document.addEventListener("DOMContentLoaded", () => {
    const mainTabs = document.querySelectorAll(".price__tab");
    const subTabsContainer = document.querySelector(".price__sub-tabs");
    const contentContainer = document.querySelector(".price__content");

    let selectedMainTab = null;
    
    mainTabs.forEach(button => {
        button.addEventListener("click", async () => {
            mainTabs.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            selectedMainTab = button.dataset.tab;
            try {
                const response = await fetch(`/sub-tabs?main_tab=${encodeURIComponent(selectedMainTab)}`);
                if (!response.ok) throw new Error("Ошибка загрузки данных");

                const html = await response.text();
                subTabsContainer.innerHTML = html;
                contentContainer.innerHTML = "";

                addSubTabListeners();
            } catch (error) {
                console.error(error);
                subTabsContainer.innerHTML = "<p class='error'>Не удалось загрузить данные</p>";
            }
        });
    });

    function addSubTabListeners() {
        const subTabs = document.querySelectorAll(".sub-tab");
        
        subTabs.forEach(subTab => {
            subTab.addEventListener("click", async () => {
                subTabs.forEach(tab => tab.classList.remove("active"));
                subTab.classList.add("active");

                const subTabName = subTab.dataset.subtab;
                try {
                    const response = await fetch(`/services?main_tab=${encodeURIComponent(selectedMainTab)}&sub_tab=${encodeURIComponent(subTabName)}`);
                    if (!response.ok) throw new Error("Ошибка загрузки данных");

                    const html = await response.text();
                    contentContainer.innerHTML = html;
                } catch (error) {
                    console.error(error);
                    contentContainer.innerHTML = "<p class='error'>Не удалось загрузить данные</p>";
                }
            });
        });
    }

    if (mainTabs.length > 0) {
        mainTabs[0].click();
    }
});
