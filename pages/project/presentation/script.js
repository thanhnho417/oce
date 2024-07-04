async function loadTableData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();

        let tableBody = document.querySelector('#dataTable tbody');
        tableBody.innerHTML = '';

        data.forEach((item, index) => {
            let row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td>${item.info}</td>
                <td>${item.type}</td>
                <td>
                    <a href="${item.downloadlink}" target="_blank"><img src="${item.download}" alt="Download"></a>
                    <a href="${item.accesslink}" target="_blank"><img src="${item.access}" alt="Access"></a>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error loading JSON data:', error);
    }
}

// Load data when the page loads
window.onload = loadTableData;