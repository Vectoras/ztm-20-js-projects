// cached DOM elements
const calculatorDisplay = document.querySelector("h1");
const inputBtns = document.querySelectorAll("button");
const clearBtn = document.querySelector("#clear-btn");

// calculation logic object
const calculate = {
  "/": (x, y) => x / y,
  "*": (x, y) => x * y,
  "+": (x, y) => x + y,
  "-": (x, y) => x - y,
  "=": (x, y) => y,
};

// Global Values
let firstValue = 0;
let operatorValue = "";
let awaitingNextValue = false;

// add number function
function sendNumberValue(e) {
  // If the current display value is 0, replace it, if not add number
  const number = e.currentTarget.value;
  const diplayValue = calculatorDisplay.textContent;
  calculatorDisplay.textContent = diplayValue === "0" ? number : `${diplayValue}${number}`;
}

// add decimal function
function addDecimal() {
  const diplayValue = calculatorDisplay.textContent;
  calculatorDisplay.textContent = diplayValue.includes(".") ? diplayValue : `${diplayValue}.`;
}

// use Operator function
function useOperator(e) {
  let operator = e.currentTarget.value;

  if (!awaitingNextValue) {
    awaitingNextValue = true;
    firstValue = Number(calculatorDisplay.textContent);
    operatorValue = operator;
    calculatorDisplay.textContent = "0";
  } else {
    const currentValue = Number(calculatorDisplay.textContent);
    if (operator !== "=") {
      firstValue = calculate[operatorValue](firstValue, currentValue);
      operatorValue = operator;
      calculatorDisplay.textContent = "0";
    } else {
      awaitingNextValue = true;
      calculatorDisplay.textContent = calculate[operatorValue](firstValue, currentValue);
      operatorValue = operator;
    }
  }
}

// Add Event Listeners to numbers, operators, decimal buttons
inputBtns.forEach((inputBtn) => {
  if (inputBtn.classList.length === 0) {
    inputBtn.addEventListener("click", sendNumberValue);
  } else if (inputBtn.classList.contains("operator")) {
    inputBtn.addEventListener("click", useOperator);
  } else if (inputBtn.classList.contains("decimal")) {
    inputBtn.addEventListener("click", addDecimal);
  }
});

// reset all function
function resetAll() {
  calculatorDisplay.textContent = "0";
  awaitingNextValue = false;
  // firstValue = 0;
  // operatorValue = "";
}

// Event Listener for Clear button
clearBtn.addEventListener("click", resetAll);
