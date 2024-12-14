document.addEventListener("DOMContentLoaded", () => {
    // Lấy tất cả các thẻ <video> trong tài liệu
    const videoElements = document.querySelectorAll("video");

    // Duyệt qua từng thẻ video
    videoElements.forEach(video => {
        // Lấy thẻ <source> bên trong <video>
        const sourceElement = video.querySelector("source");
        if (sourceElement) {
            const videoSrc = sourceElement.getAttribute("src");

            if (videoSrc && videoSrc.endsWith(".m3u8")) {
                // Nếu trình duyệt hỗ trợ Native HLS (như Safari)
                if (video.canPlayType("application/vnd.apple.mpegurl")) {
                    video.src = videoSrc; // Gán trực tiếp src vào <video>
                    video.load(); // Tải lại video
                } else if (Hls.isSupported()) {
                    // Nếu không, sử dụng HLS.js
                    const hls = new Hls();
                    hls.loadSource(videoSrc);
                    hls.attachMedia(video);

                    hls.on(Hls.Events.MANIFEST_PARSED, () => {
                        console.log(`HLS Manifest loaded for ${videoSrc}`);
                    });

                    hls.on(Hls.Events.ERROR, (event, data) => {
                        console.error("HLS Error:", data);
                    });
                } else {
                    console.error("Trình duyệt không hỗ trợ HLS.");
                }
            } else {
                console.warn("Source không phải định dạng m3u8 hoặc thiếu src:", sourceElement);
            }
        } else {
            console.warn("Thẻ video không có thẻ source:", video);
        }
    });
});
