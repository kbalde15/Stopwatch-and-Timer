window.onload = function () {
    // Time variables
    let minutes = 0;
    let seconds = 0;
    let tens = 0;
    let Interval;
    let isCountingDown = false;

    // DOM Elements - Display
    const mainTitle = document.querySelector("h1"); // NEW: Targets the h1 header
    const appendMinutes = document.getElementById("minutes");
    const appendSeconds = document.getElementById("seconds");
    const appendTens = document.getElementById("tens");
    const messageArea = document.getElementById("message");
    const alarm = document.getElementById("alarm-sound");

    // DOM Elements - Buttons
    const btnStart = document.getElementById('button-start');
    const btnStop = document.getElementById('button-stop');
    const btnReset = document.getElementById('button-reset');
    const btnSet = document.getElementById('button-set');

    // DOM Elements - Modal
    const modal = document.getElementById("modal");
    const btnSave = document.getElementById("save-time");
    const btnClose = document.getElementById("close-modal");
    const inputMin = document.getElementById("input-min");
    const inputSec = document.getElementById("input-sec");

    // --- 1. MODAL CONTROLS ---
    btnSet.onclick = function() {
        modal.style.display = "flex";
        inputMin.focus();
    };

    btnClose.onclick = function() {
        modal.style.display = "none";
    };

    btnSave.onclick = function() {
        minutes = parseInt(inputMin.value) || 0;
        seconds = parseInt(inputSec.value) || 0;
        tens = 0;

        if (minutes < 0) minutes = 0;
        if (seconds < 0) seconds = 0;
        if (seconds > 59) seconds = 59;

        // Determine mode immediately on save
        isCountingDown = (minutes > 0 || seconds > 0);
        
        updateDisplay();
        clearStatus();
        modal.style.display = "none";
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    // --- 2. STOPWATCH / TIMER LOGIC ---

    btnStart.onclick = function() {
        clearInterval(Interval);
        clearStatus();

        // Mode Detection
        isCountingDown = (minutes > 0 || seconds > 0 || tens > 0);
        
        // Update title as soon as we start
        updateDisplay(); 
        Interval = setInterval(operateTimer, 10);
    };

    btnStop.onclick = function() {
        clearInterval(Interval);
    };

    btnReset.onclick = function() {
        clearInterval(Interval);
        minutes = 0;
        seconds = 0;
        tens = 0;
        isCountingDown = false; // Reset to Stopwatch mode
        updateDisplay();
        clearStatus();
    };

    function operateTimer() {
        if (isCountingDown) {
            // --- COUNT DOWN LOGIC ---
            if (tens === 0 && seconds === 0 && minutes === 0) {
                clearInterval(Interval);
                alarm.play();
                messageArea.innerHTML = "⏰ TIME IS UP!";
                return;
            }

            if (tens > 0) {
                tens--;
            } else {
                if (seconds > 0) {
                    seconds--;
                    tens = 99;
                } else if (minutes > 0) {
                    minutes--;
                    seconds = 59;
                    tens = 99;
                }
            }
        } else {
            // --- COUNT UP LOGIC ---
            tens++;
            if (tens > 99) {
                seconds++;
                tens = 0;
            }
            if (seconds > 59) {
                minutes++;
                seconds = 0;
            }
        }
        updateDisplay();
    }

    // --- 3. HELPER FUNCTIONS ---

    function updateDisplay() {
        appendTens.innerHTML = tens < 10 ? "0" + tens : tens;
        appendSeconds.innerHTML = seconds < 10 ? "0" + seconds : seconds;
        appendMinutes.innerHTML = minutes < 10 ? "0" + minutes : minutes;

        // NEW: Update Header Text based on mode
        if (isCountingDown) {
            mainTitle.innerText = "Timer";
        } else {
            mainTitle.innerText = "StopWatch";
        }
    }

    function clearStatus() {
        messageArea.innerHTML = "";
        alarm.pause();
        alarm.currentTime = 0;
    }
};