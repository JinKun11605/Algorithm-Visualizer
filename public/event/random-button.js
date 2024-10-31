const randomButton = document.querySelector("#random-button");
randomButton.addEventListener("click", () => {
    const length = Math.ceil(Math.random() * 16);
    const numbersArray = Array.from({ length: length }, () => Math.ceil(Math.random() * 16));
    
    const numbersInput = document.querySelector("#numbers-input");
    numbersInput.value = numbersArray.join(", ");
})