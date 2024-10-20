document.addEventListener('DOMContentLoaded', function () {
    const sortButton = document.getElementById('sortButton');
    const blocks = document.querySelectorAll('.block'); // Lấy tất cả các khối từ Pug
    let numbersArray = Array.from(blocks).map(block => parseInt(block.textContent)); // Lấy mảng số từ nội dung của các khối

    // Hàm cập nhật trực quan các khối sau khi sắp xếp
    function visualizeArray(arr) {
        blocks.forEach((block, index) => {
            block.textContent = arr[index]; // Cập nhật giá trị hiển thị của các khối
        });
    }

    // Hàm Bubble Sort với hiệu ứng trực quan
    async function bubbleSort(arr) {
        for (let i = 0; i < arr.length - 1; i++) {
            for (let j = 0; j < arr.length - i - 1; j++) {
                blocks[j].style.backgroundColor = 'red'; // Đánh dấu phần tử đang so sánh
                blocks[j + 1].style.backgroundColor = 'red';

                await new Promise(resolve => setTimeout(resolve, 500)); // Tạm dừng 0.5 giây để dễ theo dõi

                if (arr[j] > arr[j + 1]) {
                    // Đổi chỗ hai phần tử
                    let temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;

                    // Cập nhật trực quan sau khi đổi chỗ
                    visualizeArray(arr);
                    await new Promise(resolve => setTimeout(resolve, 1000)); // Tạm dừng để hiển thị thay đổi
                }

                // Đặt lại màu sau khi so sánh
                blocks[j].style.backgroundColor = 'blue';
                blocks[j + 1].style.backgroundColor = 'blue';
            }
            // Đánh dấu phần tử đã được sắp xếp đúng vị trí bằng màu xanh lá cây
            blocks[arr.length - i - 1].style.backgroundColor = 'green';
        }
        // Đánh dấu phần tử đầu tiên sau khi tất cả các phần tử khác đã được sắp xếp
        blocks[0].style.backgroundColor = 'green';
    }

    // Thêm sự kiện click cho nút "Bắt Đầu Sắp Xếp"
    sortButton.addEventListener('click', function () {
        bubbleSort(numbersArray);
    });
});
