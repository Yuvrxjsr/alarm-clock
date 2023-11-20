'use strict';

// Utility functions

function onEvent(event, selector, callback) {
    return selector.addEventListener(event, callback);
}

function getElement(selector, parent = document) {
    return parent.getElementById(selector);
}

function select(selector, parent = document) {
    return parent.querySelector(selector);
}

// Clock time
function updateClock() {
    const clockElement = document.getElementById('clock');
    const currentTime = new Date();
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    const alarmSound = new Audio('./assets/audio/alarm.mp3');
    const timeString = `${hours}:${minutes}`;
    clockElement.textContent = timeString;
    const alarmOutput = document.getElementById('alarmOutput');
    const setAlarmTime = alarmOutput.textContent;
    let alarmTriggered = false;

    if (timeString === setAlarmTime) {
        alarmSound.play();
        clockElement.style.color = '#0064cc';
        if (!alarmTriggered) {
            alarmSound.play();
            alarmTriggered = true;

            setTimeout(() => {
                alarmSound.pause();
                alarmSound.currentTime = 0;
                clockElement.style.color = '';
                alarmTriggered = false;
            }, 60000);
        }
    }
}

setInterval(updateClock, 1000);

updateClock();

const hourInput = document.getElementById('hourInput');
const minuteInput = document.getElementById('minuteInput');

function setAlarm() {
    const hour = validateInput(hourInput, /^[0-9]{2}$/);
    const minute = validateInput(minuteInput, /^[0-9]{2}$/);
    
    if (hour === null || minute === null) {
        const alarmOutput = document.getElementById('alarmOutput');
        alarmOutput.textContent = '';
        return;
    }
    hourInput.value = '';
    minuteInput.value = '';
    
    hourInput.style.borderColor = '';
    minuteInput.style.borderColor = '';

    const alarmOutput = document.getElementById('alarmOutput');
    alarmOutput.textContent = `${hour}:${minute}`;

    const timeString = `${hour}:${minute}`;
}

function validateInput(inputElement, regex) {
    const input = inputElement.value;

    if (regex.test(input)) {
        inputElement.style.borderColor = '';
        return input;
    } else {
        inputElement.style.borderColor = 'red';
        return null;
    }
}