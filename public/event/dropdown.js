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
