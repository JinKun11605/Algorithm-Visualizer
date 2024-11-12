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

const colorGroupBlocks = (blocks, gap, groupIndex, groupColor, otherColor) => {
    for (let i = 0; i < blocks.length; i++) {
        if (i % gap === groupIndex) {
            blocks[i].style.backgroundColor = groupColor; // Màu nhóm
        } else {
            blocks[i].style.backgroundColor = otherColor; // Màu khác
        }
    }
}

// Hàm kiểm tra xem nhóm đã được sắp xếp hay chưa
const isGroupSorted = (arr, gap, groupIndex) => {
    for (let i = groupIndex + gap; i < arr.length; i += gap) {
        if (arr[i - gap] > arr[i]) {
            return false;
        }
    }
    return true;
}

const shellSort = async (arr, blocks) => {
    const n = arr.length;
    let gap = Math.floor(n / 2);

    while (gap > 0) {
        for (let groupIndex = 0; groupIndex < gap; groupIndex++) {
            const groupColor = "#3E97CF";
            const otherColor = "#5C636A";

            colorGroupBlocks(blocks, gap, groupIndex, groupColor, otherColor);
            await pause(300);

            for (let i = groupIndex + gap; i < n; i += gap) {
                let x = arr[i];
                let tempBlock = blocks[i];
                let j = i;

                blocks[j].style.backgroundColor = "#E94345"; // Đỏ
                await pause(300);

                while (j >= gap && arr[j - gap] > x && (j - gap) % gap === groupIndex) {
                    arr[j] = arr[j - gap];
                    blocks[j] = blocks[j - gap];

                    moveBlock(blocks[j], j);
                    await pause(750);

                    // Đặt lại màu cho khối vừa di chuyển
                    blocks[j].style.backgroundColor = groupColor; // Màu nhóm

                    j -= gap;
                }
                arr[j] = x;
                blocks[j] = tempBlock;

                moveBlock(tempBlock, j);
                await pause(750);

                // Tắt màu
                blocks[j].style.backgroundColor = groupColor;
            }
            // Kiểm tra nếu nhóm đã được sắp xếp, đổi màu thành xanh lá cây
            if (isGroupSorted(arr, gap, groupIndex)) {
                for (let i = groupIndex; i < n; i += gap) {
                    blocks[i].style.backgroundColor = "#4DBE8A"; // Xanh lá cây
                }
            } else {
                // Nếu chưa sắp xếp xong, giữ màu xanh lam
                for (let i = groupIndex; i < n; i += gap) {
                    blocks[i].style.backgroundColor = groupColor; // Xanh lam
                }
            }
            await pause(300);
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
