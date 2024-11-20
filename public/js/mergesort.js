import { centerBlocks } from "/helpers/position-blocks.js";
import { pause } from "helpers/swap-blocks.js";

const blocks = Array.from(document.querySelectorAll('.block'));
const numbersArray = blocks.map(block => parseInt(block.textContent));

// * Gọi hàm centerBlocks từ position-blocks.js
centerBlocks("visualization", blocks, 20, 40);

const setColor = async (blocks, color) => {
    blocks.forEach(block => {
        block.style.backgroundColor = color;
    });
}

const merge = async (arr, blocks, l, m, r) => {
    const n1 = m - l + 1;
    const n2 = r - m;
    const leftArr = arr.slice(l, m + 1);
    const rightArr = arr.slice(m + 1, r + 1);
    const leftBlocks = blocks.slice(l, m + 1);
    const rightBlocks = blocks.slice(m + 1, r + 1);
    //* Đổi màu
    await setColor(leftBlocks, '#3E97CF'); //?
    await setColor(rightBlocks, '#E94345'); //!

    let i = 0, j = 0, k = l;

    while (i < n1 && j < n2) {
        if (leftArr[i] <= rightArr[j]) {
            arr[k] = leftArr[i];
            blocks[k].textContent = leftArr[i];
            await pause(250); // Chờ 250ms đổi giá trị
            i++;
        } else {
            arr[k] = rightArr[j];
            blocks[k].textContent = rightArr[j];
            await pause(250); // Chờ 250ms đổi giá trị
            j++;
        }
        k++;
    }

    while (i < n1) {
        arr[k] = leftArr[i];
        blocks[k].textContent = leftArr[i];
        await pause(250); // Chờ 250ms đổi giá trị
        i++;
        k++;
    }

    while (j < n2) {
        arr[k] = rightArr[j];
        blocks[k].textContent = rightArr[j];
        await pause(250); // Chờ 250ms đổi giá trị
        j++;
        k++;
    }
    
    const mergedBlocks = blocks.slice(l, r + 1);
    await setColor(mergedBlocks, '#4DBE8A');
};

const setTopDown = (blocks) => {
    blocks.forEach(block => {
        const currentTop = parseInt(block.style.top);
        const newTop = currentTop + 60;
        block.style.transition = `0.75s ease`;
        block.style.top = `${newTop}px`;
    });
}

const setTopUp = (blocks) => {
    blocks.forEach(block => {
        const currentTop = parseInt(block.style.top);
        const newTop = currentTop - 60;
        block.style.transition = `top 0.75s ease`;
        block.style.top = `${newTop}px`;
    });
}

const mergeSort = async (arr, blocks, l, r) => {
    if (l < r) {
        const m = Math.floor((l + r) / 2);

        const leftBlocks = blocks.slice(l, m + 1);
        const rightBlocks = blocks.slice(m + 1, r + 1);
        //* Đổi màu
        await setColor(leftBlocks, '#3E97CF');
        await setColor(rightBlocks, '#E94345');

        setTopDown(leftBlocks);
        setTopDown(rightBlocks);
        await pause(750);

        await mergeSort(arr, blocks, l, m);
        await mergeSort(arr, blocks, m + 1, r);
        await merge(arr, blocks, l, m, r);

        setTopUp(leftBlocks);
        setTopUp(rightBlocks);
        await pause(750);
    }
};

// Nút "Bắt Đầu Sắp Xếp"
const sortButton = document.querySelector("#sort-button");
sortButton.addEventListener('click', async () => {
    await mergeSort(numbersArray, blocks, 0, numbersArray.length - 1);
});
