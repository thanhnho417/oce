function showSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) sidebar.classList.toggle('sidebar_load');
}

function hideSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) sidebar.classList.remove('sidebar_load');
}

function initLogo() {
    const logo = document.querySelector(".left-selection a");
    if (!logo) return;

    logo.innerHTML = "";
    const leftse = document.querySelector(".left-selection");
    if (leftse) {
        const imgs = leftse.querySelectorAll("img");
        imgs.forEach(img => img.remove());
    }

    const webtitle = document.createElement("img");
    webtitle.src = "https://ik.imagekit.io/ocemedia/fileweb.svg?updatedAt=1740322170272";
    webtitle.alt = "web";
    webtitle.width = "97.8";
    logo.title = 'Trở về trang chủ';
    logo.appendChild(webtitle);
}

function createLoadingElements() {
    document.body.insertAdjacentHTML('beforeend', `
        <div class="loading-area"><div class="loader"></div><p>Đang tải...</p></div>
    `);
    
    document.body.insertAdjacentHTML('beforeend', `
        <div class="pop-up-network">
            <div class="wifi-icon"></div>
            <div class="details"></div>
        </div>
    `);
    
    document.body.insertAdjacentHTML('beforeend', `
        <div class="img-preview">
          <div class="bar">
            <div class="title">
              <p id="img-title" style="font-family: Quicksand Regular; font-weight: bold;">Không có tiêu đề</p>
            </div>
            <div class="close" title="Đóng">
              <svg xmlns="http://www.w3.org/2000/svg" title="Đóng" height="22px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
            </div>
          </div>
          <div class="pre">
            <img id="img-pre" src="" alt="">
          </div>
        </div>
    `);
}

function initImagePreview() {
    const imgview = document.querySelector('.img-preview');
    if (!imgview) return;

    const imgpre = document.querySelector('#img-pre');
    const close = document.querySelector('.close');
    const imgtitle = document.querySelector('#img-title');

    document.addEventListener('click', function(e) {
        if (e.target.tagName === 'IMG' && !e.target.closest('.img-preview')) {
            imgpre.src = e.target.src;
            imgtitle.textContent = 'Trình xem ảnh - ' + e.target.src.split('/').pop()  || 'Không có tiêu đề';
            imgview.classList.add('active');
        }
    });

    if (close) {
        close.addEventListener('click', function() {
            imgview.classList.remove('active');
        });
    }

    imgview.addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('active');
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && imgview.classList.contains('active')) {
            imgview.classList.remove('active');
        }
    });
}

function initLoader() {
    const loader = document.querySelector('.loading-area');
    if (loader) {
        window.addEventListener('load', function() {
            loader.classList.add('sfade');
        });
    }
}

function initFooter() {
    const footer = document.querySelector("footer");
    if (footer) {
        footer.innerHTML = "&copy; oce - Do not Reup - Released in 2024";
    }
}

function initNetworkStatus() {
    const popup = document.querySelector(".pop-up-network");
    const wifi = document.querySelector(".wifi-icon");
    const wifiTitle = document.querySelector(".pop-up-network .details");
    
    if (!popup || !wifi || !wifiTitle) return;

    const handlePopup = (isOnline) => {
        if (isOnline) {
            wifi.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#FFFFFF"><path d="M480-120q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM254-346l-84-86q59-59 138.5-93.5T480-560q92 0 171.5 35T790-430l-84 84q-44-44-102-69t-124-25q-66 0-124 25t-102 69ZM84-516 0-600q92-94 215-147t265-53q142 0 265 53t215 147l-84 84q-77-77-178.5-120.5T480-680q-116 0-217.5 43.5T84-516Z"/></svg>';
            wifiTitle.textContent = 'Đã kết nối';
            setTimeout(() => popup.classList.remove("show"), 3000);
        } else {
            wifi.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#FFFFFF"><path d="M790-56 414-434q-47 11-87.5 33T254-346l-84-86q32-32 69-56t79-42l-90-90q-41 21-76.5 46.5T84-516L0-602q32-32 66.5-57.5T140-708l-84-84 56-56 736 736-58 56Zm-310-64q-42 0-71-29.5T380-220q0-42 29-71t71-29q42 0 71 29t29 71q0 41-29 70.5T480-120Zm236-238-29-29-29-29-144-144q81 8 151.5 41T790-432l-74 74Zm160-158q-77-77-178.5-120.5T480-680q-21 0-40.5 1.5T400-674L298-776q44-12 89.5-18t92.5-6q142 0 265 53t215 145l-84 86Z"/></svg>';
            wifiTitle.textContent = 'Đang kết nối...';
            popup.classList.add("show");
        }
    };

    const checkNetwork = () => {
        handlePopup(navigator.onLine);
    };

    setInterval(checkNetwork, 7000);
    checkNetwork(); // Kiểm tra ngay lần đầu
}

function initPageTitle() {
    document.title += " | oce";
}

function initBackToTopButton() {
    const btt = document.createElement('button');
    btt.id = 'backtotopbtn';
    btt.title = 'Trở lại đầu trang';
    btt.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M440-160v-487L216-423l-56-57 320-320 320 320-56 57-224-224v487h-80Z"/></svg>';
    document.body.appendChild(btt);

    window.onscroll = function() {
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            btt.style.visibility = 'visible';
            btt.style.opacity = '1';
        } else {
            btt.style.visibility = 'hidden';
            btt.style.opacity = '0';
        }
    };

    btt.addEventListener('click', function() {
        window.scrollTo({
            top: 0, 
            behavior: 'smooth'
        });
    });
}

// Khởi tạo tất cả khi DOM đã sẵn sàng
document.addEventListener('DOMContentLoaded', function() {
    initLogo();
    createLoadingElements();
    initImagePreview();
    initLoader();
    initFooter();
    initNetworkStatus();
    initPageTitle();
    initBackToTopButton();
});