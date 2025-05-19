document.addEventListener("DOMContentLoaded", function() {
    const imggal = document.querySelector(".img-gal");
    fetch('img-gal.json')
        .then(response => response.json())
        .then(data => {
            data.media.forEach(item => {
                if (item.type === 'image'){
                    const image = document.createElement("img");
                    image.src = item.src;
                    image.alt = item.alt || 'Không có tiêu đề';
                    image.className = item.class || 'Không có class';
                    image.loading = 'lazy';
                    image.title = item.alt || 'Không có tiêu đề';
                    imggal.appendChild(image);
                }
                else if (item.type === 'video') {
                    const video = document.createElement("video");
                    video.controls = true;
                    video.playsInline = true;
                    video.className = item.class || 'me-pho'
                    if (item.poster) video.poster = item.poster;
                    if (item.preload) video.preload = item.preload;
                    const ishls = item.sources.some(source => source.src.endsWith('.m3u8'));
                    if (ishls) {
                        if(Hls.isSupported()) {
                            const hls = new Hls();
                            hls.loadSource(item.sources[0].src);
                            hls.attachMedia(video);
                            hls.on(Hls.Events.MANIFEST_PARSED, function() {
                                video.autoplay = false;
                            });
                        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                            video.src = item.sources[0].src;
                            video.addEventListener('loadedmetadata', function() {
                                video.autoplay = false;
                            });
                        }
                    }
                    item.sources.forEach(source => {
                        const sourcemedia = document.createElement("source");
                        sourcemedia.src = source.src;
                        sourcemedia.type = source.type;
                        video.appendChild(sourcemedia);

                    });
                    
                    imggal.appendChild(video);
                }
            });
        })
        .catch(error => console.error('Error loading image gallery:', error));
});