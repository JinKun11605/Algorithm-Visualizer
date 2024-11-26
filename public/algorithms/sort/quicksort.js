import { centerBlocks } from "../../position-blocks.js";
import { pause, swapBlocks } from "../../swap-blocks.js";

const blocks = Array.from(document.querySelectorAll(".block"));
const numbersArray = blocks.map(block => parseInt(block.textContent));

// * Gọi hàm centerBlocks từ position-blocks.js
centerBlocks("visualization", blocks, 20);

const quickSort = async (arr, left, right) => {
    if (left >= right){
        if (left === right) {
            blocks[left].style.backgroundColor = "#4DBE8A"; //*
        }
        return;
    }

    let i = left, j = right;
    // Tô màu cho mảng con hiện tại
    for (let k = left; k <= right; k++) {
        blocks[k].style.backgroundColor = "#3E97CF"; //?
    }
    await pause(500);
    

    const pivotIndex = Math.floor((left + right) / 2);
    const pivot = arr[pivotIndex];

    // Bật màu pivot
    blocks[pivotIndex].style.backgroundColor = "#E94345"; //!
    await pause(500);

    while (i <= j) {
        // Bật màu phần tử đang xét từ trái
        while (arr[i] < pivot) {
            await pause(500);
            blocks[i].style.backgroundColor = "#5C636A";

            i++;
        }
        
        while (arr[j] > pivot) {
            await pause(500);
            blocks[j].style.backgroundColor = "#5C636A";

            j--;
        }

        if (i <= j) {
            await pause(500);
            if (i !== j && arr[i] !== arr[j]) {
                await swapBlocks(blocks[i], blocks[j], 500);
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
            blocks[i].style.backgroundColor = "#5C636A";
            blocks[j].style.backgroundColor = "#5C636A";

            i++;
            j--;
        }
    }
    
    // Tắt màu pivot sau khi phân tách xong
    blocks[pivotIndex].style.backgroundColor = "#5C636A";

    // Đệ quy sắp xếp các mảng con
    if (left < j) {
        await quickSort(arr, left, j);
    }
    if (i < right) {
        await quickSort(arr, i, right);
    }

    // Đánh dấu các phần tử đã được sắp xếp
    for (let k = 0; k <= right; k++) { //! Đúng ra là left => Để từ đầu để fix lỗi thiểu block
        blocks[k].style.backgroundColor = "#4DBE8A";
    }
}

// Nút "Bắt Đầu Sắp Xếp"
const sortButton = document.querySelector("#sort-button");
sortButton.addEventListener("click", () => {
    quickSort(numbersArray, 0, numbersArray.length - 1);
})
