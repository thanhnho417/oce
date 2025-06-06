document.addEventListener('DOMContentLoaded', () => {
    const videoElement = document.getElementById('player');
    const titleElement = document.getElementById('title');
    const descriptionElement = document.getElementById('description');
    const vidplaylist = document.querySelector('.playlist');
    const toggleBtn = document.getElementById('toggle-btn');

    const player = videojs(videoElement, {
        controls: true,
        autoplay: false,
        fluid: true
    });
    player.aspectRatio('16:9');
    player.playbackRates([0.5, 0.75, 1, 1.25, 1.5, 2])
    let hls;

    fetch('videos.json')
        .then(res => res.json())
        .then(data => {
            if (!Array.isArray(data)) throw new Error('Dữ liệu trong videos.json không hợp lệ.');
            if (data.length === 0) {
                vidplaylist.innerHTML = '<p>Không có video nào trong danh sách.</p>';
                return;
            }

            data.forEach((viddata, index) => {
                const vidplay = document.createElement('div');
                vidplay.classList.add('playlist-video');
                vidplay.id = viddata.id;
                vidplay.innerHTML = `
                    <img src="${viddata.thumbnail}" alt="${viddata.title}" loading="lazy">
                    <p>${viddata.title}</p>
                `;
                vidplay.addEventListener('click', () => {
                    loadVideo(viddata);
                    vidplay.classList.add('active');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    document.querySelectorAll('.playlist-video').forEach(el => el.classList.remove('active'));
                });
                vidplaylist.appendChild(vidplay);

                if (index === 0) {
                    loadVideo(viddata);
                    vidplay.classList.add('active');
                }
            });
        })
        .catch(err => {
            console.error('Lỗi khi load videos.json:', err);
            vidplaylist.innerHTML = `<p style="color:red">Không thể tải danh sách video.</p>`;
        });

    function loadVideo(viddata) {
        const isHLS = viddata.src.endsWith('.m3u8');

        // 👉 Cập nhật ảnh poster
        player.poster(viddata.thumbnail);


        if (isHLS && Hls.isSupported()) {
            hls?.destroy();
            hls = new Hls();
            hls.loadSource(viddata.src);
            hls.attachMedia(videoElement);
        } else {
            hls?.destroy();
            hls = null;
        }

        player.src({
            src: viddata.src,
            type: isHLS ? 'application/x-mpegURL' : 'video/mp4'
        });

        titleElement.textContent = viddata.title || 'Không có tiêu đề';
        descriptionElement.innerHTML = viddata.description || 'Không có nội dung';

        Array.from(player.remoteTextTracks()).forEach(track => player.removeRemoteTextTrack(track));

        (viddata.subtitles || []).forEach(sub => {
            player.addRemoteTextTrack({
                kind: 'subtitles',
                label: sub.label || 'Không có sẵn',
                src: sub.src,
                srclang: sub.srclang || '',
                default: sub.default || false
            }, false);
        });
    }
    toggleBtn.addEventListener('click', () => {
        const collapsed = descriptionElement.style.display === '-webkit-box';
        descriptionElement.style.display = collapsed ? 'block' : '-webkit-box';
        toggleBtn.textContent = collapsed ? 'Thu gọn' : 'Hiện thêm';
    });

    function debounce(fn, delay) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => fn(...args), delay);
        };
    }

    const adjustPlaylistHeight = debounce(() => {
        const main = document.querySelector('.main');
        const playlist = document.querySelector('.playlist');
        if (main && playlist) {
            playlist.style.height = `${main.offsetHeight}px`;
        }
    }, 100);

    ['load', 'resize', 'scroll'].forEach(evt => {
        window.addEventListener(evt, adjustPlaylistHeight);
    });
});
