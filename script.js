let timer; // variable to store interval timer
let startTime; // variable to store start time
let pausedTime = 0; // variable to store paused time
let running = false; // flag to check if stopwatch is running
let paused = false; // flag to check if stopwatch is paused
let laps = []; // array to store lap times

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStop');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapsTable = document.getElementById('lapsTable');
const lapsList = document.getElementById('laps');

function startStop() {
    if (running) {
        clearInterval(timer);
        pausedTime += Date.now() - startTime;
        paused = true;
        running = false;
        startStopBtn.textContent = 'Resume';
        pauseBtn.style.display = 'none';
    } else {
        if (!paused) {
            startTime = Date.now() - (laps.length > 0 ? laps[laps.length - 1] : 0) - pausedTime;
        }
        timer = setInterval(updateDisplay, 10);
        running = true;
        paused = false;
        startStopBtn.textContent = 'Stop';
        pauseBtn.style.display = 'inline-block';
    }
}

function pause() {
    clearInterval(timer);
    pausedTime += Date.now() - startTime;
    paused = true;
    running = false;
    startStopBtn.textContent = 'Resume';
    pauseBtn.style.display = 'none';
}

function updateDisplay() {
    const elapsedTime = Date.now() - startTime - pausedTime;
    const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
    const milliseconds = elapsedTime % 1000;

    const formattedTime = 
        pad(hours) + ':' + 
        pad(minutes) + ':' + 
        pad(seconds) + 
        '<span id="milliseconds">.' + padMilliseconds(milliseconds) + '</span>';

    display.innerHTML = formattedTime;
}

function pad(val) {
    return val < 10 ? '0' + val : val;
}

function padMilliseconds(val) {
    if (val < 10) {
        return '00' + val;
    } else if (val < 100) {
        return '0' + val;
    } else {
        return val;
    }
}

function reset() {
    clearInterval(timer);
    display.innerHTML = '00:00:00<span id="milliseconds">.000</span>';
    running = false;
    paused = false;
    startStopBtn.textContent = 'Start';
    pauseBtn.style.display = 'none';
    laps = [];
    pausedTime = 0;
    lapsList.innerHTML = '';
}

function lap() {
    const elapsedTime = Date.now() - startTime - pausedTime;
    const formattedTime = 
        pad(Math.floor(elapsedTime / (1000 * 60 * 60))) + ':' + 
        pad(Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60))) + ':' + 
        pad(Math.floor((elapsedTime % (1000 * 60)) / 1000)) + 
        '.' + padMilliseconds(elapsedTime % 1000);

    laps.push(formattedTime);
    const lapItem = document.createElement('tr');
    lapItem.innerHTML = `<td>${laps.length}</td><td>${formattedTime}</td>`;
    lapsList.appendChild(lapItem);
}

startStopBtn.addEventListener('click', startStop);
pauseBtn.addEventListener('click', pause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);
