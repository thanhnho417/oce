document.addEventListener('DOMContentLoaded', () => {
    const player = new Plyr('#player', { captions: { active: true, language: 'vi' } });
    const video = document.querySelector('#player');
    const titleElement = document.getElementById('title');
    const descriptionElement = document.getElementById('description');
    const thumbnailElement = document.querySelector('.thumbnail');
    let hls;

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

    function addSubtitleTracks(subtitles) {
        console.log('Adding subtitles:', subtitles);  // Kiểm tra dữ liệu phụ đề
        const existingTracks = video.querySelectorAll('track');
        existingTracks.forEach(track => track.remove());  // Loại bỏ các track cũ trước khi thêm mới
    
        subtitles.forEach(subtitle => {
            // Kiểm tra nếu src của phụ đề tồn tại
            if (subtitle.src) {
                const track = document.createElement('track');
                track.kind = 'subtitles';
                track.label = subtitle.label || 'Subtitles';
                track.src = subtitle.src;
                track.srclang = subtitle.srclang || 'en';
                track.default = subtitle.default || false;
    
                // Đảm bảo video đã tải và có thể thêm track vào
                if (video.readyState >= 3) {
                    video.appendChild(track);
                } else {
                    video.addEventListener('loadedmetadata', () => {
                        video.appendChild(track);
                    });
                }
            }
        });
    }
    

    function updateVideoInfo(data) {
        if (data.title) {
            titleElement.textContent = data.title;
        }
        if (data.src) {
            loadVideo(data.src);
        }
        if (data.description) {
            descriptionElement.innerHTML = data.description;
        }
        if (data.thumbnail) {
            thumbnailElement.src = data.thumbnail;
        }
        if (data.subtitles) {
            addSubtitleTracks(data.subtitles); // Thêm phụ đề từ data JSON
        }
    }
    

    function initializeToggleButton(toggleBtnId, descriptionId, maxLines = 3) {
        const toggleButton = document.getElementById(toggleBtnId);
        const descriptionElement = document.getElementById(descriptionId);

        if (!toggleButton || !descriptionElement) {
            console.error('Không tìm thấy nút hoặc phần mô tả.');
            return;
        }

        let isExpanded = false;

        function updateDescription() {
            if (isExpanded) {
                descriptionElement.style.display = 'block';
                toggleButton.textContent = 'Ẩn bớt';
            } else {
                descriptionElement.style.display = '-webkit-box';
                descriptionElement.style.webkitBoxOrient = 'vertical';
                descriptionElement.style.overflow = 'hidden';
                descriptionElement.style.webkitLineClamp = maxLines;
                toggleButton.textContent = 'Hiện thêm';
            }
        }

        toggleButton.addEventListener('click', () => {
            isExpanded = !isExpanded;
            updateDescription();
        });

        updateDescription();
    }

    function updatePlaylist(data) {
        const playlistContainer = document.querySelector('.playlist');
        playlistContainer.innerHTML = '';

        data.forEach(videoData => {
            const playlistItem = document.createElement('div');
            playlistItem.classList.add('playlist-video');
            playlistItem.setAttribute('data-src', videoData.src);

            const imgElement = document.createElement('img');
            imgElement.setAttribute('src', videoData.thumbnail);
            imgElement.setAttribute('alt', 'Thumbnail');
            playlistItem.appendChild(imgElement);

            const titleElement = document.createElement('p');
            titleElement.classList.add('title-pl');
            titleElement.textContent = videoData.title;
            playlistItem.appendChild(titleElement);

            const descriptionElement = document.createElement('p');
            descriptionElement.classList.add('description-pl');
            descriptionElement.style.display = 'none';
            descriptionElement.innerHTML = videoData.description;
            playlistItem.appendChild(descriptionElement);

        

            playlistContainer.appendChild(playlistItem);

            playlistItem.addEventListener('click', () => {
                updateVideoInfo(videoData);
            });
        });
    }

    function loadPlaylistData() {
        fetch('videos.json')
            .then(response => response.json())
            .then(data => {
                if (data && data.length > 0) {
                    // Kiểm tra và xử lý nếu video không có phụ đề
                    data.forEach(videoData => {
                        if (videoData.subtitles && videoData.subtitles.length > 0) {
                            // Kiểm tra sự tồn tại của tệp phụ đề
                            videoData.subtitles.forEach(subtitle => {
                                fetch(subtitle.src)
                                    .then(subtitleResponse => {
                                        if (subtitleResponse.ok) {
                                            // Nếu tệp phụ đề tồn tại, thêm vào video
                                            updatePlaylist(data); // Cập nhật playlist
                                            updateVideoInfo(data[0]); // Cập nhật video đầu tiên
                                        } else {
                                            console.warn(`Không tìm thấy phụ đề tại ${subtitle.src}`);
                                        }
                                    })
                                    .catch(err => {
                                        console.error(`Lỗi khi tải phụ đề: ${subtitle.src}`, err);
                                    });
                            });
                        } else {
                            console.warn("Video không có phụ đề.");
                            updatePlaylist(data); // Cập nhật playlist mà không có phụ đề
                            updateVideoInfo(data[0]); // Cập nhật video đầu tiên
                        }
                    });
                }
            })
            .catch(error => {
                console.error('Không thể tải dữ liệu video:', error);
            });
    }
    

    function adjustPlaylistHeight() {
        const main = document.querySelector('.main');
        const playlist = document.querySelector('.playlist');

        if (main && playlist) {
            const mainHeight = main.offsetHeight;
            playlist.style.height = `${mainHeight}px`;
        }
    }

    window.addEventListener('load', () => {
        loadPlaylistData();
        adjustPlaylistHeight();
        initializeToggleButton('toggle-btn', 'description', 3);
    });

    window.addEventListener('resize', adjustPlaylistHeight);
});
