document.addEventListener('DOMContentLoaded', function() {
    const video = document.getElementById('player');
    const videoTitle = document.getElementById('video-title');
    const videoDescription = document.getElementById('video-description');
    const playlistElement = document.getElementById('playlist');
    let hls;
    const player = new Plyr(video);

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
                    loadVideo(videoData, true);
                }
            });
        })
        .catch(error => console.error('Error fetching video data:', error));

    function loadVideo(videoData, autoPlay = false) {
        videoTitle.textContent = videoData.title;
        videoDescription.innerHTML = videoData.description.replace(/\n/g, '<br>');

        if (hls) {
            hls.destroy();
        }

        if (videoData.src.endsWith('.m3u8')) {
            if (Hls.isSupported()) {
                hls = new Hls();
                hls.loadSource(videoData.src);
                hls.attachMedia(video);
                hls.on(Hls.Events.MANIFEST_PARSED, function() {
                    if (autoPlay) {
                        player.play();
                    }
                });
            } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                video.src = videoData.src;
                video.addEventListener('loadedmetadata', function() {
                    if (autoPlay) {
                        player.play();
                    }
                });
            }
        } else {
            video.src = videoData.src;
            video.addEventListener('loadedmetadata', function() {
                if (autoPlay) {
                    player.play();
                }
            });
        }

        // Remove existing tracks
        while (video.firstChild) {
            video.removeChild(video.firstChild);
        }

        // Add new subtitles right after the video is loaded
        videoData.subtitles.forEach(subtitle => {
            const track = document.createElement('track');
            track.kind = 'subtitles';
            track.label = subtitle.label;
            track.srclang = subtitle.srclang;
            track.src = subtitle.src;
            track.default = subtitle.default || true;
            video.appendChild(track);
        });

        // Reinitialize Plyr to recognize new tracks
        player.restart();

        // Ensure the default track is enabled
        video.addEventListener('loadedmetadata', () => {
            const tracks = video.textTracks;
            for (let i = 0; i < tracks.length; i++) {
                if (tracks[i].mode === 'disabled') {
                    tracks[i].mode = 'showing';
                }
            }
        });

        player.on('languagechange', () => {
            // Handle language change event if needed
        });
    }
});
