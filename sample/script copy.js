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
            downloadLink.download = '';
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

const msalConfig = {
    auth: {
        clientId: '1f2cf642-c78b-456b-a33b-ceaebd060d53', // Client ID của bạn
        authority: 'https://login.microsoftonline.com/e252973a-cf1c-4739-8a64-6ab7df045012', // Tenant ID của bạn
        redirectUri: window.location.href // Chuyển hướng về trang hiện tại sau khi đăng nhập
    },
    cache: {
        cacheLocation: 'localStorage', // Lưu token trong localStorage
        storeAuthStateInCookie: true // Lưu trạng thái xác thực vào cookie
    }
};

const msalInstance = new msal.PublicClientApplication(msalConfig);

const loginButton = document.getElementById('login-button');

// Hàm xử lý đăng nhập
loginButton.addEventListener('click', function() {
    const email = document.getElementById('email').value; // Lấy email từ input
    
    if (email) {
        // Đăng nhập qua Microsoft với email người dùng
        msalInstance.loginRedirect({
            loginHint: email, // Gợi ý email vào form đăng nhập Microsoft
            scopes: ["user.read"]
        });
    } else {
        alert("Vui lòng nhập email để đăng nhập");
    }
});

// Kiểm tra trạng thái đăng nhập
msalInstance.handleRedirectPromise().then(response => {
    if (response && response.account) {
        // Người dùng đã đăng nhập
        localStorage.setItem('msalToken', response.accessToken);
        displayUserInfo(response.account);
    } else {
        const token = localStorage.getItem('msalToken');
        if (token) {
            getUserData(token);
        }
    }
}).catch(error => {
    console.error('Error handling redirect:', error);
});

// Hiển thị thông tin người dùng
function displayUserInfo(account) {
    document.getElementById('user-info').innerHTML = `
        <h2>Welcome, ${account.name}</h2>
        <p>Email: ${account.username}</p>
    `;
}

// Gọi Microsoft Graph API để lấy thông tin người dùng
function getUserData(token) {
    fetch('https://graph.microsoft.com/v1.0/me', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response => response.json())
      .then(data => {
          document.getElementById('user-info').innerHTML = `
              <h2>Welcome, ${data.displayName}</h2>
              <p>Email: ${data.mail || data.userPrincipalName}</p>
          `;
      }).catch(error => {
          console.error('Error fetching user data:', error);
      });
}