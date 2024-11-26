import { centerBlocks } from "../utils/position-blocks.js";
import { pause } from "../utils/swap-blocks.js";

const blocks = Array.from(document.querySelectorAll('.block'));
const numbersArray = blocks.map(block => parseInt(block.textContent));
const blockWidth = blocks[0].offsetWidth;
const blockMargin = 20;

// * Gọi hàm centerBlocks từ position-blocks.js
const startLeftPosition = centerBlocks("visualization", blocks, blockMargin);

const moveBlock = (block, newIndex, time = 750) => {
    const newLeft = startLeftPosition + newIndex * (blockWidth + blockMargin);

    block.style.transition = `left ${time / 1000}s ease`;
    block.style.left = `${newLeft}px`;
}

const isGreen = (block) => {
    return block.style.backgroundColor == "rgb(77, 190, 138)";
}

const binaryInsertionSort = async (arr, blocks) => {
    const n = arr.length;
    blocks[0].style.backgroundColor = "#4DBE8A";

    for (let i = 1; i < n; i++) {
        let x = arr[i];
        let tempBlock = blocks[i];

        blocks[i].style.backgroundColor = "#E94345"; //! Đỏ
        await pause(200);

        let l = 0;
        let r = i - 1;

        while (l <= r) {
            let m = Math.floor((l + r) / 2);

            //* Kiểm tra trước khi bật màu
            let wasGreen = isGreen(blocks[m]);
            //* Bật màu cho mid block
            blocks[m].style.backgroundColor = "#3E97CF"; // Blue
            await pause(350);

            if (arr[m] > x) {
                r = m - 1;
            } else {
                l = m + 1;
            }

            blocks[m].style.backgroundColor = (wasGreen) ? "#4DBE8A" : "#5C636A";
        }
        for (let j = i - 1; j >= l; j--) {
            arr[j + 1] = arr[j];
            blocks[j + 1] = blocks[j];

            moveBlock(blocks[j + 1], j + 1, 150); //! Vì blocks[j + 1] = blocks[j];
            await pause(100);
        }

        arr[l] = x;
        blocks[l] = tempBlock;

        moveBlock(tempBlock, l);
        await pause(750);

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
    binaryInsertionSort(numbersArray, blocks);
})
