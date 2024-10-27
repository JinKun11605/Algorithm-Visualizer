import { centerBlocks } from "../helpers/position-blocks.js";
import { pause, swapBlocks } from "../helpers/swap-blocks.js";

const blocks = Array.from(document.querySelectorAll('.block'));
const numbersArray = blocks.map(block => parseInt(block.textContent));

// * Gọi hàm centerBlocks từ position-blocks.js
centerBlocks("visualization", blocks, 20);

const bubbleSort = async (arr) => {
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        let swapped = false;
        
        for (let j = i+ 1; j < n; j++) {
            blocks[i].style.backgroundColor = 'red';
            blocks[j].style.backgroundColor = 'red';
            // * Gọi hàm pause từ swap-blocks.js
            await pause(500);

            if (arr[i] > arr[j]) {
                // Đổi chỗ hai phần tử trong mảng
                [arr[i], arr[j]] = [arr[j], arr[i]];
                // * Gọi hàm swapBlocks từ swap-blocks.js
                await swapBlocks(blocks[i], blocks[j]);

                swapped = true;
            }
            blocks[i].style.backgroundColor = '#7FC5FC';
            blocks[j].style.backgroundColor = '#7FC5FC';
        }
        blocks[i].style.backgroundColor = 'green';

        if (!swapped) break; // Nếu không có hoán đổi nào, dừng thuật toán
    }
    // for (let k = 0; k < n; k++) {
    //     blocks[k].style.backgroundColor = 'green';
    // }
}

// Nút "Bắt Đầu Sắp Xếp"
const sortButton = document.querySelector("#sort-button");
sortButton.addEventListener('click', () => {
    bubbleSort(numbersArray);
});
