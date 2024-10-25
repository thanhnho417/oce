document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get('query');
    const resultsContainer = document.getElementById('results');
    const searchQueryContainer = document.querySelector('.search-query');

    if (!query) {
        resultsContainer.innerHTML = '<p>Có nhập gì đâu mà tìm</p>';
        return;
    }
    searchQueryContainer.textContent = `Thông tin được tìm kiếm với từ khóa: "${query}"`;

    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const filteredData = data.filter(item => 
                item.title.toLowerCase().includes(query.toLowerCase()) || 
                item.description.toLowerCase().includes(query.toLowerCase()) ||
                item.category.toLowerCase().includes(query.toLowerCase())
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
                        
                        const title = item.title.replace(new RegExp(query, 'gi'), match => `<span class="highlight">${match}</span>`);
                        const description = item.description.replace(new RegExp(query, 'gi'), match => `<span class="highlight">${match}</span>`);
                        const category = item.category.replace(new RegExp(query, 'gi'), match => `<span class="highlight">${match}</span>`);

                        resultItem.innerHTML = `
                            <a href="${item.src}">
                                <img src="${item.image}">
                                <h4>${item.title}</h4>
                                <p>${description}</p>
                                <p><strong>Category:</strong> ${category}</p>
                            </a>
                        `;
                        categoryContainer.appendChild(resultItem);
                    });

                    resultsContainer.appendChild(categoryContainer);
                }
            } else {
                resultsContainer.innerHTML = '<p>Không có dữ liệu</p>';
            }
        })
        .catch(error => console.error('Lỗi:', error));
});