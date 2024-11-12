import { centerBlocks } from "../helpers/position-blocks.js";
import { pause } from "../helpers/swap-blocks.js";

const blocks = Array.from(document.querySelectorAll('.block'));
const numbersArray = blocks.map(block => parseInt(block.textContent));
const blockWidth = blocks[0].offsetWidth;
const blockMargin = 20;

// * Gọi hàm centerBlocks từ position-blocks.js
const startLeftPosition = centerBlocks("visualization", blocks, blockMargin);

const moveBlock = (block, newIndex) => {
    const newLeft = startLeftPosition + newIndex * (blockWidth + blockMargin);

    block.style.transition = 'left 0.75s ease';
    block.style.left = `${newLeft}px`;
}

const shellSort = async (arr, blocks) => {
    const n = arr.length;
    let gap = Math.floor(n / 2);

    while (gap > 0) {
        for (let i = gap; i < n; i++) {
            let x = arr[i];
            let tempBlock = blocks[i];
            let j = i - gap;

            blocks[i].style.backgroundColor = "#E94345"; //! Đỏ
            blocks[j].style.backgroundColor = "#3E97CF";
            await pause(500);

            while (j >= 0 && x < arr[j]) {
                arr[j + gap] = arr[j];
                blocks[j + gap] = blocks[j];

                moveBlock(blocks[j + gap], j + gap);
                await pause(750);

                j -= gap;
            }
            arr[j + gap] = x;
            blocks[j + gap] = tempBlock;

            moveBlock(tempBlock, j + gap);
            await pause(750);

            blocks.forEach(block => block.style.backgroundColor = "#5C636A");
        }

        gap = Math.floor(gap / 2);
    }
    for (let k = 0; k < n; k++) {
        blocks[k].style.backgroundColor = "#4DBE8A";
    }
}

// Nút "Bắt Đầu Sắp xếp"
const sortButton = document.querySelector("#sort-button");
sortButton.addEventListener("click", () => {
    shellSort(numbersArray, blocks);
})
