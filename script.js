
function initLoader() {
    const loader = document.querySelector('.loading-area');
    if (loader) {
        const timeout = setTimeout(() => {
            loader.classList.add('fade-out');
        }, 1800);

        window.addEventListener('load', function () {
            clearTimeout(timeout);
            loader.classList.add('sfade');
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {

    navweb();
    createLoadingElements();
    initImagePreview();
    initFooter();
    initNetworkStatus();
    initPageTitle();
    initBackToTopButton();
});
window.availableKeywords = []; // Biến toàn cục để lưu trữ từ khóa tìm 
const cssicon = document.createElement('link');
cssicon.rel = 'stylesheet';
cssicon.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
document.head.appendChild(cssicon);
function navweb() {
    const header = document.querySelector('header');
    header.innerHTML = ''; // Xóa nội dung hiện tại của header
    if (!header) return;
    const weblink = document.createElement('a');
    weblink.href = '/';
    weblink.style.display = 'inline-flex';
    weblink.style.alignContent = 'center'
    weblink.innerHTML = '<img src="https://ik.imagekit.io/ocemedia/fileweb.svg?updatedAt=1740322170272" alt="web" width="90px" style="border-radius: 0 ">';
    header.appendChild(weblink);
    const webnav = document.createElement('nav');
    webnav.className = 'top-menu';
    const createul1 = document.createElement('ul');
    createul1.innerHTML = `
        <li><a href="/introduce" title="Giới thiệu"><i class="fa-solid fa-circle-user" style="color: white;"></i></a></li>
        <li><a href="/game" title="Game"><i class="fa-solid fa-gamepad" style="color: white;"></i></a></li>
        <li><a href="/media" title="Đa phương tiện"><i class="fa-solid fa-photo-film" style="color: white; height: 100%; width: auto;"></i></a></li>
        <li><a href="/anime" title="Anime"><svg fill="#ffffff" width="18px" height="18px" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg"><path d="M38.892 14.296C26.973 19.323 15.061 32.693 15.01 41.102c-.009 1.359-2.437 8.367-13.59 39.218L.039 84.141l27.731-.321c31.091-.359 32.628-.667 41.006-8.237 18.829-17.01 3.415-50.678-20.822-45.48-20.01 4.292-21.144 34.431-1.379 36.658 12.603 1.421 18.192-11.422 8.707-20.006-1.841-1.666-2.037-1.62-4.623 1.079-2.699 2.817-2.699 2.82-.68 4.647 4.522 4.092 1.159 8.906-4.439 6.355-6.306-2.873-7.474-12.102-2.199-17.377 13.386-13.386 34.151 8.644 23.31 24.731-16.699 24.779-55.114-1.28-42.293-28.69 8.743-18.692 31.564-23.429 50.15-10.41l5.702 3.995 7.395-5.566c8.152-6.136 8.232-6.278 5.458-9.658-2.098-2.557-1.74-2.656-8.938 2.474l-3.978 2.835-8.663-4.293c-11.285-5.592-23.213-6.537-32.592-2.581M16 62.281c0 .371-1.105 3.609-2.455 7.196L11.09 76h15.259l-2.071-2.25c-1.138-1.237-3.467-4.476-5.174-7.196C17.397 63.834 16 61.911 16 62.281" fill-rule="evenodd" /></svg></a></li>
        <li><a href="/links" title="Link"><i class="fa-solid fa-link"></i></a></li>
        <li><a href="/blog" title="Blog"><i class="fa-solid fa-blog" style="color: white;"></i></a></li>
        <li><a href="/project" title="Project"><i class="fa-solid fa-bars-progress" style="color: white;"></i></a></li>
    `
    webnav.appendChild(createul1);
    header.appendChild(webnav);
    const searchform = document.createElement('form');
    searchform.className = 'searchform';
    searchform.action = '/results';
    const inputplace = document.createElement('div');
    inputplace.className = 'input-place';
    const searchinput = document.createElement('input');
    searchinput.type = 'text';
    searchinput.id = 'search-input';
    searchinput.placeholder = 'Tìm...';
    searchinput.autocomplete = 'off';
    searchinput.name = 'query';
    searchinput.required = true;
    const closesearch = document.createElement('button')
    closesearch.type = 'button';
    closesearch.className = 'close-button';
    closesearch.addEventListener('click', closeSearch)
    closesearch.title = 'Thoát tìm kiếm';
    closesearch.innerHTML = '<i class="fa-solid fa-xmark fa-lg" style="color: white;"></i>';
    const searchbutton = document.createElement('button');
    searchbutton.type = 'submit';
    searchbutton.className = 'submit-button';
    searchbutton.title = 'Nhấn để tìm kiếm';
    searchbutton.style.display = 'none';
    searchbutton.innerHTML = '<i class="fa-solid fa-magnifying-glass fa-lg" style="color: white;"></i>';
    const actsearch = document.createElement('button');
    actsearch.type = 'button';
    actsearch.className = 'search-button';
    actsearch.title = 'Nhấn để tìm kiếm';
    actsearch.addEventListener('click', searchbtt);
    actsearch.innerHTML = '<i class="fa-solid fa-magnifying-glass fa-lg" style="color: white;"></i>';
    inputplace.appendChild(searchinput);
    inputplace.appendChild(closesearch);
    inputplace.appendChild(searchbutton);
    inputplace.appendChild(actsearch);
    searchform.appendChild(inputplace);
    webnav.appendChild(searchform);
    const grayScreen = document.createElement('div');
    grayScreen.className = 'gray-screen';
    document.body.appendChild(grayScreen);
    const searchPlace = document.createElement('div');
    searchPlace.className = 'search-place';
    searchPlace.style.display = 'none';
    searchPlace.style.opacity = '0';
    searchPlace.style.transition = 'opacity 0.3s ease';
    document.body.appendChild(searchPlace);
    const menubtt = document.createElement('button');
    menubtt.className = 'menu-top-button';
    menubtt.title = 'Menu';
    menubtt.addEventListener('click', opensidebar);
    menubtt.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" /></svg>'
    webnav.appendChild(menubtt);
    const sidebar = document.createElement('div');
    sidebar.className = 'sidebar';
    sidebar.style.display = 'none';
    sidebar.style.opacity = '0';
    const createul2 = document.createElement('ul');
    createul2.innerHTML = `
        <li><button onclick="closesidebar()" class="close-sb"><i class="fa-solid fa-xmark fa-lg" style="color: white;"></i></button></li>
        <li><a href="/introduce" title="Giới thiệu"><i class="fa-solid fa-circle-user" style="color: white;"></i></a></li>
        <li><a href="/game" title="Game"><i class="fa-solid fa-gamepad" style="color: white;"></i></a></li>
        <li><a href="/media" title="Đa phương tiện"><i class="fa-solid fa-photo-film" style="color: white; height: 100%; width: auto;"></i></a></li>
        <li><a href="/anime" title="Anime"><svg fill="#ffffff" width="18px" height="18px" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg"><path d="M38.892 14.296C26.973 19.323 15.061 32.693 15.01 41.102c-.009 1.359-2.437 8.367-13.59 39.218L.039 84.141l27.731-.321c31.091-.359 32.628-.667 41.006-8.237 18.829-17.01 3.415-50.678-20.822-45.48-20.01 4.292-21.144 34.431-1.379 36.658 12.603 1.421 18.192-11.422 8.707-20.006-1.841-1.666-2.037-1.62-4.623 1.079-2.699 2.817-2.699 2.82-.68 4.647 4.522 4.092 1.159 8.906-4.439 6.355-6.306-2.873-7.474-12.102-2.199-17.377 13.386-13.386 34.151 8.644 23.31 24.731-16.699 24.779-55.114-1.28-42.293-28.69 8.743-18.692 31.564-23.429 50.15-10.41l5.702 3.995 7.395-5.566c8.152-6.136 8.232-6.278 5.458-9.658-2.098-2.557-1.74-2.656-8.938 2.474l-3.978 2.835-8.663-4.293c-11.285-5.592-23.213-6.537-32.592-2.581M16 62.281c0 .371-1.105 3.609-2.455 7.196L11.09 76h15.259l-2.071-2.25c-1.138-1.237-3.467-4.476-5.174-7.196C17.397 63.834 16 61.911 16 62.281" fill-rule="evenodd" /></svg></a></li>
        <li><a href="/links" title="Link"><i class="fa-solid fa-link"></i></a></li>
        <li><a href="/blog" title="Blog"><i class="fa-solid fa-blog" style="color: white;"></i></a></li>
        <li><a href="/project" title="Project"><i class="fa-solid fa-bars-progress" style="color: white;"></i></a></li>
    `
    sidebar.appendChild(createul2);
    header.appendChild(sidebar);
}
function opensidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'block';
    sidebar.style.opacity = '1';
    sidebar.style.right = '0';
    sidebar.style.transition = 'right 0.3s ease, opacity 0.3s ease';
}
function closesidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'none';
    sidebar.style.opacity = '0';
    sidebar.style.right = '-100%';
    sidebar.style.transition = 'right 0.3s ease, opacity 0.3s ease';
}
function searchbtt() {
    const searchInput = document.getElementById('search-input');
    const closebtt = document.querySelector('.close-button');
    const searchButton = document.querySelector('.search-button');
    const grayScreen = document.querySelector('.gray-screen');
    const searchPlace = document.querySelector('.search-place');
    const submitbtt = document.querySelector('.submit-button');
    submitbtt.style.display = 'block';
    searchPlace.style.display = 'block'; // Hiển thị danh sách tìm kiếm
    searchPlace.style.opacity = '1'; // Đảm bảo danh sách tìm kiếm hiển thị
    searchPlace.style.transition = 'opacity 0.3s ease'; // Thêm hiệu ứng chuyển tiếp
    searchInput.classList.add('active-input');
    searchInput.focus();
    closebtt.style.display = 'flex';
    searchButton.style.display = 'none';
    grayScreen.classList.add('active-gray-screen');
}

function closeSearch() {
    const searchInput = document.getElementById('search-input');
    const closebtt = document.querySelector('.close-button');
    const searchButton = document.querySelector('.search-button');
    const grayScreen = document.querySelector('.gray-screen');
    const searchPlace = document.querySelector('.search-place');
    const submitbtt = document.querySelector('.submit-button');
    submitbtt.style.display = 'none'; // Ẩn nút submit
    searchPlace.style.display = 'none'; // Ẩn danh sách tìm kiếm
    searchInput.classList.remove('active-input');
    closebtt.style.display = 'none';
    searchButton.style.display = 'flex';
    grayScreen.classList.remove('active-gray-screen');
}
// Đóng tìm kiếm khi click ra ngoài
document.addEventListener('click', function (event) {
    const searchForm = document.querySelector('.searchform');
    const searchInput = document.getElementById('search-input');
    const searchplace = document.querySelector('.search-place');
    const sidebar = document.querySelector('.sidebar');
    if (!searchForm.contains(event.target) && !searchplace.contains(event.target) && searchInput.classList.contains('active-input')) {
        closeSearch();
    }
});
function searchengine() {
    const resultbox = document.querySelector('.search-place');
    const inputbox = document.getElementById('search-input');

    inputbox.onkeyup = function () {
        const input = inputbox.value.toLowerCase();
        resultbox.innerHTML = ''; // Xóa nội dung cũ
        if (input.length > 0) {
            const normalize = str => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
            const result = availableKeywords.filter(keyword => {
                const inputNorm = normalize(input);
                return normalize(keyword.category).includes(inputNorm) ||
                    normalize(keyword.title).includes(inputNorm) ||
                    normalize(keyword.description).includes(inputNorm) ||
                    normalize(keyword.src).includes(inputNorm) ||
                    (Array.isArray(keyword.hint) && keyword.hint.some(h => normalize(h).includes(inputNorm)))
            })
            const createul = document.createElement('ul');
            if (result.length > 0) {
                result.forEach(item => {
                    const createli = document.createElement('li');
                    createli.innerHTML = `<a href="${item.src}">${item.title}</a>`;
                    createli.addEventListener('click', function () {
                        inputbox.value = item.title;
                    });
                    createul.appendChild(createli);
                });
            } else {
                const createli = document.createElement('li');
                createli.innerHTML = 'Không tìm thấy kết quả';
                createul.appendChild(createli);
            }
            resultbox.appendChild(createul);
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    fetch('/results/data.json')
        .then(Response => Response.json())
        .then(data => {
            window.availableKeywords = data
            searchengine(); // Gọi hàm tìm kiếm sau khi dữ liệu đã được tải
        })
        .catch(error => console.error('Error fetching data:', error));
});


document.addEventListener('keydown', function (e) {
    const sidebar = document.querySelector('.sidebar');
    if (e.key === 'Escape' && sidebar.classList.contains('sidebar_load')) {
        sidebar.classList.remove('sidebar_load');
    }
});
function createLoadingElements() {

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

    document.addEventListener('click', function (e) {
        if (e.target.tagName === 'IMG' && !e.target.closest('.img-preview')) {
            imgpre.src = e.target.src;
            imgtitle.textContent = e.target.src.split('/').pop() || 'Không có tiêu đề';
            imgview.classList.add('active');
        }
    });

    if (close) {
        close.addEventListener('click', function () {
            imgview.classList.remove('active');
        });
    }

    imgview.addEventListener('click', function (e) {
        if (e.target === this) {
            this.classList.remove('active');
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && imgview.classList.contains('active')) {
            imgview.classList.remove('active');
        }
    });
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
            wifi.innerHTML = '<i class="fa-solid fa-wifi fa-lg"></i>';
            wifiTitle.textContent = 'Đã kết nối';
            setTimeout(() => popup.classList.remove("show"), 3000);
        } else {
            wifi.innerHTML = '<i class="fa-solid fa-wifi-exclamation fa-lg"></i>';
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

    window.onscroll = function () {
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            btt.style.visibility = 'visible';
            btt.style.opacity = '1';
        } else {
            btt.style.visibility = 'hidden';
            btt.style.opacity = '0';
        }
    };

    btt.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}