import { centerBlocks } from "../helpers/position-blocks.js";
import { pause, swapBlocks } from "../helpers/swap-blocks.js";

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
const shift = async (arr, blocks, l, r) => {
    let i = l;
    let X = arr[i];
    let tempBlock = blocks[i];
    let j = 2 * i + 1;

    while (j <= r) {
        // Bật màu đỏ cho nút cha
        blocks[i].style.backgroundColor = "#E94345"; // Đỏ

        if (j < r && arr[j] < arr[j + 1]) {
            j++;
        }

        // Bật màu đỏ cho nút con
        blocks[j].style.backgroundColor = "#3E97CF"; // Xanh
        if (j + 1 <= r) {
            blocks[j + 1].style.backgroundColor = "#3E97CF"; // Xanh
        }
        await pause(500);

        if (arr[j] <= X) {
            blocks[i].style.backgroundColor = "#5C636A"; // Tắt màu nút cha
            blocks[j].style.backgroundColor = "#5C636A"; // Tắt màu nút con
            if (j + 1 <= r) {
                blocks[j + 1].style.backgroundColor = "#5C636A"; // Tắt màu nút con
            }
            return;
        }

        // Sắp lại cho đúng
        arr[i] = arr[j];
        blocks[i] = blocks[j];

        moveBlock(blocks[i], i, 500);
        await pause(500);

        // Tắt màu sắc nút cha
        blocks[i].style.backgroundColor = "#5C636A";
        if (j + 1 <= r) {
            blocks[j + 1].style.backgroundColor = "#5C636A";
        }

        i = j;
        j = 2 * i + 1;

        // Sắp lại cho đúng
        arr[i] = X;
        blocks[i] = tempBlock;
        moveBlock(blocks[i], i, 500);
        await pause(500);

        blocks[i].style.backgroundColor = "#5C636A";
    }
}



// Hàm tạo Max Heap
const createMaxHeap = async (arr, blocks, n) => {
    let l = Math.floor(n / 2) - 1;
    while (l >= 0) {
        await shift(arr, blocks, l, n - 1);
        l--;
    }
}

const heapSort = async (arr, blocks) => {
    const n = arr.length;
    await createMaxHeap(arr, blocks, n);
    let r = n - 1;

    while (r > 0) {
        [arr[0], arr[r]] = [arr[r], arr[0]];
        await swapBlocks(blocks[0], blocks[r], 500);

        blocks[r].style.backgroundColor = "#4DBE8A";

        r--;
        await shift(arr, blocks, 0, r);
    }

    blocks[0].style.backgroundColor = "#4DBE8A";
};


// Nút "Bắt Đầu Sắp Xếp"
const sortButton = document.querySelector("#sort-button");
sortButton.addEventListener("click", () => {
    heapSort(numbersArray, blocks);
});
