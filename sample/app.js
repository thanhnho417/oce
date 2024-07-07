document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('player');
    const videoTitle = document.getElementById('video-title');
    const videoDescription = document.getElementById('video-description');
    const playlistElement = document.getElementById('playlist');
    let hls;

    fetch('videos.json')
        .then(response => response.json())
        .then(data => {
            data.forEach((videoData, index) => {
                const item = document.createElement('div');
                item.classList.add('playlist-item');
                item.innerHTML = `
                    <img src="${videoData.thumbnail}" alt="${videoData.title}">
                    <div>${videoData.title}</div>
                `;
                item.addEventListener('click', () => {
                    loadVideo(videoData);
                });
                playlistElement.appendChild(item);

                // Load the first video by default
                if (index === 0) {
                    loadVideo(videoData);
                }
            });
        })
        .catch(error => console.error('Error fetching video data:', error));

    function loadVideo(videoData) {
        videoTitle.textContent = videoData.title;
        videoDescription.textContent = videoData.description;

        if (hls) {
            hls.destroy();
        }

        if (Hls.isSupported()) {
            hls = new Hls();
            hls.loadSource(videoData.src);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, function() {
                video.play();
            });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = videoData.src;
            video.addEventListener('loadedmetadata', function() {
                video.play();
            });
        }

        // Remove existing tracks
        while (video.firstChild) {
            video.removeChild(video.firstChild);
        }

        // Add new subtitles
        videoData.subtitles.forEach(subtitle => {
            const track = document.createElement('track');
            track.kind = 'subtitles';
            track.label = subtitle.label;
            track.srclang = subtitle.srclang;
            track.src = subtitle.src;
            track.default = subtitle.default || false;
            video.appendChild(track);
        });
    }
});
