import { pause } from "../helpers/swap-blocks.js";

const blocks = Array.from(document.querySelectorAll('.block'));
const numbersArray = blocks.map(block => parseInt(block.textContent));

const topPosition = 50;

const centerBlocks = (id_visualization, blocks, blockMargin) => {
    const visualization = document.querySelector(`#${id_visualization}`);
    const visualizationWidth = visualization.offsetWidth;

    const blockWidth = blocks[0].offsetWidth; 
    const emptySpace = visualizationWidth - blockWidth * blocks.length - blockMargin * (blocks.length - 1);
    const startLeftPosition = emptySpace / 2;

    blocks.forEach((block, index) => {
        const leftPosition = startLeftPosition + index * (blockWidth + blockMargin);

        block.style.left = `${leftPosition}px`;
        block.style.top = `${topPosition}px`;
    });
};

centerBlocks("visualization", blocks, 20);

// Hàm di chuyển xuống theo cấp đệ quy
const setTopDown = (blocks, depth) => {
    blocks.forEach(block => {
        const currentTop = parseInt(block.style.top.replace('px', '')); // Lấy giá trị top hiện tại
        const newTop = currentTop + 50; // Di chuyển thêm 50px
        block.style.transition = `top 0.5s ease`;
        block.style.top = `${newTop}px`;
    });
};

// Hàm di chuyển lên theo cấp đệ quy
const setTopUp = (blocks, depth) => {
    blocks.forEach(block => {
        const currentTop = parseInt(block.style.top.replace('px', '')); // Lấy giá trị top hiện tại
        const newTop = currentTop - 50; // Quay lại 50px
        block.style.transition = `top 0.5s ease`;
        block.style.top = `${newTop}px`;
    });
};

const merge = async (arr, blocks, l, m, r) => {
    const n1 = m - l + 1;
    const n2 = r - m;
    const leftArr = arr.slice(l, m + 1);
    const rightArr = arr.slice(m + 1, r + 1);

    const leftBlocks = blocks.slice(l, m + 1);
    const rightBlocks = blocks.slice(m + 1, r + 1);

    let i = 0, j = 0, k = l;

    await pause(1000); // Chờ để đảm bảo hiệu ứng trước đó hoàn thành

    // Bắt đầu merge hai mảng
    while (i < n1 && j < n2) {
        if (leftArr[i] <= rightArr[j]) {
            arr[k] = leftArr[i];
            blocks[k].textContent = leftArr[i]; // Cập nhật giá trị hiển thị trên block
            i++;
        } else {
            arr[k] = rightArr[j];
            blocks[k].textContent = rightArr[j]; // Cập nhật giá trị hiển thị trên block
            j++;
        }
        k++;
    }

    while (i < n1) {
        arr[k] = leftArr[i];
        blocks[k].textContent = leftArr[i];
        i++;
        k++;
    }

    while (j < n2) {
        arr[k] = rightArr[j];
        blocks[k].textContent = rightArr[j];
        j++;
        k++;
    }

    await pause(500); // Chờ để hiển thị kết quả
};

const mergeSort = async (arr, blocks, l, r, depth = 0) => {
    if (l < r) {
        const m = Math.floor((l + r) / 2);

        const leftBlocks = blocks.slice(l, m + 1);
        const rightBlocks = blocks.slice(m + 1, r + 1);

        // Di chuyển xuống khi vào cấp đệ quy
        setTopDown(leftBlocks, depth + 1);
        setTopDown(rightBlocks, depth + 1);

        await pause(500); // Chờ để hiển thị di chuyển xuống

        // Đệ quy xử lý nửa trái
        await mergeSort(arr, blocks, l, m, depth + 1);
        // Đệ quy xử lý nửa phải
        await mergeSort(arr, blocks, m + 1, r, depth + 1);

        // Merge hai nửa
        await merge(arr, blocks, l, m, r);

        // Di chuyển lên khi hoàn thành cấp
        setTopUp(leftBlocks, depth + 1);
        setTopUp(rightBlocks, depth + 1);

        await pause(500); // Chờ để hiển thị di chuyển lên
    }
};

// Nút "Bắt Đầu Sắp Xếp"
const sortButton = document.querySelector("#sort-button");
sortButton.addEventListener('click', async () => {
    await mergeSort(numbersArray, blocks, 0, numbersArray.length - 1);
});
