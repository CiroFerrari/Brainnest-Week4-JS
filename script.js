// Arrays declaration
let operations = ["+", "-", "*", "/"];
let numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

// DOM manipulation
let displayContent = document.querySelector('.display-content');
let calcButtons = document.querySelectorAll('.calc-btn');

// Variables declaration
let sentence = [];
let toDisplay = "";
let paramA;
let paramB;
let prevOperation = "";
let nextOperation = "";
let operationCount = 0;

calcButtons.forEach(item => {
  item.addEventListener('click', event => {
    sentence.push(item.textContent);
    sentence = dataEntry(sentence);
    toDisplay = sentence.join('');
    if (toDisplay == "") {
      toDisplay = "0";
    } else if (toDisplay == "Syntax error") {
      sentence.splice(0);
    } else if (toDisplay.indexOf('.') != -1) {
      let tempResult = Array.from(toDisplay);
      while (tempResult[tempResult.length - 1] == 0) {
        tempResult.pop();
      }
      tempResult.pop();
      toDisplay = tempResult.join('')
    }
    displayContent.textContent = toDisplay;
  })
})

// User input check
function dataEntry(totalInputs) {
  let currentInput = totalInputs[totalInputs.length - 1];
  // If user inserts '0' at the first place, dismiss the input
  if (currentInput == '0' && totalInputs.length == 1) {
    totalInputs.pop();
    return totalInputs;
  }
  // If user inserts CLEAR, it clears the array
  if (currentInput == "CLEAR") {
    prevOperation = "";
    nextOperation = "";
    operationCount = 0;
    totalInputs.splice(0);
    return totalInputs;
  }
  // If user inserts an operation, the counter operation ++
  if (operations.includes(currentInput)) {
    operationCount++;
    if (operationCount == 1) {
      prevOperation = currentInput;
      nextOperation = currentInput;
    } else if (operationCount == 2) {
      nextOperation = currentInput;
    }
  }
  // If the first input is an operation, the first number 'paramA' is set to 0
  if (totalInputs.length == 1) {
    if (operations.includes(currentInput)) {
      totalInputs.unshift("0");
      return totalInputs;
    } else if (numbers.includes(currentInput)) {
      return totalInputs;
    }
  }
  // If inserts "=" without a previous operation will dismiss the input; with operation will calculate the result
  if (currentInput == "=" && operationCount == 0) {
    totalInputs.pop();
    return totalInputs;
  } else if (currentInput == "=" && operationCount == 1) {
    if (operations.includes(totalInputs[totalInputs.length - 2])) {
      totalInputs.pop();
      return totalInputs;
    } else if (numbers.includes(totalInputs[totalInputs.length - 2])) {
      setParams(totalInputs);
      let result = operationResult(paramA, paramB, prevOperation).toString();
      result = Array.from(result);
      totalInputs = result;
      operationCount = 0;
      return totalInputs;
    }
  }
  // If inserts an operation and the last element was already an operation, only let the last one
  if (operations.includes(currentInput) && operations.includes(totalInputs[totalInputs.length - 2])) {
    totalInputs[totalInputs.length - 2] = currentInput;
    prevOperation = currentInput;
    totalInputs.pop();
    operationCount--;
    return totalInputs;
  } else if ((operations.includes(currentInput) && operationCount == 2)) {
    setParams(totalInputs, prevOperation, nextOperation);
    let result = operationResult(paramA, paramB, prevOperation).toString();
    prevOperation = nextOperation;
    result = Array.from(result);
    totalInputs = result;
    totalInputs.push(prevOperation)
    operationCount--;
    return totalInputs;
  }
  return totalInputs;
}

function setParams(totalInput) {
  let operatorIndex = totalInput.indexOf(prevOperation);
  if (operatorIndex == 0) {
    for (let i = 0; i < totalInput.length; i++) {
      if (totalInput[i] == prevOperation) {
        operatorIndex = i;
      }
    }
  }
  paramA = totalInput.slice(0, operatorIndex).join('');
  paramB = totalInput.slice(operatorIndex + 1, totalInput.length - 1).join('');
}

function operationResult(param1, param2, operation) {
  param1 = Number(param1);
  param2 = Number(param2);
  switch (operation) {
    case '+':
      return sum(param1, param2);
      break;
    case '-':
      return sub(param1, param2);
      break;
    case '*':
      return mult(param1, param2);
      break;
    case '/':
      if (param2 == 0) {
        return "Syntax error";
      } else {
        return div(param1, param2).toFixed(6);
      }
      break;
  }
}

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