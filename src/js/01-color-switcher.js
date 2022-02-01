const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};
let timerId = null;

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);

refs.stopBtn.setAttribute('disabled', '');

function onStartBtnClick() {
  refs.startBtn.setAttribute('disabled', '');
  refs.stopBtn.removeAttribute('disabled');

  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStopBtnClick() {
  refs.startBtn.removeAttribute('disabled');
  refs.stopBtn.setAttribute('disabled', '');
  clearInterval(timerId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
