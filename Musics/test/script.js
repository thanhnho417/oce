document.addEventListener('DOMContentLoaded', function () {
    const audioPlayer = document.getElementById('audio-player');
    const playlist = document.getElementById('playlist');
    const tracks = playlist.getElementsByTagName('li');

    for (let track of tracks) {
        track.addEventListener('click', function () {
            // Remove active class from all tracks
            for (let t of tracks) {
                t.classList.remove('active');
            }

            // Add active class to the clicked track
            this.classList.add('active');

            // Update the audio source and play
            audioPlayer.src = this.getAttribute('data-src');
            audioPlayer.play();
        });
    }
});
