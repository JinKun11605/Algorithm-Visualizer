import { centerBlocks } from "../utils/position-blocks.js";
import { pause, swapBlocks } from "../utils/swap-blocks.js";

const blocks = Array.from(document.querySelectorAll(".block"));
const numbersArray = blocks.map(block => parseInt(block.textContent));

// * Gọi hàm centerBlocks từ position-blocks.js
centerBlocks("visualization", blocks, 20);

const selectionSort = async (arr, blocks) => {
    let n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        let min = i;
        blocks[i].style.backgroundColor = "#3E97CF"; // Blue
        await pause(300)
        
        for (let j = i + 1; j < n; j++) {
            if (arr[min] > arr[j]) {
                min = j;
            }
        }

        if (min != i) {
            [arr[min], arr[i]] = [arr[i], arr[min]];
            blocks[min].style.backgroundColor = "#E94345"; //! Red

            await pause(200);
            await swapBlocks(blocks[min], blocks[i], 200);
        }

        blocks[i].style.backgroundColor = "#5C636A";
        blocks[min].style.backgroundColor = "#5C636A";

        for (let k = 0; k <= i; k++) {
            blocks[k].style.backgroundColor = "#4DBE8A";
        }
        
    }
    for (let k = 0; k < n; k++) {
        blocks[k].style.backgroundColor = "#4DBE8A";
    }
}

// Nút "Bắt Đầu Sắp Xếp"
const sortButton = document.querySelector("#sort-button");
sortButton.addEventListener("click", () => {
    selectionSort(numbersArray, blocks);
})
