import { addZero } from './supScript.js';
export const videoPlayerInit = () => {
    const videoPlayer = document.querySelector('.video-player'),
    videoButtonPlay = document.querySelector('.video-button__play'),
    videoButtonStop = document.querySelector('.video-button__stop'),
    videoTimePassed = document.querySelector('.video-time__passed'),
    videoProgress = document.querySelector('.video-progress'),
    videoTimeTotal = document.querySelector('.video-time__total'),
    fullScreen = document.querySelector('.fa-external-link'),
    videoVolume = document.querySelector('.video-volume');

    const toggleIcon = (elem) => {
        if (videoPlayer.paused){
            elem.classList.add('fa-play');
            elem.classList.remove('fa-pause');
        } else {
            elem.classList.remove('fa-play');
            elem.classList.add('fa-pause');
        }
    };

    const tooglePlay = () => {
        toggleIcon(videoButtonPlay);
        if (videoPlayer.paused){
            videoPlayer.play();
        } else {
            videoPlayer.pause();
        }
    };

    const videoStop = () => {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
    };

    videoPlayer.addEventListener('click', tooglePlay);
    videoButtonPlay.addEventListener('click', tooglePlay);
    videoButtonStop.addEventListener('click', videoStop);
    videoPlayer.addEventListener('timeupdate', () => {
        const duration = videoPlayer.duration,
        current = videoPlayer.currentTime;

        videoProgress.value = current / duration * 100;
        let minutePassed = Math.floor(current / 60),
        secondPassed = Math.floor(current % 60),
        minuteTotal = Math.floor(duration / 60),
        secondTotal = Math.floor(duration % 60);

        videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondPassed)}`
        ;
        videoTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondTotal)}`;
    });
    videoProgress.addEventListener('input', () => {
        const duration = videoPlayer.duration,
        value = videoProgress.value;

        videoPlayer.currentTime = value * duration / 100;
    });
    fullScreen.addEventListener('click', () => {
        videoPlayer.webkitEnterFullScreen();
    });
    videoVolume.addEventListener('input', () => {
        videoPlayer.volume = videoVolume.value / 100;
    });

}