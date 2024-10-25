let slideIndex = 0;
showSlides(slideIndex);

// Điều khiển hình ảnh tiếp theo hoặc trước đó
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Hiển thị hình ảnh hiện tại
function currentSlide(n) {
  showSlides(slideIndex = n - 1);
}

// Hàm hiển thị hình ảnh
function showSlides(n) {
  let slides = document.getElementsByClassName("slide");
  let dots = document.getElementsByClassName("dot");

  // Nếu số slide vượt quá, quay về slide đầu tiên
  if (n >= slides.length) {slideIndex = 0}
  
  // Nếu nhỏ hơn, quay về slide cuối cùng
  if (n < 0) {slideIndex = slides.length - 1}

  // Ẩn tất cả slide
  for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }

  // Loại bỏ lớp active ở chấm chỉ thị
  for (let i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }

  // Hiển thị slide hiện tại
  slides[slideIndex].style.display = "block";
  dots[slideIndex].className += " active";
}

// Tự động thay đổi hình ảnh sau mỗi 5 giây
setInterval(function() {
  plusSlides(1);
}, 5000);
