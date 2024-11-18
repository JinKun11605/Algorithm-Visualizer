import { centerBlocks } from "../helpers/position-blocks.js";
import { pause, swapBlocks } from "../helpers/swap-blocks.js";

const blocks = Array.from(document.querySelectorAll(".block"));
const numbersArray = blocks.map(block => parseInt(block.textContent));

// * Gọi hàm centerBlocks từ position-blocks.js
centerBlocks("visualization", blocks, 20);

const bubbleSort = async (arr) => {
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        let swapped = false;

        for (let j = 0; j < n - i - 1; j++) {
            blocks[j].style.backgroundColor = "#3E97CF"; //! Blue
            blocks[j + 1].style.backgroundColor = "#3E97CF";

            // * Gọi hàm pause từ swap-blocks.js
            await pause(100);

            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

                // * Gọi hàm swapBlocks từ swap-blocks.js
                await swapBlocks(blocks[j], blocks[j + 1], 200);

                swapped = true;
            }
            blocks[j].style.backgroundColor = "#5C636A";
            blocks[j + 1].style.backgroundColor = "#5C636A";
        }
        blocks[n - i - 1].style.backgroundColor = "#4DBE8A";

        if (!swapped) break; // Nếu không có hoán đổi, đã sắp xếp xong
    }
    for (let k = 0; k < n; k++) {
        blocks[k].style.backgroundColor = "#4DBE8A"; //! Green
    }
}

// Nút "Bắt Đầu Sắp Xếp"
const sortButton = document.querySelector("#sort-button");
sortButton.addEventListener("click", () => {
    bubbleSort(numbersArray);
})
