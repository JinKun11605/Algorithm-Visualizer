import { centerBlocks } from "../../position-blocks.js";
import { pause, swapBlocks } from "../../swap-blocks.js";

const blocks = Array.from(document.querySelectorAll('.block'));
const numbersArray = blocks.map(block => parseInt(block.textContent));

// * Gọi hàm centerBlocks từ position-blocks.js
centerBlocks("visualization", blocks, 20);

const insertionSort = async (arr, blocks) => {
    const n = arr.length;

    for (let i = 1; i < n; i++) {
        blocks[0].style.backgroundColor = "#4DBE8A"; //* Bật màu cho block đầu tiên
        let index = i;

        blocks[index].style.backgroundColor = "#E94345";
        await pause(200);

        while (index > 0 && arr[index] < arr[index - 1]) {
            await pause(50);
            await swapBlocks(blocks[index - 1], blocks[index], 200);
            [arr[index], arr[index - 1]] = [arr[index - 1], arr[index]];
            
            blocks[index].style.backgroundColor = "#4DBE8A"; //! Swap xong thì block sau thì index => Đổi thành màu xanh

            index--;

            blocks[index].style.backgroundColor = "#E94345";
        }
        
        for (let t = 0; t <= i; t++){
            blocks[t].style.backgroundColor = "#4DBE8A";
        }
    }

    for (let k = 0; k < n; k++) {
        blocks[k].style.backgroundColor = '#4DBE8A';
    }
}

// Nút "Bắt Đầu Sắp Xếp"
const sortButton = document.querySelector("#sort-button");
sortButton.addEventListener('click', () => {
    insertionSort(numbersArray, blocks);
});