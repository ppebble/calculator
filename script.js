window.addEventListener("load", function () {
  const display = document.getElementById("display");
  const historyDisplay = document.getElementById("history");
  const buttons = document.querySelectorAll(".button");

  let currentInput = "0";
  let previousInput = "";
  let operator = null;
  let resetInput = false;
  let calculationHistory = "";
  function updateDisplay() {
    display.textContent = currentInput;
    display.scrollLeft = display.scrollWidth;
  }

  function updateHistory() {
    historyDisplay.textContent = calculationHistory;
  }

  function handleNumber(number) {
    if (currentInput === "0" || resetInput) {
      currentInput = number;
      resetInput = false;
    } else {
      currentInput += number;
    }
    updateDisplay();
  }

  function handleDecimal() {
    if (resetInput) {
      currentInput = "0.";
      resetInput = false;
    } else if (!currentInput.includes(".")) {
      currentInput += ".";
    }
    updateDisplay();
  }

  function handleClear() {
    currentInput = "0";
    previousInput = "";
    operator = null;
    resetInput = false;
    calculationHistory = "";
    updateDisplay();
    updateHistory();
  }

  function handleOperator(op) {
    if (operator !== null && !resetInput) {
      calculate();
    }

    if (operator === null || resetInput) {
      previousInput = currentInput;
    }

    operator = op;
    calculationHistory = `${previousInput} ${operator}`;
    resetInput = true;
    updateDisplay();
    updateHistory();
  }

  function calculate() {
    if (operator === null || previousInput === "") return;

    const secondOperand = parseFloat(currentInput);
    if (isNaN(secondOperand)) return;

    const firstOperand = parseFloat(previousInput);
    let result;

    switch (operator) {
      case "＋":
        result = firstOperand + secondOperand;
        break;
      case "－":
        result = firstOperand - secondOperand;
        break;
      case "×":
        result = firstOperand * secondOperand;
        break;
      case "÷":
        result = firstOperand / secondOperand;
        break;
      case "%":
        result = firstOperand % secondOperand;
        break;
      default:
        return;
    }

    currentInput = result.toString();
    calculationHistory = `${previousInput} ${operator} ${secondOperand} =`;
    previousInput = currentInput;
    operator = null;
    resetInput = true;
    updateDisplay();
    updateHistory();
  }

  // 버튼 이벤트
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const buttonText = this.textContent;

      switch (buttonText) {
        case "C":
          handleClear();
          break;
        case "±":
          currentInput = (parseFloat(currentInput) * -1).toString();
          updateDisplay();
          break;
        case ".":
          handleDecimal();
          break;
        case "＝":
          calculate();
          break;
        case "()":
        case "＋":
        case "－":
        case "×":
        case "÷":
        case "%":
          handleOperator(buttonText);
          break;
        default:
          if (!isNaN(buttonText)) handleNumber(buttonText);
          break;
      }
    });
  });

  // 키보드 이벤트
  this.document.addEventListener("keyup", function (e) {
    e.preventDefault();
    console.log(e.key);
    if (e.key === "Backspace") {
      if (currentInput.length <= 1) {
        currentInput = "0";
      } else {
        currentInput = currentInput.slice(0, -1);
      }
      updateDisplay();
      return;
    }

    if (e.key >= "0" && e.key <= "9") {
      if (resetInput) {
        currentInput = e.key;
        resetInput = false;
      } else if (currentInput === "0") {
        currentInput = e.key;
      } else {
        currentInput += e.key;
      }
      updateDisplay();
      return;
    }

    if (e.key === ".") {
      handleDecimal();
      return;
    }

    if (["+", "-", "*", "/", "%"].includes(e.key)) {
      let op;
      switch (e.key) {
        case "+":
          op = "＋";
          break;
        case "-":
          op = "－";
          break;
        case "*":
          op = "×";
          break;
        case "/":
          op = "÷";
          break;
        case "%":
          op = "%";
          break;
      }
      handleOperator(op);
      return;
    }

    if (e.key === "Enter" || e.key === "=") {
      calculate();
      return;
    }
  });
});
