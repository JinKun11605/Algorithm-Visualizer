import { pause, swapBlocks } from "../helpers/swap-blocks.js";

const blocks = Array.from(document.querySelectorAll('.block'));
const numbersArray = blocks.map(block => parseInt(block.textContent));

const topPosition = 70;

const centerBlocks = (id_visualization, blocks, blockMargin) => {
    const visualization = document.querySelector(`#${id_visualization}`);
    const visualizationWidth = visualization.offsetWidth;

    const blockWidth = blocks[0].offsetWidth; 
    const emptySpace = visualizationWidth - blockWidth * blocks.length - blockMargin * (blocks.length - 1) // Tính phần khoảng cách còn dư khi đặt các block
    const startLeftPosition = emptySpace / 2; //  Vị trí đặt block đầu tiên (chia 2: đều 2 phần)

    blocks.forEach((block, index) => {
        const leftPosition = startLeftPosition + index * (blockWidth + blockMargin);

        block.style.left = `${leftPosition}px`
        block.style.top = `${topPosition}px`
    });
}

centerBlocks("visualization", blocks, 20);

const merge = (arr, l, m, r) =>{
    const n1 = m - l + 1;
    const n2 = r - m;
    const leftArr = arr.slice(l, m + 1);
    const rightArr = arr.slice(m, r + 1);

    let i = 0, j = 0, k = l;

    while (i < n1 && j < n2) {
        if (leftArr[i] <= rightArr[j]) {
            arr[k] = leftArr[i];
            i++;
        } else {
            arr[k] = rightArr[j];
            j++;
        }
        k++;
    }


    while (i < n1) {
        arr[k] = leftArr[i];
        i++;
        k++;
    }

    while (j < n2) {
        arr[k] = rightArr[j];
        j++;
        k++;
    }
}

const mergeSort = (arr, l, r) => {
    if (l < r) {
        const m = Math.floor((l + r) / 2);

        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);

        merge(arr, l, m, r);
    }
}

// Nút "Bắt Đầu Sắp Xếp"
const sortButton = document.querySelector("#sort-button");
sortButton.addEventListener('click', () => {
    mergeSort(numbersArray, 0, numbersArray.length - 1);
});
