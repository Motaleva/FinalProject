const numResult = document.querySelector('.NumResault');
const calcBtns = document.querySelector('.calcBtns');

let currentExpression = '';
let shouldResetScreen = false;
let previousResult = '';

function resetAll() {
  numResult.value = '0';
  currentExpression = '';
  previousResult = '';
  shouldResetScreen = false;
}

function deleteLastNum() {
  currentExpression = currentExpression.toString().slice(0, -1);
  if (currentExpression === '') {
    currentExpression = '0';
  }
}

function deleteAllNums() {
  currentExpression = '0';
}

function appendNum(num) {
  if (currentExpression === '0' || shouldResetScreen) {
    currentExpression = num;
    shouldResetScreen = false;
  } else {
    currentExpression += num;
  }
}

function setOperator(op) {
  if (currentExpression === '') {
    return;
  }
  if (currentExpression !== '0' && shouldResetScreen) {
    currentExpression = currentExpression.slice(0, -1);
  }
  if (previousResult !== '') {
    currentExpression = previousResult + op;
    previousResult = '';
  } else {
    currentExpression += op;
  }
  shouldResetScreen = false;
}

function evaluate() {
  if (currentExpression === '') {
    return;
  }
  if (currentExpression.includes('%')) {
    currentExpression = currentExpression.replace(/([0-9.]+)%/g, function(match, capture) {
      return parseFloat(capture) / 100;
    });
  }
  const result = Function('return ' + currentExpression.replaceAll('x', '*').replaceAll('÷', '/'))();
  previousResult = result.toString();
  currentExpression = previousResult;
  shouldResetScreen = true;
}

calcBtns.addEventListener('click', (event) => {
  if (!event.target.matches('button')) {
    return;
  }

  const btn = event.target;
  const btnValue = btn.textContent;

  switch (btnValue) {
    case '+':
    case '-':
    case 'x':
    case '÷':
    case '%':
      setOperator(btnValue);
      break;
    case '=':
      evaluate();
      break;
    case 'C':
      resetAll();
      break;
    case '←':
      deleteLastNum();
      break;
    case '.':
      if (currentExpression.slice(-1) === '.') {
        return;
      }
      appendNum('.');
      break;
    default:
      appendNum(btnValue);
      break;
  }

  numResult.value = currentExpression;
});
function appendNum(num) {
  if (num === '(' && !isNaN(currentExpression.slice(-1))) {
    currentExpression += 'x' + num;
  } else if (currentExpression === '0' || shouldResetScreen) {
    currentExpression = num;
    shouldResetScreen = false;
  } else {
    currentExpression += num;
  }
}
