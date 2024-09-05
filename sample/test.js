// Khởi tạo player Video.js
var player = videojs('my-video');

// Bước 1: Đọc file JSON
fetch('videos.json')
    .then(response => response.json()) // Chuyển đổi phản hồi thành JSON
    .then(data => {
        // Bước 2: Lấy đối tượng video đầu tiên trong file JSON
        const video = data.videos[0];

        // Bước 3: Thay đổi src và type của video
        player.src({ src: video.src, type: video.type });

        // Bước 4: Phát video
        player.play();
    })
    .catch(error => console.error('Error:', error));
