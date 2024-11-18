import { centerBlocks } from "../helpers/position-blocks.js";
import { pause, swapBlocks } from "../helpers/swap-blocks.js";

const blocks = Array.from(document.querySelectorAll(".block"));
const numbersArray = blocks.map(block => parseInt(block.textContent));

// * Gọi hàm centerBlocks từ position-blocks.js
centerBlocks("visualization", blocks, 20);

const interchangeSort = async (arr) => {
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        for (let j = i + 1; j < n; j++) {
            // Bật màu 2 block đang so sánh
            blocks[i].style.backgroundColor = "#3E97CF";
            blocks[j].style.backgroundColor = "#3E97CF";
            await pause(100);

            if (arr[i] > arr[j]) {
                // Đổi chỗ hai phần tử trong mảng
                [arr[i], arr[j]] = [arr[j], arr[i]];
                await swapBlocks(blocks[i], blocks[j], 200);
            }
            blocks[i].style.backgroundColor = "#5C636A";
            blocks[j].style.backgroundColor = "#5C636A";
        }
        blocks[i].style.backgroundColor = "#4DBE8A";
    }
    blocks[n - 1].style.backgroundColor = "#4DBE8A"; // Bật màu cho block cuối cùng
}

// Nút "Bắt Đầu Sắp Xếp"
const sortButton = document.querySelector("#sort-button");
sortButton.addEventListener("click", () => {
    interchangeSort(numbersArray);
})