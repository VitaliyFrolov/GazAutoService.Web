document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('sub-tab')) {
            document.querySelectorAll('.sub-tab').forEach(tab => {
                tab.classList.remove('active');
            });
    
            event.target.classList.add('active');
        }
    });
    
    document.addEventListener('htmx:afterSwap', () => {
        const firstSubTab = document.querySelector('.sub-tab');
        if (firstSubTab && !document.querySelector('.sub-tab.active')) {
            firstSubTab.classList.add('active');
        }
    });
    
})