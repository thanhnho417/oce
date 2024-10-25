document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get('query').toLowerCase();
    const resultsContainer = document.getElementById('results');
    const searchQueryContainer = document.querySelector('.search-query');

    // Hiển thị từ khóa tìm kiếm đã nhập trước đó
    searchQueryContainer.textContent = `Kết quả tìm kiếm cho: "${params.get('query')}"`;

    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const filteredData = data.filter(item => 
                item.title.toLowerCase().includes(query) || 
                item.description.toLowerCase().includes(query)
            );

            if (filteredData.length > 0) {
                const categories = {};

                filteredData.forEach(item => {
                    if (!categories[item.category]) {
                        categories[item.category] = [];
                    }
                    categories[item.category].push(item);
                });

                for (const [category, items] of Object.entries(categories)) {
                    const categoryContainer = document.createElement('div');
                    categoryContainer.className = 'category-container';

                    const categoryTitle = document.createElement('div');
                    categoryTitle.className = 'category-title';
                    categoryTitle.textContent = category;
                    categoryContainer.appendChild(categoryTitle);

                    items.forEach(item => {
                        const resultItem = document.createElement('div');
                        resultItem.className = 'result-item';
                        resultItem.innerHTML = `
                            <img src="${item.image}" alt="${item.title}">
                            <div>
                                <h3>${item.title}</h3>
                                <p>${item.description}</p>
                            </div>
                        `;
                        categoryContainer.appendChild(resultItem);
                    });

                    resultsContainer.appendChild(categoryContainer);
                }
            } else {
                resultsContainer.innerHTML = '<p>Ko có j đâu</p>';
            }
        })
        .catch(error => console.error('Error loading data:', error));
});
