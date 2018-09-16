(function() {
    let time, timer;
    const setTimer = document.getElementById('set-timer')
    const displayTimer = document.getElementById('display-timer');
    const input = document.getElementById('timer-set');
    const start = document.getElementById('timer-start');
    const countdownTimer = document.getElementById('timer');
    const bell = document.getElementById('bell');
    const results = document.getElementById('results');
    const resultsImg = document.getElementById('results-img');
    const resultsText = document.getElementById('results-text');
    const sadMusic = [
        {
            src: 'Sulking.mp3',
            attr: null,
        }
    ]
    const happyMusic = [
        {
            src: 'Conjuto_Grande.mp3',
            attr: null,
        }
    ]

    function parseTime() {
        let minutes = time >= 60 ? Math.floor(time / 60) : '00';
        let seconds = time % 60 < 10 ? '0' + time % 60 : time % 60;
        return minutes + ':' + seconds;

    }

    function randomSong(arr) {
        const index = Math.floor(Math.random() * arr.length);
        return arr[index];
    }

    function timerInit() {
        time = input.value * 60;
        countdownInit();
    }

    function giveUp() {
        clearInterval(timer);
        failureDisplay('give up');
    }

    function failureDisplay(reason) {
        resultsImg.src = 'images/failure.png';
        const footerText = document.querySelector('footer h5')
        let song = randomSong(sadMusic)
        let audio = new Audio('audio/failure/' + song.src);
        if (reason === 'give up') {
            audio.play();
            footerText.textContent = song.attr;
            resultsText.textContent = 'You gave up with ' + parseTime() + ' left...';
        }
        if (reason === 'timeout') {
            resultsText.textContent = 'Time has ran out...'
            setTimeout(function() {
                audio.play();
                footerText.textContent = song.attr;
            }, 3000)
        }
        displayTimer.innerHTML = '';
        results.style.display = 'block';
    }

    function giveUpBtnInit() {
        let giveUpBtn = document.createElement('button');
        giveUpBtn.id = 'give-up-btn';
        giveUpBtn.addEventListener('click', giveUp);
        giveUpBtn.textContent = 'Give Up';
        displayTimer.appendChild(giveUpBtn);
    }

    function success() {
        clearInterval(timer);
        successDisplay();
    }

    function successDisplay() {
        let armsUp = false;
        let song = randomSong(happyMusic);
        let audio = new Audio('audio/success/' + song.src);
        setInterval(function() {
            if (armsUp) {
                resultsImg.src = 'images/success1.png';
            }
            else {
                resultsImg.src = 'images/success2.png';
            }
            armsUp = !armsUp;
        }, 500);
        displayTimer.innerHTML = '';
        audio.play();
        footerText.textContent = song.attr;
        results.style.display = 'block';
    }

    function successBtnInit() {
        let successBtn = document.createElement('button');
        successBtn.id = 'success-btn';
        successBtn.addEventListener('click', success);
        successBtn.textContent = 'Success!'
        displayTimer.appendChild(successBtn);
    }


    function countdownInit() {
        giveUpBtnInit();
        successBtnInit();
        timer = setInterval(function() {
            setTimer.innerHTML = '';
            time--;
            console.log(time);
            countdownTimer.innerText = parseTime();
            if (time <= 0) {
                bell.play();
                clearInterval(timer);
                failureDisplay('timeout');
            }
        }, 10)
    }

    start.addEventListener('click', timerInit)

})();
