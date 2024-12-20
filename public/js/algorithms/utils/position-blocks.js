export const centerBlocks = (id_visualization, blocks, blockMargin, topPosition = null) => {
    const visualization = document.querySelector(`#${id_visualization}`);
    const visualizationWidth = visualization.offsetWidth;

    const blockWidth = blocks[0].offsetWidth; 
    const emptySpace = visualizationWidth - blockWidth * blocks.length - blockMargin * (blocks.length - 1) // Tính phần khoảng cách còn dư khi đặt các block
    const startLeftPosition = emptySpace / 2; //  Vị trí đặt block đầu tiên (chia 2: đều 2 phần)

    blocks.forEach((block, index) => {
        const leftPosition = startLeftPosition + index * (blockWidth + blockMargin);

        // block.style.transition = 'left 0.75s ease'; //! Dùng left khá là lag
        block.style.left = `${leftPosition}px`;

        if (topPosition != null) { //! Dùng ở MergeSort
            block.style.top = `${topPosition}px`;
        }
    });

    return startLeftPosition; //! Dùng ở BinaryInsertionSort
}