async function loadTableData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();

        let tableBody = document.querySelector('#dataTable tbody');
        tableBody.innerHTML = ''; // Xóa nội dung trước đó

        data.forEach((item, index) => {
            let row = document.createElement('tr');
            
            // Tạo các thẻ td
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td>${item.info}</td>
                <td>${item.type}</td>
            `;
            let actionCell = document.createElement('td');

            // Tạo thẻ a cho download
            let downloadLink = document.createElement('a');
            downloadLink.href = item.downloadlink;
            downloadLink.target = '_blank';
            downloadLink.classList.add('download-class'); // Thêm class
            let downloadImg = document.createElement('img');
            downloadImg.src = item.download;
            downloadImg.alt = 'Download';
            downloadLink.appendChild(downloadImg);

            // Tạo thẻ a cho access
            let accessLink = document.createElement('a');
            accessLink.href = item.accesslink;
            accessLink.classList.add('load-link'); // Thêm class
            let accessImg = document.createElement('img');
            accessImg.src = item.access;
            accessImg.alt = 'Access';
            accessLink.appendChild(accessImg);

            // Thêm cả hai thẻ a vào td
            actionCell.appendChild(downloadLink);
            actionCell.appendChild(accessLink);

            // Thêm td vào row
            row.appendChild(actionCell);

            // Thêm row vào tbody
            tableBody.appendChild(row);
        });

        // Thêm sự kiện click cho tất cả các link mới được tạo
        document.querySelectorAll('.load-link').forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault(); // Ngăn chặn việc mở link trực tiếp

                // Hiển thị popup với hiệu ứng
                const popup = document.querySelector('.pop-up');
                popup.classList.add('show');

                // Delay để áp dụng hiển thị sau khi thêm class
                setTimeout(() => {
                    popup.style.visibility = 'visible'; // Hiển thị popup bằng visibility
                    popup.style.opacity = '1'; // Hiệu ứng fade-in
                }, 10);

                // Lấy href của thẻ a và đưa đường dẫn vào thẻ div có class content-title
                const href = this.getAttribute('href');
                const contentTitleDiv = document.querySelector('.content-title');
                contentTitleDiv.innerHTML = href; // Đưa đường dẫn vào thẻ div dưới dạng văn bản
            });
        });

    } catch (error) {
        console.error('Error loading JSON data:', error);
    }
}

// Load data when the page loads
window.onload = loadTableData;

// Sự kiện click cho nút đóng pop-up
document.getElementById('pop-up-close').addEventListener('click', function() {
    const popup = document.querySelector('.pop-up');
    popup.classList.remove('show');

    // Ẩn popup với hiệu ứng
    setTimeout(() => {
        popup.style.opacity = '0'; // Hiệu ứng fade-out
        popup.style.visibility = 'hidden'; // Ẩn popup sau khi fade-out hoàn thành
    }, 500); // Thời gian delay để hoàn thành hiệu ứng
});
