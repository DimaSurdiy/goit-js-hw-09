import '../css/timer.css';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  input: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};
let selectedDate = null;

disableStartBtn();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0].getTime();
    const timeDifference = selectedDate - Date.now();

    if (timeDifference <= 0) {
      Notify.failure('Please choose a date in the future');
      return;
    }

    Notify.success('You were choose the right date!');
    enableStartBtn();
    disableInput();
  },
};
const fp = flatpickr(refs.input, options); // flatpickr

refs.startBtn.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
  const intervalId = setInterval(() => {
    const currentTime = Date.now();
    const { days, hours, minutes, seconds } = convertMs(selectedDate - currentTime);

    if ((days === 0) & (hours === 0) & (minutes === 0) & (seconds === 0)) {
      clearInterval(intervalId);
    }

    refs.days.textContent = addLeadingZero(days.toString());
    refs.hours.textContent = addLeadingZero(hours.toString());
    refs.minutes.textContent = addLeadingZero(minutes.toString());
    refs.seconds.textContent = addLeadingZero(seconds.toString());
  }, 1000);

  disableStartBtn();
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day); // Remaining days
  const hours = Math.floor((ms % day) / hour); // Remaining hours
  const minutes = Math.floor(((ms % day) % hour) / minute); // Remaining minutes
  const seconds = Math.floor((((ms % day) % hour) % minute) / second); // Remaining seconds

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.padStart(2, 0);
}

function disableStartBtn() {
  refs.startBtn.disabled = true;
}

function enableStartBtn() {
  refs.startBtn.disabled = false;
}

function disableInput() {
  refs.input.disabled = true;
}
