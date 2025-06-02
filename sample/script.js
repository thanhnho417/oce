window.availableKeywords = []; // Biến toàn cục để lưu trữ từ khóa tìm kiếm
function searchbtt() {
        const searchInput = document.getElementById('search-input');
        const closebtt = document.querySelector('.close-button');
        const searchButton = document.querySelector('.search-button');
        const grayScreen = document.querySelector('.gray-screen');
        const searchPlace = document.querySelector('.search-place');
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
        searchPlace.style.display = 'none'; // Ẩn danh sách tìm kiếm
        searchInput.classList.remove('active-input');
        closebtt.style.display = 'none';
        searchButton.style.display = 'flex';
        grayScreen.classList.remove('active-gray-screen');
      }
      // Đóng tìm kiếm khi click ra ngoài
      document.addEventListener('click', function(event) {
        const searchForm = document.querySelector('.searchform');
        const searchInput = document.getElementById('search-input');
        const searchplace = document.querySelector('.search-place');
        
        if (!searchForm.contains(event.target) && !searchplace.contains(event.target) && searchInput.classList.contains('active-input')) {
          closeSearch();
        }
      });
function searchengine(){
    const resultbox = document.querySelector('.search-place');
    const inputbox = document.getElementById('search-input');
    inputbox.onkeyup = function(){
        const input = inputbox.value;
        if (input.length){
            const key = window.availableKeywords.filter((keyword) => {
                return keyword.toLowerCase().includes(input.toLowerCase());
            });
            const createul = document.createElement('ul');
            key.forEach((item) => {
                const createli = document.createElement('li');
                createli.textContent = item;
                createul.appendChild(createli);
            });
            resultbox.innerHTML = ''; // Xóa nội dung cũ
            resultbox.appendChild(createul);
        } else {
           
            resultbox.innerHTML = '';
            resultbox.textContent = 'Tìm tại đây'
        }
    }
}





document.addEventListener('DOMContentLoaded', function(){
        fetch('https://oce.pages.dev/results/data.json')
          .then(Response => Response.json())
          .then(data => {
            const searchPlace = document.querySelector('.search-place');
            const createul = document.createElement('ul');
            searchPlace.innerHTML = ''; // Xóa nội dung cũ
            window.availableKeywords = data.map(item => item.category + " | " + item.description + " | " +  item.title);
            
            searchengine(); // Gọi hàm tìm kiếm sau khi dữ liệu đã được tải
          })
      })