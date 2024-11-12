import { centerBlocks } from "../helpers/position-blocks.js";
import { pause, swapBlocks } from "../helpers/swap-blocks.js";

const blocks = Array.from(document.querySelectorAll('.block'));
const numbersArray = blocks.map(block => parseInt(block.textContent));

const blockWidth = blocks[0].offsetWidth;
const blockMargin = 20;

// * Gọi hàm centerBlocks từ position-blocks.js
const startLeftPosition = centerBlocks("visualization", blocks, blockMargin);

// Hàm di chuyển block đến vị trí mới
const moveBlockToIndex = (block, index) => {
    const newLeft = startLeftPosition + index * (blockWidth + blockMargin);
    block.style.transition = 'left 0.5s';
    block.style.left = `${newLeft}px`;
};


// Hàm shift tương đương với mã Java của bạn
const shift = async (arr, blocks, l, r) => {
    let i = l;
    let X = arr[i];
    let savedBlock = blocks[i];
    let j = 2 * i + 1;

    while (j <= r) {
        // Tô màu vàng cho nút cha hiện tại
        blocks[i].style.backgroundColor = "#FFD700"; // Vàng
        await pause(500);

        if (j < r && arr[j] < arr[j + 1]) {
            j++;
        }

        // Tô màu xanh cho nút con được chọn
        blocks[j].style.backgroundColor = "#3E97CF"; // Xanh
        await pause(500);

        if (arr[j] <= X) {
            // Reset màu
            blocks[i].style.backgroundColor = "#5C636A";
            blocks[j].style.backgroundColor = "#5C636A";
            break;
        }

        arr[i] = arr[j];
        blocks[i] = blocks[j];
        moveBlockToIndex(blocks[i], i);
        await pause(500);

        // Reset màu sắc
        blocks[i].style.backgroundColor = "#5C636A";
        blocks[j].style.backgroundColor = "#5C636A";

        i = j;
        j = 2 * i + 1;
    }

    arr[i] = X;
    blocks[i] = savedBlock;
    moveBlockToIndex(blocks[i], i);
    await pause(500);

    // Reset màu sắc
    blocks[i].style.backgroundColor = "#5C636A";
};


// Hàm tạo Max Heap
const createMaxHeap = async (arr, blocks, n) => {
    let l = Math.floor(n / 2) - 1;
    while (l >= 0) {
        await shift(arr, blocks, l, n - 1);
        l--;
    }
};

// Hàm Heap Sort
const heapSort = async (arr, blocks) => {
    const n = arr.length;
    await createMaxHeap(arr, blocks, n);
    let r = n - 1;

    while (r > 0) {
        // Hoán đổi phần tử đầu và cuối
        [arr[0], arr[r]] = [arr[r], arr[0]];

        // Hoán đổi các khối
        await swapBlocks(blocks[0], blocks[r]);
        [blocks[0], blocks[r]] = [blocks[r], blocks[0]];

        // Đánh dấu phần tử đã được sắp xếp
        blocks[r].style.backgroundColor = "#4DBE8A"; // Xanh lá cây

        r--;
        await shift(arr, blocks, 0, r);
    }

    // Đánh dấu phần tử còn lại
    blocks[0].style.backgroundColor = "#4DBE8A"; // Xanh lá cây
};


// Nút "Bắt Đầu Sắp Xếp"
const sortButton = document.querySelector("#sort-button");
sortButton.addEventListener("click", () => {
    heapSort(numbersArray, blocks);
});
