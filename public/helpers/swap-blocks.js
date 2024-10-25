export const pause = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const swapBlocks = async (block1, block2) => {
    //  ! Trục Oy ngược với thông thường
    const x1 = parseInt(block1.style.left);
    const x2 = parseInt(block2.style.left);
    const distance = x2 - x1; // Tính khoảng cách theo chiều ngang giữa 2 block

    // transition
    block1.style.transition = `transform 1s ease`
    block2.style.transition = `transform 1s ease`

    // !. Vị trí của mỗi block luôn cố định theo left/top. => Translate theo vị trí cố định đó, khi đó animation từ translate cũ => mới.

    // * Phase 1. block1 đi lên, block2 đi xuống.
    block1.style.transform = `translateY(-150px)`
    block2.style.transform = `translateY(150px)`

    await pause(1000);

    // * Phase 2. Đổi chổ theo trục Ox.
    block1.style.transform = `translate(${distance}px, -150px)`
    block2.style.transform = `translate(${-distance}px, 150px)`

    await pause(1000);

    // * Phase 3. block1 đi xuống, block2 đi lên.
    block1.style.transform = `translateX(${distance}px)`
    block2.style.transform = `translateX(${-distance}px)`

    await pause(1000);

    // * Đặt lại transform và transition
    block1.style.transform = '';
    block2.style.transform = '';
    block1.style.transition = '';
    block2.style.transition = '';

    // * Cập nhật lại vị trí cố định theo left/top để thực hiện translate cho các lần sau.
    block1.style.left = `${x2}`;
    block2.style.left = `${x1}`;

    // * Đổi giá trị trong 2 block
    const temp = block1.textContent;
    block1.textContent = block2.textContent;
    block2.textContent = temp;
}