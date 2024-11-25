import { centerBlocks } from "../../position-blocks.js";
import { pause } from "../../swap-blocks.js";

const blocks = Array.from(document.querySelectorAll(".block"));
const numbersArray = blocks.map(block => parseInt(block.textContent));
const numberFind = parseInt(document.querySelector(".blockFind").textContent)

const blockWidth = blocks[0].offsetWidth;
const blockMargin = 20;

// * Gọi hàm centerBlocks từ position-blocks.js
centerBlocks("visualization", blocks, blockMargin);

const binarySearch = async (numbersArray, blocks, numberFind) => {
    const n = numbersArray.length;

    let left = 0;
    let right = n - 1;

    while (left <= right) {
        // Tô đỏ cho các số người ngoài khoảng tìm kiếm
        for (let i = 0; i < n; i++) {
            if (i < left || i > right){
                blocks[i].style.backgroundColor = "#E94345"; //!
            }
        }
        await pause(500);

        let mid = Math.floor((left + right) / 2);
        blocks[mid].style.backgroundColor = "#3E97CF"; //?
        await pause(500);

        if (numbersArray[mid] === numberFind) {
            blocks[mid].style.backgroundColor = "#4DBE8A"; //*
            document.querySelector(".blockFind").style.backgroundColor = "#4DBE8A"; //*

            return;
        } else if (numbersArray[mid] < numberFind) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }

        blocks[mid].style.backgroundColor = "#E94345";
    }

    document.querySelector(".blockFind").style.backgroundColor = "#E94345"; //!
};

// Nút "Bắt Đầu Tìm Kiếm"
const searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", () => {
    binarySearch(numbersArray, blocks, numberFind);
});
