import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

let intervalID;
const timerElements = {
  startButton: document.querySelector('[data-start]'),
  timerDays: document.querySelector('[data-days]'),
  timerHours: document.querySelector('[data-hours]'),
  timerMinutes: document.querySelector('[data-minutes]'),
  timerSeconds: document.querySelector('[data-seconds]'),
};
timerElements.startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      return Notiflix.Notify.failure('Please choose a date in the future');
    }
    clearInterval(intervalID);
    timerElements.startButton.disabled = false;
    timerElements.startButton.addEventListener('click', onPressStartButton);

    function onPressStartButton() {
      intervalID = setInterval(() => {
        const period = selectedDates[0] - new Date();

        if (period < 1000) {
          clearInterval(intervalID);
          Notiflix.Notify.warning('Time is over');
        }

        const timer = convertMs(period);
        timeUpdater(timer);
      }, 1000);
    }
  },
};

flatpickr('#datetime-picker', options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  const timeVal = `${value}`;
  return timeVal.padStart(2, '0');
}
function timeUpdater({ days, hours, minutes, seconds }) {
  timerElements.timerDays.textContent = `${days}`;
  timerElements.timerHours.textContent = `${hours}`;
  timerElements.timerMinutes.textContent = `${minutes}`;
  timerElements.timerSeconds.textContent = `${seconds}`;
}
