const dropdowns = document.querySelectorAll(".dropdown");

if (dropdowns.length > 0){
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener("click", (event) => {
            const subMenu = dropdown.nextElementSibling;
            const openDropdown = dropdown.querySelector(".fa-caret-down");

            if (subMenu){
                openDropdown.classList.toggle("open")
                subMenu.classList.toggle("show")
            }
        })
    });
} 

document.addEventListener("DOMContentLoaded", () => {
    if (window.location.href.includes("/sort")) {
        // Tìm dropdown có text là "Sort"
        dropdowns.forEach(dropdown => {
            const dropdownText = dropdown.querySelector(".dropdown-text");
            if (dropdownText && dropdownText.textContent.trim() === "Sort") {
                const sortSubMenu = dropdown.nextElementSibling;
                const caretIcon = dropdown.querySelector(".fa-caret-down");

                if (sortSubMenu && caretIcon) {
                    caretIcon.classList.add("open");
                    sortSubMenu.classList.add("show");
                }
            }
        });
    }
    if (window.location.href.includes("/search")) {
        // Tìm dropdown có text là "Search"
        dropdowns.forEach(dropdown => {
            const dropdownText = dropdown.querySelector(".dropdown-text");
            if (dropdownText && dropdownText.textContent.trim() === "Search") {
                const searchSubMenu = dropdown.nextElementSibling;
                const caretIcon = dropdown.querySelector(".fa-caret-down");

                if (searchSubMenu && caretIcon) {
                    caretIcon.classList.add("open");
                    searchSubMenu.classList.add("show");
                }
            }
        });
    }
});
