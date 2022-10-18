// DOM manipulation
let modeButtons = document.querySelectorAll('.mode-btn');
let allButtons = document.querySelectorAll('button');
let body = document.querySelector('body');
let main = document.querySelector('main');
let displayContainer = document.querySelector('.display-container');

let lightText = 'white';
let darkText = 'black';
let lightBackground = 'white';
let grayBackground = '#efefef';
let darkBackground = '#111111';
let grayBorder = 'gray';
let blackBorder = 'black';

modeButtons.forEach(item => {
  item.addEventListener('click', event => {
    console.log("NUEVO MODE CLICK", item.textContent);
    if (item.textContent.startsWith('Light')) {
      body.style.background = lightBackground;
      main.style.background = lightBackground;
      allButtons.forEach(item => {
        item.style.background = grayBackground;
        item.style.color = darkText;
      })
      displayContainer.style.background = lightBackground;
      displayContainer.style.borderColor = blackBorder;
      displayContent.style.color = darkText;
    }
    if(item.textContent.startsWith('Dark')) {
      body.style.background = darkBackground;
      main.style.background = darkBackground;
      allButtons.forEach(item => {
        item.style.background = darkBackground;
        item.style.color = lightText;
      })
      displayContainer.style.background = darkBackground;
      displayContainer.style.borderColor = grayBorder;
      displayContent.style.color = lightText;
    }
    if(item.textContent.startsWith('Crazy')){
      body.style.backgroundColor = darkBackground;
      main.style.background = crazyGradient()
      displayContainer.style.background = crazyGradient();
      displayContainer.style.borderStyle = 'outset';
      displayContainer.style.borderColor = 'buttonborder';
      displayContainer.style.borderWidth = '0.5px';
      displayContent.style.color = crazyColors();
      allButtons.forEach(item => {
        item.style.background = crazyGradient();
        item.style.color = crazyColors();
      })
    }
  })
})

function randomNumber(number) {
  if(number == 1) {
    return Math.random()*number;
  } else {
    return Math.floor(Math.random()*number);
  }
}

function crazyColors() {
  let randomColor = `rgb(${randomNumber(256)}, ${randomNumber(256)}, ${randomNumber(256)})`
  return randomColor;
}

function crazyGradient() {
  let randomGradient = `linear-gradient(${randomNumber(360)}deg, rgba(${randomNumber(256)},${randomNumber(256)},${randomNumber(256)},${randomNumber(1)}) 0%, rgba(${randomNumber(256)},${randomNumber(256)},${randomNumber(256)},${randomNumber(1)}) 35%, rgba(${randomNumber(256)},${randomNumber(256)},${randomNumber(256)},${randomNumber(1)}) 100%)`
  console.log(randomGradient)
  return randomGradient;
}