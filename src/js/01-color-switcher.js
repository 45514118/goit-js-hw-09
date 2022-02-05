const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const body = document.querySelector('body');
let colorID;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

startButton.addEventListener('click', onPressStartButton);

function onPressStartButton() {
  startButton.disabled = true;
  colorID = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

stopButton.addEventListener('click', onPressStopButton);
function onPressStopButton() {
  startButton.disabled = false;
  clearInterval(colorID);
}
