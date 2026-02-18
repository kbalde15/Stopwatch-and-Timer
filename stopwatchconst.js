// --- 1. Variables and Element Selectors ---
let minutes = 0, seconds = 0, tens = 0;
let interval;
let isTimer = false;

const appendMinutes = document.getElementById("minutes");
const appendSeconds = document.getElementById("seconds");
const appendTens = document.getElementById("tens");
const modeHeader = document.getElementById("mode");
const alarm = document.getElementById("alarm-sound");
const modal = document.getElementById("modal");

// --- 2. Foundation: Display Function ---
// This must be first because almost everyone else calls it.
const updateDisplay = () => {
    appendTens.innerHTML = tens < 10 ? "0" + tens : tens;
    appendSeconds.innerHTML = seconds < 10 ? "0" + seconds : seconds;
    appendMinutes.innerHTML = minutes < 10 ? "0" + minutes : minutes;
};

// --- 3. Logic: Increment and Decrement ---
const runUp = () => {
    tens++;
    if (tens > 99) {
        seconds++;
        tens = 0;
    }
    if (seconds > 59) {
        minutes++;
        seconds = 0;
    }
    updateDisplay();
};

const runDown = () => {
    if (minutes === 0 && seconds === 0 && tens === 0) {
        clearInterval(interval);
        alarm.play();
        return;
    }
    
    if (tens === 0) {
        if (seconds === 0) {
            minutes--;
            seconds = 59;
        } else {
            seconds--;
        }
        tens = 99;
    } else {
        tens--;
    }
    updateDisplay();
};

// --- 4. The "Switchboard" Function ---
// This decides which direction to count.
const startTimerLogic = () => {
    if (isTimer) {
        runDown();
    } else {
        runUp();
    }
};

// --- 5. Event Handlers (Buttons) ---
// These are defined last because they trigger the logic above.

document.getElementById('button-start').onclick = () => {
    clearInterval(interval);
    interval = setInterval(startTimerLogic, 10);
};

document.getElementById('button-stop').onclick = () => {
    clearInterval(interval);
};

document.getElementById('button-reset').onclick = () => {
    clearInterval(interval);
    tens = 0; seconds = 0; minutes = 0;
    isTimer = false;
    modeHeader.innerText = "Stopwatch";
    updateDisplay();
};

// Modal Control
document.getElementById("button-set").onclick = () => {
    modal.style.display = "flex";
};

document.getElementById("close-modal").onclick = () => {
    modal.style.display = "none";
};

document.getElementById("save-time").onclick = () => {
    minutes = parseInt(document.getElementById("input-min").value) || 0;
    seconds = parseInt(document.getElementById("input-sec").value) || 0;
    tens = 0;
    
    isTimer = true;
    modeHeader.innerText = "Timer";
    updateDisplay();
    modal.style.display = "none";
};