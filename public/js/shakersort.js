import { centerBlocks } from "../helpers/position-blocks.js";
import { pause, swapBlocks } from "../helpers/swap-blocks.js";

const blocks = Array.from(document.querySelectorAll('.block'));
const numbersArray = blocks.map(block => parseInt(block.textContent));

// * Gọi hàm centerBlocks từ position-blocks.js
centerBlocks("visualization", blocks, 20);

const shakerSort = async (arr) => {
    const n = arr.length;
	let l = 0, r = n - 1, k = n;

    while (l < r) {
        let j = r;
        
        while (j > l) {
            if (arr[j - 1] > arr[j]) {
                blocks[j - 1].style.backgroundColor = '#3E97CF';
                blocks[j].style.backgroundColor = '#3E97CF';

                // * Gọi hàm pause từ swap-blocks.js
                await pause(500);
                [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]];

                // * Gọi hàm swapBlocks từ swap-blocks.js
                await swapBlocks(blocks[j - 1], blocks[j]);

                k = j;
            }
            blocks[j - 1].style.backgroundColor = '#5C636A';
            blocks[j].style.backgroundColor = '#5C636A';
            j--;
        }
        for (let t = 0; t <= k; t++) {
            blocks[t].style.backgroundColor = "#4DBE8A"; // Đổi màu xanh có các ô đã đúng vị trí
        }

        l = k;

        j = l;
        while (r > j) {
            if (arr[j] > arr[j + 1]) {
                blocks[j].style.backgroundColor = '#3E97CF';
                blocks[j + 1].style.backgroundColor = '#3E97CF';

                // * Gọi hàm pause từ swap-blocks.js
                await pause(500);
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

                // * Gọi hàm swapBlocks từ swap-blocks.js
                await swapBlocks(blocks[j], blocks[j + 1]);

                k = j;
            }
            blocks[j].style.backgroundColor = '#5C636A';
            blocks[j + 1].style.backgroundColor = '#5C636A';
            j++;
        }
        for (let t = k; t <= r; t++) {
            blocks[t].style.backgroundColor = "#4DBE8A"; // Đổi màu xanh có các ô đã đúng vị trí
        }

        r = k;
    }
}

// Nút "Bắt Đầu Sắp Xếp"
const sortButton = document.querySelector("#sort-button");
sortButton.addEventListener('click', () => {
    shakerSort(numbersArray);
})
