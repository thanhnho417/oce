window.availableKeywords = []; // Biến toàn cục để lưu trữ từ khóa tìm 
const cssicon = document.createElement('link');
cssicon.rel = 'stylesheet';
cssicon.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
document.head.appendChild(cssicon);
function closeSidebar(){
  const sidebar = document.querySelector('.sidebar');
  sidebar.display = 'block';
}

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
        const input = inputbox.value.toLowerCase() ;
        resultbox.innerHTML = ''; // Xóa nội dung cũ
        if (input.length > 0) {
          const result = availableKeywords.filter(keyword => {
            return keyword.category.toLowerCase().includes(input) ||
                   keyword.title.toLowerCase().includes(input) ||
                   keyword.description.toLowerCase().includes(input) ||
                   keyword.src.toLowerCase().includes(input); 
          });
          const createul = document.createElement('ul');
          if (result.length > 0) {
            result.forEach(item => {
              const createli = document.createElement('li');
              createli.innerHTML = `${item.title}`;
              createli.addEventListener('click', function() {
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

document.addEventListener('DOMContentLoaded', function(){
        fetch('https://oce.pages.dev/results/data.json')
          .then(Response => Response.json())
          .then(data => {
            window.availableKeywords = data
            searchengine(); // Gọi hàm tìm kiếm sau khi dữ liệu đã được tải
          })
          .catch(error => console.error('Error fetching data:', error));
      });
