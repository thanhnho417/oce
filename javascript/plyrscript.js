document.addEventListener('DOMContentLoaded', function () {
  const vidcreate = document.querySelector('.vid-container')
  vidcreate.innerHTML = `
    <div class="vid-player-container">
        <div class="vid-main-video">
          <div class="vid-play">
            <video class="vid-player" controls playsinline crossorigin="anonymous"></video>
          </div>
          <div class="vid-main-info">
            <h3 class="vid-title">Video Test</h3>
            <p class="vid-description">A brief description of the video content goes here.</p>
          </div>
        </div>
        <div class="vid-playlist"></div>
      </div>
  `
  const vid = document.querySelector('.vid-player');
  const vidplaylist = document.querySelector('.vid-playlist');
  const vidmaintitle = document.querySelector('.vid-title');
  const vidmaindescription = document.querySelector('.vid-description');
  const vidmainsrc = document.querySelector('.vid-container');
  let viddatasrc = vidmainsrc ? vidmainsrc.getAttribute('data-src') : null;
  let hls = null;
  let vidfull = false;
  let currentVideo = null;
  function vidactualsize(video) {
    const vidwidth = video.videoWidth;
    const vidheight = video.videoHeight;
    const scrwidth = window.innerWidth;
    const scrheight = window.innerHeight;
    const vidasp = vidwidth / vidheight;
    const scrasp = scrwidth / scrheight;
    let diswidth, disheight;
    if (scrasp > vidasp) {
      diswidth = scrheight * vidasp;
      disheight = scrheight;
    } else {
      diswidth = scrwidth;
      disheight = scrwidth / vidasp;
    }
    return { width: diswidth, height: disheight };
  }
  document.addEventListener('fullscreenchange', () => {
    vidfull = document.fullscreenElement && document.fullscreenElement.contains(vid)
    vidupdate()
  })
  window.addEventListener('resize', vidupdate)
  const player = new Plyr(vid, {
    captions: { active: true, update: true, language: 'auto' }
  });
  function vidaddwatermark() {
    const existing = document.querySelector('.vid-watermark')
    if (existing) return
    const interval = setInterval(() => {
      const plyrcontainer = vid.closest('.vid-play').querySelector('.plyr');
      if (plyrcontainer && !plyrcontainer.querySelector('.vid-watermark')) {
        const watermark = document.createElement('div');
        watermark.className = 'vid-watermark';
        watermark.innerHTML = `
          <img src="/watermark.png" alt="vid-watermark" class="vid-main-watermark">
          <p class="vid-age-watermark"></p>
        `;
        plyrcontainer.appendChild(watermark);
        setTimeout(vidupdate, 100);
        setTimeout(vidupdate, 200);
        clearInterval(interval);
      }
    }, 100);
  }
  function resetPlayer() {
    if (hls) {
      hls.destroy();
      hls = null;
    }
    while (vid.firstChild) {
      vid.removeChild(vid.firstChild);
    }
    vid.removeAttribute('src');
    vid.load();
  }
  function loadMediaSource(item) {
    resetPlayer();
    currentVideo = item;
    const isHls = item.src.endsWith('.m3u8');
    const mediaType = isHls ? 'application/x-mpegURL' : 'video/mp4';
    vidmaintitle.textContent = item.title || 'Không có tiêu đề';
    vidmaindescription.innerHTML = item.description || 'Không có nội dung';
    if (isHls) {
      if (Hls.isSupported()) {
        hls = new Hls();
        hls.loadSource(item.src);
        hls.attachMedia(vid);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {

          addSubtitles(item);
          player.load();
        });
      } else if (vid.canPlayType('application/vnd.apple.mpegurl')) {
        vid.src = item.src;
        vid.addEventListener('loadedmetadata', () => {
          addSubtitles(item);
          player.load();
        }, { once: true });
      }
    } else {
      const source = document.createElement('source');
      source.src = item.src;
      source.type = mediaType;
      vid.appendChild(source);
      addSubtitles(item);
      vid.load();
    }
  }
  function addSubtitles(item) {
    const exttrack = vid.querySelectorAll('track');
    exttrack.forEach(track => track.remove());
    let hasDefault = -1;
    const subtitles = item.subtitles;
    if (subtitles && subtitles.length > 0) {
      subtitles.forEach((sub, index) => {
        const track = document.createElement('track');
        track.kind = 'subtitles';
        track.label = sub.label || `Subtitle ${index + 1}`;
        track.srclang = sub.srclang || sub.lang || 'en';
        track.src = sub.src;
        if (sub.default) {
          track.default = true;
          hasDefault = index;
        }
        vid.appendChild(track);
      });
    }
    setTimeout(() => {
      if (hasDefault !== -1) {
        player.currentTrack = hasDefault;
        player.toggleCaptions(true);
      }
    }, 500);
  }
  function applyVideoAttributes(video) {
    const checker = setInterval(() => {
      const ageEl = document.querySelector('.vid-age-watermark');
      const markEl = document.querySelector('.vid-watermark');
      if (ageEl && markEl) {
        clearInterval(checker);
        ageEl.textContent = video.age || '';
        ageEl.style.fontSize = `${vid.clientWidth / 80}px`;
        const ratiostr = video.aspectratio || '16/9'
        markEl.style.setProperty('aspect-ratio', ratiostr);
        const [w, h] = ratiostr.split('/').map(Number)
        if (w && h) {
          const ratio = w / h
          if (ratio >= 1) {
            markEl.style.width = `${vid.clientWidth}px`
            markEl.style.height = 'auto'
          } else {
            markEl.style.height = `${vid.clientHeight}px`
            markEl.style.width = 'auto'
          }
        }
        vidupdate();
      }
    }, 200);
  }
  function loadPlaylist() {
    fetch(viddatasrc)
      .then(response => response.json())
      .then(data => {
        vidplaylist.innerHTML = `<p class="vid-playlist-main-title">Danh sách phát</p><hr>`
        data.forEach((video, index) => {
          const item = document.createElement('div');
          item.title = `${video.title}`;
          item.id = video.id
          item.className = 'vid-playlist-item';
          item.innerHTML = `
            <div class="vid-playlist-thumbnail">
              <img src="${video.thumbnail || '/sample/vna.png'}" alt="${video.title}" loading="lazy">
            </div>
            <p class="vid-playlist-title">${video.title}</p>
          `;
          item.addEventListener('click', () => {
            document.querySelectorAll('.vid-playlist-item').forEach(el => el.classList.remove('active'));
            item.classList.add('active');
            player.poster = video.thumbnail || '/sample/vna.png';

            loadMediaSource(video);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            vidaddwatermark();
            document.querySelector('.plyr__menu__container').style.maxHeight  = `${(vid.clientHeight)*0.65}px`;
            applyVideoAttributes(video);
          });
          vidplaylist.appendChild(item);
          if (index === 0) {
            item.classList.add('active');
            player.poster = video.thumbnail || '/sample/vna.png';
            loadMediaSource(video);
            vidaddwatermark();
            applyVideoAttributes(video);
            const plyrtrack = setInterval(() => {
              if (document.querySelector('.plyr__captions')) {
                clearInterval(plyrtrack)
                document.querySelector('.plyr__captions').style.fontSize = `${(vid.clientWidth) / 41}px`
              }
            }, 50)
            document.querySelector('.plyr__menu__container').style.maxHeight  = `${(vid.clientHeight)*0.65}px`;
          }
        });
      })
      .catch(error => console.error('Error loading playlist:', error));
  }
  loadPlaylist();

  function vidupdate() {
    const vidwatermark = document.querySelector('.vid-watermark');
    const vidage = document.querySelector('.vid-age-watermark');
    if (!vidwatermark || !vid.videoWidth || !vid.videoHeight) {
      console.log('Không tìm thấy watermark hoặc video chưa sẵn sàng');
      return;
    }
    const isFullscreen = document.fullscreenElement !== null;
    const size = vidactualsize(vid);
    if (isFullscreen) {
      vidwatermark.style.width = `${size.width}px`;
      vidwatermark.style.height = `${size.height}px`;
      vidage.style.fontSize = `${size.width / 80}px`;
      vidwatermark.style.removeProperty('aspect-ratio');
      document.querySelector('.plyr__captions').style.fontSize = `${(size.width) / 41}px`
      document.querySelector('.plyr__menu__container').style.maxHeight  = `${(vid.clientHeight)*0.65}px`;
      return;
    }
    vidwatermark.style.width = '100%';
    vidwatermark.style.height = 'auto';
    vidage.style.fontSize = `${vid.clientWidth / 80}px`;
    document.querySelector('.plyr__menu__container').style.maxHeight  = `${(vid.clientHeight)*0.65}px`;
    const ratiostr = currentVideo?.aspectratio || '16/9';
    const [w, h] = ratiostr.split('/').map(Number);
    if (!w || !h) return;
    const ratio = w / h;
    vidwatermark.style.setProperty('aspect-ratio', ratiostr);
    if (ratio >= 1) {
      vidwatermark.style.width = `${vid.clientWidth}px`;
      vidwatermark.style.height = 'auto';
    } else {
      vidwatermark.style.height = `${vid.clientHeight}px`;
      vidwatermark.style.width = 'auto';
    }
    document.querySelector('.plyr__captions').style.fontSize = `${(vid.clientWidth) / 41}px`
  }
  window.addEventListener('resize', vidupdate);
  document.addEventListener('fullscreenchange', vidupdate);
});
