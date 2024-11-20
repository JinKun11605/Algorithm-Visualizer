import { centerBlocks } from "../../helpers/position-blocks.js";
import { pause } from "../../helpers/swap-blocks.js";

const blocks = Array.from(document.querySelectorAll(".block"));
const numbersArray = blocks.map(block => parseInt(block.textContent));
const numberFind = parseInt(document.querySelector(".blockFind").textContent)

const blockWidth = blocks[0].offsetWidth;
const blockMargin = 20;

// * Gọi hàm centerBlocks từ position-blocks.js
centerBlocks("visualization", blocks, blockMargin);


const linearSearch = async (numbersArray, blocks, numberFind) => {
    const n = numbersArray.length;

    for (let i = 0; i < n; i++) {
        blocks[i].style.backgroundColor = "#3E97CF"; //?
        await pause(500);

        if (numbersArray[i] == numberFind) {
            blocks[i].style.backgroundColor = "#4DBE8A"; //*
            document.querySelector(".blockFind").style.backgroundColor = "#4DBE8A"; //*

            return;
        } else {
            blocks[i].style.backgroundColor = "#E94345"; //!
            await pause(500);
        }
    }

    document.querySelector(".blockFind").style.backgroundColor = "#E94345"; //!
}

// Nút "Bắt Đầu Tìm Kiếm"
const searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", () => {
    linearSearch(numbersArray, blocks, numberFind);
})
