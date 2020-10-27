const answer = document.getElementById("answer");
var display = 0;
let prev;
let operator;

function displayAnswer() {
  answer.innerHTML = display;
}

function displayCurrent(curr) {
  if (operator === equals) {
    prev = 0;
    operator = null;
    display = curr;
  } else {
    display = display * 10 + curr;
  }
  displayAnswer();
}

function add(p1, p2) {
  return p1 + p2;
}

function sub(p1, p2) {
  return p1 - p2;
}

function mult(p1, p2) {
  return p1 * p2;
}

function div(p1, p2) {
  return p1 / p2;
}

function clear() {
  display = 0;
  prev = 0;
  operator = null;
  displayAnswer();
}

function back() {
  display = Math.floor(display / 10);
  displayAnswer();
}

function updatePrev() {
  prev = display;
  display = 0;
}

function setOperator(op) {
  if (operator && op !== 0) {
    display = operator(prev, display);
    displayAnswer();
  }
  switch (op) {
    case 0:
      equals();
      operator = equals;
      break;
    case 1:
      updatePrev();
      operator = div;
      break;
    case 2:
      updatePrev();
      operator = mult;
      break;
    case 3:
      updatePrev();
      operator = sub;
      break;
    case 4:
      updatePrev();
      operator = add;
      break;
  }
}

function equals() {
  if (operator && operator !== equals) {
    display = operator(prev, display);
  }
  displayAnswer();
}

function script() {
  // other
  document.getElementById("clear").addEventListener("click", clear);
  document.getElementById("back").addEventListener("click", back);

  // digits
  for (let val = 0; val <= 9; val++) {
    document
      .getElementById("digit-" + val)
      .addEventListener("click", function () {
        displayCurrent(val);
      });
  }

  // operators
  for (let opVal = 0; opVal <= 4; opVal++) {
    document
      .getElementById("op-" + opVal)
      .addEventListener("click", function () {
        setOperator(opVal);
      });
  }
}

window.addEventListener("DOMContentLoaded", (event) => {
  script();
});
