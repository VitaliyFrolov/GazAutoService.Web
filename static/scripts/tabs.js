document.addEventListener("DOMContentLoaded", () => {
    const mainTabs = document.querySelectorAll(".price__tab");
    const subTabsContainer = document.querySelector(".price__sub-tabs");
    const contentContainer = document.querySelector(".price__content");

    const defaultMainTab = "ГАЗ бизнес 4216";
    const defaultSubTab = "Двигатель";

    let selectedMainTab = localStorage.getItem("selectedMainTab") || defaultMainTab;
    let selectedSubTab = localStorage.getItem("selectedSubTab") || defaultSubTab;

    mainTabs.forEach(button => {
        button.addEventListener("click", async () => {
            mainTabs.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            selectedMainTab = button.dataset.tab;
            localStorage.setItem("selectedMainTab", selectedMainTab);

            try {
                const response = await fetch(`/sub-tabs?main_tab=${encodeURIComponent(selectedMainTab)}`);
                if (!response.ok) throw new Error("Ошибка загрузки данных");

                const html = await response.text();
                subTabsContainer.innerHTML = html;
                contentContainer.innerHTML = "";

                addSubTabListeners();
                selectFirstSubTab();
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

                selectedSubTab = subTab.dataset.subtab;
                localStorage.setItem("selectedSubTab", selectedSubTab);

                try {
                    const response = await fetch(`/services?main_tab=${encodeURIComponent(selectedMainTab)}&sub_tab=${encodeURIComponent(selectedSubTab)}`);
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

    function selectFirstSubTab() {
        const subTabs = document.querySelectorAll(".sub-tab");
        if (subTabs.length > 0) {
            selectedSubTab = subTabs[0].dataset.subtab;
            subTabs[0].classList.add("active");
            localStorage.setItem("selectedSubTab", selectedSubTab);

            fetchSubTabContent(subTabs[0]);
        }
    }

    function fetchSubTabContent(subTabElement) {
        try {
            const response = fetch(`/services?main_tab=${encodeURIComponent(selectedMainTab)}&sub_tab=${encodeURIComponent(subTabElement.dataset.subtab)}`);
            response.then(res => {
                if (!res.ok) throw new Error("Ошибка загрузки данных");

                return res.text();
            }).then(html => {
                contentContainer.innerHTML = html;
            });
        } catch (error) {
            console.error(error);
            contentContainer.innerHTML = "<p class='error'>Не удалось загрузить данные</p>";
        }
    }

    function selectDefaultTabs() {
        if (selectedMainTab) {
            const defaultMainTabElement = document.querySelector(`[data-tab="${selectedMainTab}"]`);
            if (defaultMainTabElement) {
                defaultMainTabElement.click();
                selectedMainTab = defaultMainTabElement.dataset.tab;

                if (selectedSubTab) {
                    const subTab = document.querySelector(`[data-subtab="${selectedSubTab}"]`);
                    if (subTab) {
                        subTab.click();
                    }
                } else {
                    selectFirstSubTab();
                }
            }
        } else {
            const defaultMainTabElement = document.querySelector(`[data-tab="${defaultMainTab}"]`);
            if (defaultMainTabElement) {
                defaultMainTabElement.click();
                selectedMainTab = defaultMainTab;

                const subTabs = document.querySelectorAll(".sub-tab");
                if (subTabs.length > 0) {
                    selectedSubTab = defaultSubTab;
                    const defaultSubTabElement = document.querySelector(`[data-subtab="${defaultSubTab}"]`);
                    if (defaultSubTabElement) {
                        defaultSubTabElement.click();
                    }
                }
            }
        }
    }
    
    selectDefaultTabs();
});
