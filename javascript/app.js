document.addEventListener('DOMContentLoaded', () => {
    const videoElement = document.querySelector('#player');
    const titleElement = document.getElementById('title');
    const descriptionElement = document.getElementById('description');
    const vidplaylist = document.querySelector('.playlist');
    const player = videojs(videoElement, {
        controls: true,
        autoplay: false,
        fluid: true,
    });
    let hls;

    fetch('videos.json')
        .then(response => response.json())
        .then(data => {
            data.forEach((viddata, index) => {
                const vidplay = document.createElement('div');
                vidplay.classList.add('playlist-video');
                vidplay.id = viddata.id;
                vidplay.innerHTML = `
                    <img src="${viddata.thumbnail}" alt="${viddata.title}">
                    <p>${viddata.title}</p>
                `;

                // Add click event to load the video
                vidplay.addEventListener('click', () => {
                    loadVideo(viddata);
                    window.scrollTo({
                        top: 0, behavior: 'smooth'
                    })
                });

                vidplaylist.appendChild(vidplay);

                // Load the first video by default
                if (index === 0) {
                    loadVideo(viddata);
                }
            });
        })
        .catch(error => {
            console.error('Error fetching or processing videos.json:', error);
        });

    function loadVideo(viddata) {
        if (Hls.isSupported()) {
            if (hls) {
                hls.destroy();
            }
            hls = new Hls();
            hls.loadSource(viddata.src);
            hls.attachMedia(videoElement);
            player.src({ type: 'application/x-mpegURL', src: viddata.src });
        } else {
            player.src({ src: viddata.src, type: 'application/x-mpegURL' });
        }
        
        titleElement.textContent = viddata.title || 'Không có tiêu đề';
        descriptionElement.innerHTML = viddata.description ||'Không có nội dung';
        
        // Remove existing subtitles
        player.textTracks().tracks_.forEach(track => player.removeRemoteTextTrack(track));
        
        // Add new subtitles
        if (viddata.subtitles) {
            viddata.subtitles.forEach(subtitle => {
                player.addRemoteTextTrack({
                    kind: 'subtitles',
                    label: subtitle.label || 'Không có sẵn',
                    src: subtitle.src,
                    srclang: subtitle.srclang || '',
                    default: subtitle.default || false
                }, false);
            });
        }
    }
    player.ready(function() {
        var watermark = document.createElement('div');
        watermark.className = 'vjs-watermark';
        watermark.innerHTML = '<img src="https://raw.githubusercontent.com/thanhnho417/up/refs/heads/main/images/watermark.png" width="100%">';
        player.el().appendChild(watermark);
      });
    function adjustPlaylistHeight() {
        const main = document.querySelector('.main');
        const playlist = document.querySelector('.playlist');
    
        if (main && playlist) {
            const mainHeight = main.offsetHeight;
            playlist.style.height = mainHeight + 'px';
        }
    }

    const toggleBtn = document.getElementById('toggle-btn');
    toggleBtn.addEventListener('click', () => {
        if (descriptionElement.style.display === '-webkit-box') {
            descriptionElement.style.display = 'block';
            toggleBtn.textContent = 'Thu gọn';
        } else {
            descriptionElement.style.display = '-webkit-box';
            toggleBtn.textContent = 'Hiện thêm';
        }
    });
    adjustPlaylistHeight();
    window.addEventListener('loadeddata', adjustPlaylistHeight);
    window.addEventListener('resize', adjustPlaylistHeight);
    window.addEventListener('scroll', adjustPlaylistHeight);
    window.addEventListener('load', adjustPlaylistHeight);
});
