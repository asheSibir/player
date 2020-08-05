export const radioPlayerInit = () => {
    const radio = document.querySelector('.radio');
    const radioCoverImg = document.querySelector('.radio-cover__img');
    const radioNavigation = document.querySelector('.radio-navigation');
    const radioHeader = document.querySelector('.radio-header__big');
    const radioItem = document.querySelectorAll('.radio-item');
    const radioStop = document.querySelector('.radio-stop');
    const playerBtn = document.querySelectorAll('.player-btn');

    const audio = new Audio();
    const changeIconPlay = () => {
        if (audio.paused) {
            radioStop.classList.add('fa-play');
            radioStop.classList.remove('fa-stop');
        } else {
            radioStop.classList.remove('fa-play');
            radioStop.classList.add('fa-stop');
        }
    };

    audio.type = 'audio/aac';
    radioStop.disabled = true;

    // STATIONS
    radioNavigation.addEventListener('change', event => {
        radioStop.disabled = false;
        audio.src = event.target.dataset.radioStantion;
        audio.play();
        console.dir(event.target.nextSibliding);
        radioHeader.textContent = 897;
        radio.classList.add('play');
        changeIconPlay();
        document.querySelectorAll('.radio-img').forEach(img => img.style.border = '');
        event.target.closest('.radio-item').querySelector('.radio-img').style.border = '3px solid #e34fbe';
    });

    // PLAY BTN
    radioStop.addEventListener('click', () => {
        if (audio.paused) {
            radio.classList.add('play');
            audio.play();
        } else {
            radio.classList.remove('play');
            audio.pause();
        }
        changeIconPlay();
    });

    // CHANGE A GLOBAL PLAYER
    playerBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            audio.pause();
        });
    });
}