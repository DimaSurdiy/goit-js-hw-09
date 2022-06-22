const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};
let intervalId = null;

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);

disableStopBtn();

function onStartBtnClick() {
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  disableStartBtn();
  enableStopBtn();
}

function onStopBtnClick() {
  clearInterval(intervalId);
  disableStopBtn();
  enableStartBtn();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function enableStartBtn() {
  refs.startBtn.disabled = false;
}

function disableStartBtn() {
  refs.startBtn.disabled = true;
}

function enableStopBtn() {
  refs.stopBtn.disabled = false;
}

function disableStopBtn() {
  refs.stopBtn.disabled = true;
}
