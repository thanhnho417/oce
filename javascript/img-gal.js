const grid = document.querySelector('.masonry-grid');

imagesLoaded(grid, function () {
    new Masonry(grid, {
        itemSelector: '.me-pho',
        columnWidth: '.me-pho',
        percentPosition: true,
        gutter: 10,
    });

    grid.classList.add('loaded');
});