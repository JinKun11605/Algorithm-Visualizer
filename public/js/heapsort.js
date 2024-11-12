import { pause } from "../helpers/swap-blocks.js";

const blocks = Array.from(document.querySelectorAll('.block'));
const numbersArray = blocks.map(block => parseInt(block.textContent));

const blockMargin = 20;
const blockWidth = blocks[0].offsetWidth;

// Hàm centerBlocks trả về startLeftPosition
const centerBlocks = (id_visualization, blocks, blockMargin, topPosition = null) => {
    const visualization = document.querySelector(`#${id_visualization}`);
    const visualizationWidth = visualization.offsetWidth;

    const emptySpace = visualizationWidth - blockWidth * blocks.length - blockMargin * (blocks.length - 1);
    const startLeftPosition = emptySpace / 2;

    blocks.forEach((block, index) => {
        const leftPosition = startLeftPosition + index * (blockWidth + blockMargin);

        block.style.left = `${leftPosition}px`;
        block.style.transform = 'translateX(0px)'; // Đặt transform ban đầu
        if (topPosition != null) {
            block.style.top = `${topPosition}px`;
        }
    });

    return startLeftPosition;
};

const startLeftPosition = centerBlocks("visualization", blocks, blockMargin);

// Hàm moveBlock sử dụng transform cho hiệu ứng mượt mà, sau đó cập nhật left
const moveBlock = (block, newIndex) => {
    const newLeft = startLeftPosition + newIndex * (blockWidth + blockMargin);

    const currentLeft = parseFloat(block.style.left) || 0;

    const delta = newLeft - currentLeft;

    // Sử dụng transform để tạo hiệu ứng chuyển động
    block.style.transition = 'transform 0.5s';
    block.style.transform = `translateX(${delta}px)`;

    // Sau khi chuyển động hoàn tất, cập nhật left và reset transform
    block.addEventListener('transitionend', function handler() {
        block.style.left = `${newLeft}px`;
        block.style.transform = 'none';
        block.style.transition = 'none';
        block.removeEventListener('transitionend', handler);
    });
};

// Hàm hoán đổi hai phần tử trong mảng và di chuyển các block tương ứng
const swap = async (arr, blocks, i, j) => {
    // Hoán đổi giá trị trong mảng
    [arr[i], arr[j]] = [arr[j], arr[i]];
    // Hoán đổi các block trong mảng blocks
    [blocks[i], blocks[j]] = [blocks[j], blocks[i]];

    // Di chuyển các block đến vị trí mới
    moveBlock(blocks[i], i);
    moveBlock(blocks[j], j);

    await pause(500);
};

const shift = async (arr, blocks, l, r) => {
    let i = l;
    let X = arr[i];
    let savedBlock = blocks[i];
    let j = 2 * i + 1;

    while (j <= r) {
        // Highlight các block đang so sánh
        blocks[i].style.backgroundColor = "#FFD700"; // Màu vàng
        blocks[j].style.backgroundColor = "#FFD700";
        await pause(500);

        if (j < r && arr[j] < arr[j + 1]) {
            j++;
        }

        if (arr[j] <= X) {
            blocks[i].style.backgroundColor = "#5C636A"; // Reset màu
            blocks[j].style.backgroundColor = "#5C636A";
            return;
        }

        arr[i] = arr[j];
        blocks[i] = blocks[j];

        // Di chuyển block lên vị trí của cha
        moveBlock(blocks[i], i);
        await pause(500);

        i = j;
        j = 2 * i + 1;
    }

    arr[i] = X;
    blocks[i] = savedBlock;

    // Di chuyển savedBlock đến vị trí i
    moveBlock(savedBlock, i);
    await pause(500);

    // Reset màu sắc
    blocks.forEach(block => block.style.backgroundColor = "#5C636A");
};

const createMaxHeap = async (arr, blocks, n) => {
    let l = Math.floor(n / 2) - 1;
    while (l >= 0) {
        await shift(arr, blocks, l, n - 1);
        l--;
    }
};

const heapSort = async (arr, blocks) => {
    const n = arr.length;
    await createMaxHeap(arr, blocks, n);
    let r = n - 1;

    while (r > 0) {
        // Hoán đổi phần tử đầu và cuối
        await swap(arr, blocks, 0, r);

        // Đánh dấu phần tử đã được sắp xếp
        blocks[r].style.backgroundColor = "#4DBE8A"; // Màu xanh lá cây
        await shift(arr, blocks, 0, r - 1);
        r--;
    }

    // Đánh dấu phần tử còn lại
    blocks[0].style.backgroundColor = "#4DBE8A"; // Màu xanh lá cây
};

// Nút "Bắt Đầu Sắp Xếp"
const sortButton = document.querySelector("#sort-button");
sortButton.addEventListener("click", () => {
    heapSort(numbersArray, blocks);
});
