// Arrays declaration
let operations = ["+", "-", "*", "/"];
let numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

// DOM manipulation
let displayContent = document.querySelector('.display-content');
let allButtons = document.querySelectorAll('button');

// Variables declaration
let sentence = [];
let toDisplay = "";
let paramA;
let paramB;
let prevOperation = "";
let nextOperation = "";
let operationCount = 0;

allButtons.forEach(item => {
  item.addEventListener('click', event => {
    console.log("NUEVO CLICK")
    sentence.push(item.textContent);
    sentence = dataEntry(sentence, item.textContent);
    toDisplay = sentence.join('');
    if(toDisplay == "") {
      toDisplay = "0";
    } else if (toDisplay == "Syntax error") {
      sentence.splice(0);
    }
    displayContent.textContent = toDisplay;
  })
})

// User input check
function dataEntry(totalInputs, currentInput) {
  // If user inserts CLEAR, it clears the array
  if(currentInput == "CLEAR") {
    console.log(totalInputs)
    prevOperation = "";
    nextOperation = "";
    operationCount = 0;
    totalInputs.splice(0);
    return totalInputs;
  }
  // If user inserts an operation, the counter operation ++
  if(operations.includes(currentInput)) {
    operationCount++;
    if(operationCount == 1) {
      prevOperation = currentInput;
      nextOperation = currentInput;
    } else if (operationCount == 2) {
      nextOperation = currentInput;
    }
  }
  // If the first input is an operation, the first number is set in 0
  console.log(totalInputs, currentInput, operationCount, prevOperation, nextOperation);
  if (totalInputs.length == 1) {
    if (operations.includes(currentInput)) {
      totalInputs.unshift("0");
      console.log(totalInputs);
      return totalInputs;
    } else if (numbers.includes(currentInput)) {
      console.log(totalInputs);
      return totalInputs;
    }
  }
  // If inserts "=" without operation will dismiss the input, with operation will calculate the result
  if (currentInput == "=" && operationCount == 0) {
    totalInputs.pop();
    console.log(totalInputs);
    return totalInputs;
  } else if (currentInput == "=" && operationCount == 1) {
    if(operations.includes(totalInputs[totalInputs.length-2])) {
      totalInputs.pop();
      console.log(totalInputs);
      return totalInputs;
    } else if (numbers.includes(totalInputs[totalInputs.length-2])) {
      prevOperation = nextOperation;
      setParams(totalInputs, prevOperation, nextOperation);
      let result = operationResult(paramA, paramB, prevOperation).toString();
      result = Array.from(result);
      totalInputs = result;
      operationCount = 0;
  //    totalInputs.push(prevOperation)
      console.log(totalInputs)
      return totalInputs;
    }
  }
  // Si ingresa una operación y el último elemento ya era una operación, sólo deja la última ingresada
  if (operations.includes(currentInput) && operations.includes(totalInputs[totalInputs.length - 2])) {
    totalInputs[totalInputs.length - 2] = currentInput;
    prevOperation = currentInput;
    totalInputs.pop();
    operationCount--;
    console.log(totalInputs)
    return totalInputs;
  } else if((operations.includes(currentInput) && operationCount == 2)) {
    console.log("CALCULAR")
    setParams(totalInputs, prevOperation, nextOperation);
    let result = operationResult(paramA, paramB, prevOperation).toString();
    prevOperation = nextOperation;
    result = Array.from(result);
    totalInputs = result;
    totalInputs.push(prevOperation)
    operationCount--;
    console.log(totalInputs)
    return totalInputs;
  }
  return totalInputs;
}

function setParams(totalInput) {
  let operatorIndex = totalInput.indexOf(prevOperation);
  console.log(prevOperation)
  console.log(operatorIndex)
  paramA = totalInput.slice(0, operatorIndex).join('');
  console.log("Param A: ", paramA, totalInput);
  paramB = totalInput.slice(operatorIndex+1, totalInput.length-1).join('');
  console.log("Param B: ", paramB);
}

function operationResult(param1, param2, operation) {
  console.log(param1, operation, param2)
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
      if(param2 == 0) {
        return "Syntax error";
      } else {
        return div(param1, param2).toFixed(2);
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


/*
    if(paramA == undefined && operations.includes(item.textContent)) {
      if(toDisplay.length == 0){
        paramA = 0;
      } else {
        paramA = toDisplay;
      }
    } else if(paramA != undefined && operations.includes(item.textContent)) {
      let temp = Array.from(toDisplay);
      if(paramA != 0 && temp.length > paramA.length+1) {
        temp = temp.splice(paramA.length+1)
        paramB = temp.join('');
      } else if (paramA = 0 && temp.length > paramA.length+1) {
        temp = temp.splice(paramA.length);
        paramB = temp.join('');
      }
      if(paramB != "" && paramB != undefined) {
        paramA = operationResult(paramA, paramB, operation).toString();
        paramB = "";
        toDisplay = paramA + item.textContent;
      }
    }
    if(operations.includes(item.textContent)) {
      operation = item.textContent;
    }
    if(operations.includes(item.textContent) && operations.includes(toDisplay[toDisplay.length-1])) {
      let temp = Array.from(toDisplay);
      temp[temp.length-1] = item.textContent;
      toDisplay = temp.join('');
    } else {
      toDisplay += item.textContent;
    }
 */

/*  if (operations.includes(item.textContent) && operations.includes(sentence[sentence.length - 1])) {
    sentence[sentence.length - 1] = item.textContent;
  } else {
    sentence.push(item.textContent);
  }
  console.log("Sentence", sentence)
  if (operations.includes(item.textContent) && operation == "") {
    operationCount++;
    operation = item.textContent;
  } else if (operations.includes(item.textContent) && operation != "") {
    operationCount++;
    lastOperation = item.textContent;
  }
  if (operationCount == 2) {
    let temp = sentence;
    let operatorIndex;
    operatorIndex = temp.indexOf(operation);
    paramA = temp.slice(0, operatorIndex).join('');
    paramB = temp.slice(operatorIndex + 1, (temp.length - 1)).join('');
    console.log(temp)
    operationCount = 1;
    paramA = operationResult(paramA, paramB, operation).toString();
    paramB = undefined;
    operation = lastOperation;
    temp = paramA + operation;
    sentence = Array.from(temp);
  }
  toDisplay = sentence.join('');
  if (item.textContent === "=" && paramA == undefined) {
    console.log("Caso1", sentence)
    toDisplay = 0;
  } else if (item.textContent === "=" && paramA)
  {
    toDisplay = paramA;
  }*/
