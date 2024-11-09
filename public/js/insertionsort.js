import { centerBlocks } from "../helpers/position-blocks.js";
import { pause, swapBlocks } from "../helpers/swap-blocks.js";

const blocks = Array.from(document.querySelectorAll('.block'));
const numbersArray = blocks.map(block => parseInt(block.textContent));

// * Gọi hàm centerBlocks từ position-blocks.js
centerBlocks("visualization", blocks, 20);

const insertionSort = async (arr, blocks) => {
    const n = arr.length;

    for (let i = 1; i < n; i++){
        let key = arr[i];
        let index = i - 1;
        blocks[i].style.backgroundColor = "#3E97CF";

        while (index >= 0 && key < arr[index]) {
            arr[index + 1] = arr[index];
            blocks[index + 1].textContent = blocks[index + 1].textContent;
            index--;

            await pause(500);
        }
        arr[index + 1] = key;
        blocks[index + 1].textContent = key;

        await pause(500);

        blocks[key].style.backgroundColor = "#5C636A";
    }
}

// Nút "Bắt Đầu Sắp Xếp"
const sortButton = document.querySelector("#sort-button");
sortButton.addEventListener('click', () => {
    insertionSort(numbersArray, blocks);
});
