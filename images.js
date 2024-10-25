let slideIndex = 0;
let slidesData = [];

// Tải dữ liệu JSON và khởi tạo slideshow
fetch('images.json')
  .then(response => response.json())
  .then(data => {
    slidesData = data.images;
    initializeSlideshow(slidesData);
  });

// Hàm khởi tạo slideshow từ dữ liệu JSON
function initializeSlideshow(images) {
  const slideshowContainer = document.getElementById('image-wrapper');
  const dotsContainer = document.getElementById('dots-container');

  images.forEach((image, index) => {
    // Tạo phần tử cho mỗi slide
    const slideDiv = document.createElement('div');
    slideDiv.classList.add('slide', 'fade');
    
    const imgElement = document.createElement('img');
    imgElement.src = image.src;
    imgElement.alt = image.alt;
    imgElement.style.width = '100%';
    
    slideDiv.appendChild(imgElement);
    slideshowContainer.appendChild(slideDiv);

    // Tạo chấm chỉ thị
    const dot = document.createElement('span');
    dot.classList.add('dot');
    dot.onclick = function() { currentSlide(index + 1); };
    dotsContainer.appendChild(dot);
  });

  showSlides(slideIndex);
  setInterval(() => plusSlides(1), 5000); // Tự động chuyển ảnh sau mỗi 5 giây
}

// Điều khiển slide tiếp theo/trước
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Hiển thị slide hiện tại
function currentSlide(n) {
  showSlides(slideIndex = n - 1);
}

// Hàm hiển thị slide
function showSlides(n) {
  const slides = document.getElementsByClassName("slide");
  const dots = document.getElementsByClassName("dot");

  if (n >= slides.length) {slideIndex = 0}
  if (n < 0) {slideIndex = slides.length - 1}

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[slideIndex].style.display = "block";
  dots[slideIndex].className += " active";
}
