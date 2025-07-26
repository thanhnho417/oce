document.addEventListener("DOMContentLoaded", function() {
  fetch('/game/game.json')
      .then(response => response.json())
      .then(data => {
          const cardArea = document.querySelector('.card-area');
          cardArea.innerHTML = '';
          const wrapper = document.createElement('div');
          wrapper.classList.add('wrapper');
          const boxArea = document.createElement('div');
          boxArea.classList.add('box-area');
          data.forEach(anime => {
              const box = document.createElement('div');
              box.classList.add('box');
              const link = document.createElement('a');
              link.href = anime.url;
              const img = document.createElement('img');
              img.src = anime.image_url;
              img.alt = anime.title;
              link.appendChild(img);
              const overlay = document.createElement('div');
              overlay.classList.add('overlay');
              const overlayLink = document.createElement('a');
              overlayLink.href = anime.url;
              overlayLink.textContent = anime.title;
              overlay.appendChild(overlayLink);
              box.appendChild(link);
              box.appendChild(overlay);
              boxArea.appendChild(box);
          });
          wrapper.appendChild(boxArea);
          cardArea.appendChild(wrapper);
      })
      .catch(error => console.error('Error fetching data:', error));
});