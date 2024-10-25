import { centerBlocks } from "../helpers/position-blocks.js";
import { pause, swapBlocks } from "../helpers/swap-blocks.js";

document.addEventListener('DOMContentLoaded', async function () {
    const sortButton = document.getElementById('sort-button');
    let blocks = Array.from(document.querySelectorAll('.block'));
    let numbersArray = blocks.map(block => parseInt(block.textContent));

    // * Gọi hàm centerBlocks từ position-blocks.js
    centerBlocks("visualization", blocks, 20);

    async function bubbleSort(arr) {
        const n = arr.length;
        for (let i = 0; i < n - 1; i++) {
            let swapped = false;
            for (let j = 0; j < n - i - 1; j++) {
                blocks[j].style.backgroundColor = 'red';
                blocks[j + 1].style.backgroundColor = 'red';

                // * Gọi hàm pause từ swap-blocks.js
                await pause(500);

                if (arr[j] > arr[j + 1]) {
                    // Đổi chỗ hai phần tử trong mảng
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

                    // * Gọi hàm swapBlocks từ swap-blocks.js
                    await swapBlocks(blocks[j], blocks[j + 1]);

                    swapped = true;
                }

                blocks[j].style.backgroundColor = '#7FC5FC';
                blocks[j + 1].style.backgroundColor = '#7FC5FC';
            }
            blocks[n - i - 1].style.backgroundColor = 'green';

            if (!swapped) break; // Nếu không có hoán đổi nào, dừng thuật toán
        }
        //test
        // Đánh dấu các khối còn lại là đã sắp xếp
        for (let k = 0; k < n; k++) {
            blocks[k].style.backgroundColor = 'green';
        }
    }

    // Nút "Bắt Đầu Sắp Xếp"
    sortButton.addEventListener('click', () => {
        bubbleSort(numbersArray);
    });
});
