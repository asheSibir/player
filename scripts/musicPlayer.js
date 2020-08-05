import { addZero } from './supScript.js';
export const musicPlayerInit = () => {
    const audio = document.querySelector('.audio');
    const audioImg = document.querySelector('.audio-img ');
    const audioHeader = document.querySelector('.audio-header');
    const audioPlayer = document.querySelector('.audio-player');
    const audioNavigation = document.querySelector('.audio-navigation');
    const audioButtonPlay = document.querySelector('.audio-button__play');
    const audioTimePassed = document.querySelector('.audio-time__passed');
    const audioProgress = document.querySelector('.audio-progress');
    const audioProgressTiming = document.querySelector('.audio-progress__timing');
    const audioTimeTotal = document.querySelector('.audio-time__total');
    const volumeAudio = document.querySelector('.volume-audio');
    const volumeRange = document.querySelector('.volume-range');
    const volumeDown = volumeAudio.querySelector('.fa-volume-down');
    const volumeUp = volumeAudio.querySelector('.fa-volume-up');

    const playList = ['flow', 'hello', 'speed'];
    let trackIndex = 0;

    const loadTrack = () => {
        const isPlayed = audioPlayer.paused;
        const track = playList[trackIndex];

        audioPlayer.src = `./audio/${track}.mp3`;
        audioImg.src = `./audio/${track}.jpg`;
        audioHeader.textContent = track.toUpperCase();

        if (isPlayed) {
            audioPlayer.pause();
        } else {
            audioPlayer.play();
        }
    }

    // PLAYER
    audioNavigation.addEventListener('click', event => {
        const target = event.target;
        if (target.classList.contains('audio-button__play')){
            audio.classList.toggle('play');
            audioButtonPlay.classList.toggle('fa-play');
            audioButtonPlay.classList.toggle('fa-pause');
            audioHeader.textContent = '';

            if (audioPlayer.paused) {
                audioPlayer.play();
            } else {
                audioPlayer.pause();
            }
        }
        if (target.classList.contains('audio-button__next')){
            if (trackIndex === playList.length - 1){
                trackIndex = 0;
            } else {
                trackIndex++;
            }
            loadTrack();
        }

        if (target.classList.contains('audio-button__prev')){
            if (trackIndex !== 0) {
                trackIndex--;
            } else {
                trackIndex = playList.length - 1;
            }
            loadTrack();
        }

    });

    // TIMING
    audioPlayer.addEventListener('timeupdate', () => {
        const duration = audioPlayer.duration,
        current = audioPlayer.currentTime;

        audioProgress.value = current / duration * 100;
        let minutePassed = Math.floor(current / 60),
        secondPassed = Math.floor(current % 60),
        minuteTotal = Math.floor(duration / 60),
        secondTotal = Math.floor(duration % 60);

        audioTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondPassed)}`
        ;
        audioTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondTotal)}`;
        audioProgressTiming.style.width = current / duration * 100 + '%';
    });
    audioProgress.addEventListener('input', () => {
        const duration = audioPlayer.duration,
        value = audioProgress.value;
        audioPlayer.currentTime = value * duration / 100;
    });

    //VOLUME
    volumeAudio.addEventListener('input', () => {
        audioPlayer.volume = volumeRange.value / 100;
    });
    volumeDown.addEventListener('click', () => {
        volumeDown.classList.toggle('fa-volume-off');
        volumeDown.classList.toggle('fa-volume-down');
        if (volumeDown.classList.contains('fa-volume-off')){
            audioPlayer.volume = 0;
            volumeRange.value = 0;
        } else {
            audioPlayer.volume = 0.5;
            volumeRange.value = 50;
        }
    });
    volumeUp.addEventListener('click', () => {
        audioPlayer.volume = 1;
        volumeRange.value = 100;
        if (volumeDown.classList.contains('fa-volume-off')) {
            volumeDown.classList.remove('fa-volume-off');
            volumeDown.classList.add('fa-volume-down');
        }
    });
}