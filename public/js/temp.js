document.addEventListener('DOMContentLoaded', function () {
    const sortButton = document.getElementById('sort-button');
    const blocks = document.querySelectorAll('.block');
    let numbersArray = Array.from(blocks).map(block => parseInt(block.textContent));

    // Đặt vị trí ban đầu cho các khối để tránh bị đè lên nhau
    blocks.forEach((block, index) => {
        block.style.left = `${index * 80}px`; // Cách nhau 80px theo chiều ngang
    });

    // Hàm swap với hiệu ứng di chuyển lên/xuống 200px
    function swapBlocks(block1, block2) {
        return new Promise(resolve => {
            // Lấy vị trí ban đầu của các khối
            const block1Left = block1.offsetLeft;
            const block2Left = block2.offsetLeft;

            // Tính toán khoảng cách giữa hai khối
            const distance = block2Left - block1Left;

            // Bước 1: Di chuyển lên 200px cho block1 và xuống 200px cho block2
            block1.style.transform = `translateY(-200px)`;
            block2.style.transform = `translateY(200px)`;

            // Chờ animation di chuyển lên/xuống
            setTimeout(() => {
                // Bước 2: Di chuyển sang ngang
                block1.style.transform = `translate(${distance}px, -200px)`;
                block2.style.transform = `translate(${-distance}px, 200px)`;

                // Chờ 0.5 giây để hoàn thành di chuyển ngang
                setTimeout(() => {
                    // Bước 3: Di chuyển xuống lại vị trí mới
                    block1.style.transform = `translate(${distance}px, 0)`;
                    block2.style.transform = `translate(${-distance}px, 0)`;

                    // Chờ thêm 0.5 giây để hoàn thành di chuyển xuống
                    setTimeout(() => {
                        // Cập nhật vị trí thực tế của các khối
                        block1.style.left = `${block2Left}px`;
                        block2.style.left = `${block1Left}px`;

                        // Reset lại transform để trở về vị trí mới
                        block1.style.transform = '';
                        block2.style.transform = '';

                        // Hoán đổi nội dung của hai khối
                        [block1.textContent, block2.textContent] = [block2.textContent, block1.textContent];

                        // Hoán đổi vị trí trong mảng blocks
                        [blocks[Array.from(blocks).indexOf(block1)], blocks[Array.from(blocks).indexOf(block2)]] =
                            [blocks[Array.from(blocks).indexOf(block2)], blocks[Array.from(blocks).indexOf(block1)]];

                        resolve();
                    }, 500); // Chờ để hoàn thành di chuyển xuống
                }, 500); // Chờ để hoàn thành di chuyển ngang
            }, 500); // Chờ để hoàn thành di chuyển lên/xuống
        });
    }

    // Hàm Bubble Sort với hiệu ứng swap mới
    async function bubbleSort(arr) {
        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = 0; j < arr.length - i - 1; j++) {
                blocks[j].style.backgroundColor = 'red'; // Đánh dấu phần tử đang so sánh
                blocks[j + 1].style.backgroundColor = 'red';

                await new Promise(resolve => setTimeout(resolve, 500)); // Tạm dừng để dễ theo dõi

                if (arr[j] > arr[j + 1]) {
                    // Đổi chỗ hai phần tử trong mảng
                    let temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;

                    // Hoán đổi khối với hiệu ứng swap mới
                    await swapBlocks(blocks[j], blocks[j + 1]);
                }

                blocks[j].style.backgroundColor = '#7FC5FC'; // Đặt lại màu sau khi so sánh
                blocks[j + 1].style.backgroundColor = '#7FC5FC';
            }
            blocks[arr.length - i - 1].style.backgroundColor = 'green'; // Đánh dấu phần tử đã được sắp xếp
        }
        blocks[0].style.backgroundColor = 'green'; // Đánh dấu phần tử đầu tiên
    }

    // Thêm sự kiện click cho nút "Bắt Đầu Sắp Xếp"
    sortButton.addEventListener('click', function () {
        bubbleSort(numbersArray);
    });
});
