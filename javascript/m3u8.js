document.addEventListener("DOMContentLoaded", () => {
    const videoElements = document.querySelectorAll("video");

    videoElements.forEach(video => {
        const sourceElement = video.querySelector("source");

        if (sourceElement) {
            const videoSrc = sourceElement.getAttribute("src");

            if (videoSrc && videoSrc.endsWith(".m3u8")) {
                // Kiểm tra nếu trình duyệt hỗ trợ HLS natively
                if (video.canPlayType("application/vnd.apple.mpegurl")) {
                    video.src = videoSrc;
                    video.load();
                } else if (Hls.isSupported()) {
                    // Sử dụng HLS.js nếu trình duyệt không hỗ trợ HLS
                    const hls = new Hls();
                    hls.loadSource(videoSrc);
                    hls.attachMedia(video);

                    // Lắng nghe sự kiện thành công hoặc lỗi
                    hls.on(Hls.Events.MANIFEST_PARSED, () => {
                        console.log(`HLS Manifest loaded for ${videoSrc}`);
                    });

                    hls.on(Hls.Events.ERROR, (event, data) => {
                        console.error(`HLS.js Error: ${data.type}`, data);
                    });
                } else {
                    console.error("Trình duyệt không hỗ trợ HLS hoặc HLS.js.");
                }
            } else {
                console.warn("URL không phải định dạng .m3u8:", videoSrc);
            }
        } else {
            console.warn("Thẻ <source> bị thiếu trong <video>:", video);
        }
    });
});
