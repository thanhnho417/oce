document.addEventListener("DOMContentLoaded", () => {
    const processVideoElement = (video) => {
        try {
            const sourceElement = video.querySelector("source");
            if (!sourceElement) {
                console.warn("Missing <source> element in <video>:", video);
                return;
            }

            const videoSrc = sourceElement.getAttribute("src");
            if (!videoSrc) {
                console.warn("Empty src attribute in <source> element:", sourceElement);
                return;
            }

            if (!videoSrc.endsWith(".m3u8")) {
                console.warn("URL is not in .m3u8 format:", videoSrc);
                return;
            }

            // Check for native HLS support (Safari)
            if (video.canPlayType("application/vnd.apple.mpegurl")) {
                video.src = videoSrc;
                video.load();
                return;
            }

            // Check for HLS.js support
            if (typeof Hls === "undefined" || !Hls.isSupported()) {
                console.error("Browser doesn't support HLS or HLS.js is not loaded");
                return;
            }

            // Initialize HLS.js
            const hls = new Hls({
                enableWorker: true, // Sử dụng Web Worker để cải thiện hiệu năng
                lowLatencyMode: true // Chế độ độ trễ thấp
            });

            hls.loadSource(videoSrc);
            hls.attachMedia(video);

            // Event listeners
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                console.log(`HLS manifest loaded for ${videoSrc}`);
                video.play().catch(e => console.warn("Autoplay failed:", e));
            });

            hls.on(Hls.Events.ERROR, (event, data) => {
                if (data.fatal) {
                    switch (data.type) {
                        case Hls.ErrorTypes.NETWORK_ERROR:
                            console.error("Fatal network error encountered, trying to recover");
                            hls.startLoad();
                            break;
                        case Hls.ErrorTypes.MEDIA_ERROR:
                            console.error("Fatal media error encountered, trying to recover");
                            hls.recoverMediaError();
                            break;
                        default:
                            console.error("Unrecoverable error", data);
                            hls.destroy();
                            break;
                    }
                } else {
                    console.warn("Non-fatal HLS error:", data);
                }
            });
        } catch (error) {
            console.error("Error processing video element:", error);
        }
    };

    // Process all video elements
    document.querySelectorAll("video").forEach(processVideoElement);
});