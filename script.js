function showSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'flex'
}
function hideSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'none'
}
function hideSearch(){
    const search = document.querySelector('.search')
    search.style.display = 'none'
}
const logo = document.querySelector(".left-selection a");
logo.innerHTML = "";
const leftse = document.querySelector(".left-selection")
const imgs = leftse.querySelectorAll("img");
imgs.forEach(img => img.remove());
const webtitle = document.createElement("img");
// Thiết lập thuộc tính cho webtitle
webtitle.src = "https://raw.githubusercontent.com/thanhnho417/oce/refs/heads/main/webname131.png";
webtitle.alt = "web";
webtitle.width = "97.8";
// Thêm các phần tử vào thẻ a
logo.appendChild(webtitle);
document.body.insertAdjacentHTML('beforeend', `
    <div class="pop-up-network">
        <div class="wifi-icon"></div>
        <div class="details"></div>
    </div>
`);
const footer = document.querySelector("footer");
footer.innerHTML = "";

footer.innerHTML = "&copy; oce - Do not Reup - Released in 2024";
const popup = document.querySelector(".pop-up-network");
const wifi = document.querySelector(".wifi-icon");
const wifiTitle = document.querySelector(".pop-up-network .details");

let isOnline = true;

const checkNetwork = () => {
    isOnline = navigator.onLine;
    handlePopup(isOnline);
}

const handlePopup = (status) => {
    if(status) {
        wifi.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#FFFFFF"><path d="M480-120q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM254-346l-84-86q59-59 138.5-93.5T480-560q92 0 171.5 35T790-430l-84 84q-44-44-102-69t-124-25q-66 0-124 25t-102 69ZM84-516 0-600q92-94 215-147t265-53q142 0 265 53t215 147l-84 84q-77-77-178.5-120.5T480-680q-116 0-217.5 43.5T84-516Z"/></svg>';
        wifiTitle.textContent = 'Đã kết nối';
        return setTimeout(() => popup.classList.remove("show"), 3000);
    }
    wifi.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#FFFFFF"><path d="M790-56 414-434q-47 11-87.5 33T254-346l-84-86q32-32 69-56t79-42l-90-90q-41 21-76.5 46.5T84-516L0-602q32-32 66.5-57.5T140-708l-84-84 56-56 736 736-58 56Zm-310-64q-42 0-71-29.5T380-220q0-42 29-71t71-29q42 0 71 29t29 71q0 41-29 70.5T480-120Zm236-238-29-29-29-29-144-144q81 8 151.5 41T790-432l-74 74Zm160-158q-77-77-178.5-120.5T480-680q-21 0-40.5 1.5T400-674L298-776q44-12 89.5-18t92.5-6q142 0 265 53t215 145l-84 86Z"/></svg>';
    wifiTitle.textContent = 'Đang kết nối...';
    popup.classList.add("show");
}
setInterval(checkNetwork, 7000);

document.addEventListener("DOMContentLoaded", function() {
    const loading = document.createElement('div');
    loading.classList.add("loading-area");
    loading.innerHTML = '<div class="loader"></div><p id="loading-content">Đang tải...</p>';

    const header = document.querySelector('header');
    if (header) {
        header.appendChild(loading);
    } else {
        console.error("Phần tử header không tồn tại.");
    }

    const scriptTag = document.createElement('script');
    scriptTag.src = "https://code.jquery.com/jquery-3.7.1.min.js";
    scriptTag.integrity = "sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=";
    scriptTag.crossOrigin = "anonymous";
    
    scriptTag.onload = function() {
        $(window).on("load", function(){
            $(".loading-area").fadeOut("slow");
        });
    };

    document.body.appendChild(scriptTag);
});

document.addEventListener("DOMContentLoaded", function(){
    const addtitle = " | oce";
    document.title += addtitle;
});