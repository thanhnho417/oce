document.addEventListener('DOMContentLoaded', () => {
    const player = new Plyr('#player', { captions: { active: true} });
    const video = document.querySelector('#player');
    const titleElement = document.getElementById('title');
    const descriptionElement = document.getElementById('description');
    const vidplaylist = document.querySelector('.playlist');
    let hls;

    fetch('videos.json')
        .then(response => response.json())
        .then(data => {
            data.forEach((viddata, index) => {
                const vidplay = document.createElement('div');
                vidplay.classList.add('playlist-video');
                vidplay.innerHTML = `
                    <img src="${viddata.thumbnail}" alt="${viddata.title}">
                    <p>${viddata.title}</p>
                `;

                // Add click event to load the video
                vidplay.addEventListener('click', () => {
                    loadVideo(viddata.src);
                    titleElement.textContent = viddata.title;
                    descriptionElement.innerHTML = viddata.description;
                    // Xóa các track cũ
                    const existingTracks = video.querySelectorAll('track');
                    existingTracks.forEach(track => track.remove());

                    // Thêm track phụ đề mới
                    if (viddata.subtitles) {
                        viddata.subtitles.forEach(subtitle => {
                            const track = document.createElement('track');
                            track.kind = 'subtitles';
                            track.label = subtitle.label || 'Không có sẵn';
                            track.src = subtitle.src;
                            track.srclang = subtitle.srclang || '';
                            track.default = subtitle.default || false;
                            video.appendChild(track);
                        });
                    }

                    player.restart(); // Khởi động lại player
                });

                // Append to playlist container
                vidplaylist.appendChild(vidplay);

                // Tự động tải video đầu tiên
                if (index === 0) {
                    loadVideo(viddata.src);
                    titleElement.textContent = viddata.title;
                    descriptionElement.innerHTML = viddata.description;
                }
            });
        })
        .catch(error => {
            console.error('Error fetching or processing videos.json:', error);
        });

    function loadVideo(sourceUrl) {
        if (Hls.isSupported()) {
            if (hls) {
                hls.destroy();
            }
            hls = new Hls();
            hls.loadSource(sourceUrl);
            hls.attachMedia(video);
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = sourceUrl;
        } else {
            console.error('HLS is not supported in this browser.');
        }
    }

    function adjustPlaylistHeight() {
        const main = document.querySelector('.main');
        const playlist = document.querySelector('.playlist');
    
        if (main && playlist) {
            const mainHeight = main.offsetHeight;
            playlist.style.height = mainHeight + 'px';
        }
    }

    // Sự kiện khi metadata được tải xong
    video.addEventListener('loadedmetadata', () => {
        const tracks = video.textTracks;
        for (let i = 0; i < tracks.length; i++) {
            if (tracks[i].mode === 'disabled') {
                tracks[i].mode = 'showing'; // Kích hoạt phụ đề
            }
        }
    });
    const description = document.getElementById('description');
    const toggleBtn = document.getElementById('toggle-btn');

    toggleBtn.addEventListener('click', () => {
    if (description.style.display === '-webkit-box') {
        description.style.display = 'block'; // Hiển thị toàn bộ nội dung
        toggleBtn.textContent = 'Thu gọn';
    } else {
        description.style.display = '-webkit-box'; // Thu gọn lại
        toggleBtn.textContent = 'Hiện thêm';
    }
    });
    // Đảm bảo playlist có chiều cao chính xác ban đầu
    adjustPlaylistHeight();

    // Lắng nghe sự kiện thay đổi kích thước cửa sổ
    window.addEventListener('resize', adjustPlaylistHeight);
    window.addEventListener('loadedmetadata', adjustPlaylistHeight);

});
