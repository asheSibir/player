import { radioPlayerInit } from "./radioPlayer.js";
import { videoPlayerInit } from "./videoPlayer.js";
import { musicPlayerInit } from "./musicPlayer.js";
import { stopPlayer } from "./supScript.js";

const playerBtn = document.querySelectorAll('.player-btn'),
playerBlock = document.querySelectorAll('.player-block'),
temp = document.querySelector('.temp');

const deactivate = () => {
    temp.style.display = "none";
    playerBtn.forEach(item => item.classList.remove('active'));
    playerBlock.forEach(item => item.classList.remove('active'));
    stopPlayer(document.querySelector('.audio-player'));
    stopPlayer(document.querySelector('.video-player'));

}

playerBtn.forEach((btn, i) => btn.addEventListener('click', () => {
    deactivate();
    btn.classList.add('active');
    playerBlock[i].classList.add('active');
}));


radioPlayerInit();
videoPlayerInit();
musicPlayerInit();