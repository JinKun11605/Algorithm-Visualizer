document.addEventListener('DOMContentLoaded', async function () {
    const sortButton = document.getElementById('sort-button');
    let blocks = Array.from(document.querySelectorAll('.block'));
    let numbersArray = blocks.map(block => parseInt(block.textContent));

    const visualization = document.getElementById('visualization');
    const visualizationWidth = visualization.offsetWidth;

    const blockWidth = 60; // Chiều rộng của mỗi khối
    const blockMargin = 20; // Khoảng cách giữa các khối

    const totalBlocksWidth = blocks.length * blockWidth + (blocks.length - 1) * blockMargin;
    const startPosition = (visualizationWidth - totalBlocksWidth) / 2;

    // Đặt vị trí ban đầu cho các khối để căn giữa
    blocks.forEach((block, index) => {
        const leftPosition = startPosition + index * (blockWidth + blockMargin);
        block.style.left = `${leftPosition}px`;
    });

    // Hàm sleep để tạm dừng
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // Hàm swap với hiệu ứng di chuyển
    async function swapBlocks(block1, block2) {
        // Lấy vị trí ban đầu của các khối
        const x1 = parseFloat(block1.style.left);
        const x2 = parseFloat(block2.style.left);

        // Tính toán khoảng cách giữa hai khối
        const distance = x2 - x1;

        // Di chuyển lên/xuống
        block1.style.transition = 'transform 0.5s';
        block2.style.transition = 'transform 0.5s';

        block1.style.transform = 'translateY(-100px)';
        block2.style.transform = 'translateY(100px)';

        await sleep(500);

        // Di chuyển ngang
        block1.style.transform = `translate(${distance}px, -100px)`;
        block2.style.transform = `translate(${-distance}px, 100px)`;

        await sleep(500);

        // Di chuyển xuống/lên
        block1.style.transform = `translate(${distance}px, 0)`;
        block2.style.transform = `translate(${-distance}px, 0)`;

        await sleep(500);

        // Cập nhật vị trí `left` của các khối
        block1.style.left = `${x2}px`;
        block2.style.left = `${x1}px`;

        // Reset transform và transition
        block1.style.transform = '';
        block2.style.transform = '';

        block1.style.transition = '';
        block2.style.transition = '';

        // Hoán đổi các khối trong DOM
        const parent = block1.parentNode;
        parent.insertBefore(block2, block1);

        // Cập nhật mảng blocks
        const index1 = blocks.indexOf(block1);
        const index2 = blocks.indexOf(block2);
        [blocks[index1], blocks[index2]] = [blocks[index2], blocks[index1]];
    }

    // Hàm Bubble Sort với async/await
    async function bubbleSort(arr) {
        const n = arr.length;
        for (let i = 0; i < n - 1; i++) {
            let swapped = false;
            for (let j = 0; j < n - i - 1; j++) {
                blocks[j].style.backgroundColor = 'red';
                blocks[j + 1].style.backgroundColor = 'red';

                await sleep(500);

                if (arr[j] > arr[j + 1]) {
                    // Đổi chỗ hai phần tử trong mảng
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

                    // Hoán đổi khối với hiệu ứng swap
                    await swapBlocks(blocks[j], blocks[j + 1]);

                    swapped = true;
                }

                blocks[j].style.backgroundColor = '#7FC5FC';
                blocks[j + 1].style.backgroundColor = '#7FC5FC';
            }
            blocks[n - i - 1].style.backgroundColor = 'green';

            if (!swapped) break; // Nếu không có hoán đổi nào, dừng thuật toán
        }
        // Đánh dấu các khối còn lại là đã sắp xếp
        for (let k = 0; k < n; k++) {
            blocks[k].style.backgroundColor = 'green';
        }
    }

    // Nút "Bắt Đầu Sắp Xếp"
    sortButton.addEventListener('click', function () {
        bubbleSort(numbersArray);
    });
});
