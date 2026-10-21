let pomodoroSession = document.getElementById("pomodoro-session")
let shortBreak = document.getElementById("short-break")
let longBreak = document.getElementById("long-break")
let timers = document.querySelectorAll(".timer-display")
let pomodoroTimer = document.getElementById("pomodoro-timer")
let shortTimer = document.getElementById("short-timer")
let longTimer = document.getElementById("long-timer")
let button = document.querySelector(".button")
let startBtn = document.getElementById("start")
let resetBtn = document.getElementById("reset")
let stopBtn = document.getElementById("stop")

let currentTimer = null
let interval = null

function showDefaultTimer() {
    pomodoroTimer.style.display = "block"
    shortTimer.style.display = "none"
    longTimer.style.display = "none"
}

showDefaultTimer()

function hideAll() {
    timers.forEach((timer) => {
        timer.style.display = "none"
    })

}

pomodoroSession.addEventListener("click", () => {
    hideAll()

    pomodoroTimer.style.display = "block"

    pomodoroSession.classList.add("active")
    shortBreak.classList.remove("active")
    longBreak.classList.remove("active")

    currentTimer = pomodoroTimer
})

shortBreak.addEventListener("click", () => {
    hideAll()

    shortTimer.style.display = "block"

    pomodoroSession.classList.remove("active")
    shortBreak.classList.add("active")
    longBreak.classList.remove("active")

    currentTimer = shortTimer
})

longBreak.addEventListener("click", () => {
    hideAll()

    longTimer.style.display = "block"

    pomodoroSession.classList.remove("active")
    shortBreak.classList.remove("active")
    longBreak.classList.add("active")

    currentTimer = longTimer
})

function startTimer(timerDisplay) {
    if (interval) {
        clearInterval(interval);
    }

    timerDuration = timerDisplay
        .getAttribute("data-duration")
        .split(":")[0];

    let durationinmiliseconds = timerDuration * 60 * 1000;
    let endTimestamp = Date.now() + durationinmiliseconds;

    interval = setInterval(function () {
        const timeRemaining = new Date(endTimestamp - Date.now());

        if (timeRemaining <= 0) {
            clearInterval(interval);
            timerDisplay.textContent = "00:00";
            alert("Time's up! You can rest");

        } else {
            const minutes = Math.floor(timeRemaining / 60000);
            const seconds = ((timeRemaining % 60000) / 1000).toFixed(0);
            const formattedTime = `${minutes}:${seconds
                .toString()
                .padStart(2, "0")}`;
            timerDisplay.textContent = formattedTime;
        }
    }, 1000);
}

const updateTimer = () => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;

    timerDisplay.innerHTML = `${minutes}:${seconds
        .toString()
        .padStart(2, "0")}`;
};

startBtn.addEventListener("click", () => {
    if (currentTimer) {
        startTimer(currentTimer)
    }
})

resetBtn.addEventListener("click", () => {
    if (currentTimer) {
        clearInterval(interval)
        timeRemaining = 60000
        updateTimer();
    }
})

stopBtn.addEventListener("click", () => {
    if (currentTimer) {
        clearInterval(interval)
    }
})