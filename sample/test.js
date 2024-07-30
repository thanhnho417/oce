document.addEventListener("DOMContentLoaded", function() {
    fetch('data.json')
      .then(response => response.json())
      .then(data => {
        const cardArea = document.querySelector('.card-area');
        
        data.forEach(anime => {
          const wrapper = document.createElement('div');
          wrapper.classList.add('wrapper');
          const boxarea = document.createElement('div');
          boxarea.classList.add('box-area');
          const box = document.createElement('div');
          box.classList.add('box');
          const a = document.createElement('a');
          a.href = anime.src1
          
        });
      })
      .catch(error => console.error('Error fetching the JSON data:', error));
  });
  