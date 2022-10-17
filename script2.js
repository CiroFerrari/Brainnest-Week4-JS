

let displayContent = document.querySelector('.display-content');

let allbuttons = document.querySelectorAll('button');


let toDisplay = "";
let paramA = undefined;
let paramB = undefined;
let operation;
let tempNumber = "";

allbuttons.forEach( item => {
  item.addEventListener('click', event => {
    toDisplay += item.textContent;
    displayContent.textContent = toDisplay;
    if(numbers.includes(item.textContent)) {
      tempNumber += item.textContent;
    }
    if(operations.includes(item.textContent)) {
      if(paramA==undefined) {
        paramA = Number(tempNumber);
        tempNumber = "";
      } else {
        paramB = Number(tempNumber);
        tempNumber = "";

      }
    }
    if(item.textContent == '+') {
      operation = "+";
    }
    if(item.textContent == '-') {
      operation = "-";
    }
    if(item.textContent == '*') {
      operation = "*";
    }
    if(item.textContent == '/') {
      operation = "/";
    }
    if(paramA && operation && paramB) {
      switch (operation) {
        case '+':
          paramA = sum(paramA, paramB);
          paramB = 0;
          toDisplay = `${paramA}`;
          displayContent.textContent = toDisplay;
          break;
      }
    }
    console.log("toDisplay ", toDisplay);

  })
})


function sum(a = 0, b = 0) {
  return a + b;
}

function sub(a = 0, b = 0) {
  return a - b;
}

function mult(a = 0, b = 1) {
  return a * b;
}

function div(a = 0, b = 1) {
  return a / b;
}