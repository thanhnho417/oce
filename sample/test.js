document.addEventListener('DOMContentLoaded', function() {
    fetch('data2.json')
        .then(response => response.json())
        .then(data => {
            const cardArea = document.querySelector('.card-area .wrapper .box-area');
            cardArea.innerHTML = ''; // Clear existing content
            data.forEach(item => {
                const box = document.createElement('div');
                box.classList.add('box');
                
                const link = document.createElement('a');
                link.href = item.src;
                
                const img = document.createElement('img');
                img.src = item.image;
                img.alt = 'Anime';
                link.appendChild(img);
                
                const overlay = document.createElement('div');
                overlay.classList.add('overlay');
                
                const overlayLink = document.createElement('a');
                overlayLink.href = item.src;
                overlayLink.textContent = item.title;
                overlay.appendChild(overlayLink);
                
                box.appendChild(link);
                box.appendChild(overlay);
                cardArea.appendChild(box);
            });
        })
        .catch(error => console.error('Error loading JSON data:', error));
});