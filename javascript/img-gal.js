const grid = document.querySelector('.masonry-grid');

imagesLoaded(grid, function () {
    new Masonry(grid, {
        itemSelector: '.me-pho',
        columnWidth: '.me-pho',
        percentPosition: true, // Đảm bảo tính toán theo phần trăm
        gutter: 10, // Khoảng cách giữa các phần tử
    });

    grid.classList.add('loaded');
});
