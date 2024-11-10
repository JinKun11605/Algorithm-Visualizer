import { centerBlocks } from "../helpers/position-blocks.js";
import { pause, swapBlocks } from "../helpers/swap-blocks.js";

const blocks = Array.from(document.querySelectorAll('.block'));
const numbersArray = blocks.map(block => parseInt(block.textContent));

// * Gọi hàm centerBlocks từ position-blocks.js
centerBlocks("visualization", blocks, 20);

const insertionSort = async (arr, blocks) => {
    const n = arr.length;

    for (let i = 0; i < n; i++) { //! Bắt đầu từ 0 để đèn sáng từ đầu.
        let index = i;
        blocks[index].style.backgroundColor = "#E94345";
        await pause(500);

        while (index > 0 && arr[index] < arr[index - 1]) {
            await pause(50);
            await swapBlocks(blocks[index - 1], blocks[index]);

            blocks[index].style.backgroundColor = "#5C636A";

            [arr[index], arr[index - 1]] = [arr[index - 1], arr[index]];
            index--;

            blocks[index].style.backgroundColor = "#E94345";
        }
        blocks[index].style.backgroundColor = "#5C636A";
    }

    for (let k = 0; k < n; k++) {
        blocks[k].style.backgroundColor = '#4DBE8A';
    }
}

// Nút "Bắt Đầu Sắp Xếp"
const sortButton = document.querySelector("#sort-button");
sortButton.addEventListener('click', () => {
    insertionSort(numbersArray, blocks);
});