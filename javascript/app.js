document.addEventListener('DOMContentLoaded', () => {
    const videoElement = document.querySelector('#player');
    const titleElement = document.getElementById('title');
    const descriptionElement = document.getElementById('description');
    const vidplaylist = document.querySelector('.playlist');
    const toggleBtn = document.getElementById('toggle-btn');

    const player = videojs(videoElement, {
        controls: true,
        autoplay: false,
        fluid: true,
        aspectRatio: '16/9'
    });

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
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    document.querySelectorAll('.playlist-video').forEach(el => el.classList.remove('active'));
                    vidplay.classList.add('active');
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

    function updateWatermark() {
        const videoEl = player.el().querySelector('video');
        const watermark = player.el().querySelector('.vjs-watermark');
        if (!videoEl || !watermark) return;

        const { clientWidth: w, clientHeight: h } = videoEl;
        watermark.style.width = `${w / 22}px`;
        watermark.style.bottom = `${h / 15}px`;
        watermark.style.right = `${w / 12}px`;
    }

    function createWatermark() {
        const videoEl = player.el().querySelector('video');
        if (!videoEl) return;

        const watermark = document.createElement('div');
        watermark.className = 'vjs-watermark';
        watermark.innerHTML = `<img src="https://raw.githubusercontent.com/thanhnho417/up/refs/heads/main/images/watermark.png" width="100%">`;
        Object.assign(watermark.style, {
            position: 'absolute',
            zIndex: '10',
            opacity: '0.7'
        });

        player.el().appendChild(watermark);
        updateWatermark();

        const resizeObserver = new ResizeObserver(() => updateWatermark());
        resizeObserver.observe(videoEl);
        resizeObserver.observe(player.el());
    }

    player.ready(() => {
        if (!player || !player.el()) return console.error('Player không tồn tại');
        createWatermark();
    });

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
