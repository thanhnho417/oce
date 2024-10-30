const header = document.querySelector("header");
const nav = document.createElement("nav");
const sidebar = document.createElement("ul");
sidebar.className = "sidebar";
const sidebarItems = [
    { href: "#", icon: "m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z", onclick: "hideSidebar()" },
    { href: "../../introduce/", text: "Giới thiệu" },
    { href: "../../game/", text: "Game" },
    { href: "../../media/", text: "Đa phương tiện" },
    { href: "../../anime/", text: "Anime" },
    { href: "../../links/", text: "Link" },
    { href: "../../blog/", text: "Blog" },
    { href: "../../project/", text: "Project" }
];
sidebarItems.forEach(item => {
    const li = document.createElement("li");
    if (item.onclick) li.setAttribute("onclick", item.onclick);
    const a = document.createElement("a");
    a.href = item.href;
    if (item.icon) {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("height", "24px");
        svg.setAttribute("width", "24px");
        svg.setAttribute("viewBox", "0 -960 960 960");
        svg.setAttribute("fill", "#e8eaed");
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", item.icon);
        svg.appendChild(path);
        a.appendChild(svg);
    } else {
        a.textContent = item.text;
    }
    li.appendChild(a);
    sidebar.appendChild(li);
});
const secondaryUl = document.createElement("ul");
const secondaryItems = [
    { href: "../../introduce/", text: "Giới thiệu" },
    { href: "../../game/", text: "Game" },
    { href: "../../media/", text: "Đa phương tiện" },
    { href: "../../anime/", text: "Anime" },
    { href: "../../links/", text: "Link" },
    { href: "../../blog/", text: "Blog" },
    { href: "../../project/", text: "Project" },
];
secondaryItems.forEach(item => {
    const li = document.createElement("li");
    li.className = "hideOnMobile";
    const a = document.createElement("a");
    a.href = item.href;
    a.textContent = item.text;
    li.appendChild(a);
    secondaryUl.appendChild(li);
});
const searchForm = document.createElement("form");
searchForm.id = "searchForm";
searchForm.action = "../../../../results/";
const searchInput = document.createElement("input");
searchInput.type = "text";
searchInput.id = "searchInput";
searchInput.name = "query";
searchInput.placeholder = "Tìm...";
const searchButton = document.createElement("button");
searchButton.type = "submit";
const searchSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
searchSvg.setAttribute("height", "24px");
searchSvg.setAttribute("width", "24px");
searchSvg.setAttribute("viewBox", "0 -960 960 960");
searchSvg.setAttribute("fill", "#FFFFFF");
const searchPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
searchPath.setAttribute("d", "M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z");
searchSvg.appendChild(searchPath);
searchButton.appendChild(searchSvg);
searchForm.appendChild(searchInput);
searchForm.appendChild(searchButton);
secondaryUl.appendChild(searchForm);
const menu = document.createElement("li");
menu.className = "menu-button";
menu.setAttribute("onclick", "showSidebar()");
const menuA = document.createElement("a");
menuA.href = "#";
const menuSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
menuSvg.setAttribute("height", "24px");
menuSvg.setAttribute("width", "24px");
menuSvg.setAttribute("viewBox", "0 -960 960 960");
menuSvg.setAttribute("fill", "#e8eaed");
const menuPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
menuPath.setAttribute("d", "M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z");
menuSvg.appendChild(menuPath);
menuA.appendChild(menuSvg);
menu.appendChild(menuA);
secondaryUl.appendChild(menu);
nav.appendChild(sidebar);
nav.appendChild(secondaryUl);
header.appendChild(nav);
