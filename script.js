window.addEventListener("DOMContentLoaded", function () {
  const display = document.querySelector(".input");
  const buttons = document.querySelectorAll(".button");
  // 입력값
  let currentInput = "0";
  // 이전 결과값
  let previousInput = "";
  // 지금 수행할 연산
  let operator = null;
  // Input 초기화 여부
  let resetInput = false;
  function updateDisplay() {
    display.value = currentInput;
  }
  function handleNumber(number) {
    if (currentInput === "0" || resetInput) {
      currentInput = number;
      resetInput = false;
      return;
    }
    currentInput += number;
    updateDisplay();
  }
  // 소수점 처리
  function handleDecimal() {
    console.log("decimal");
    if (resetInput) {
      currentInput = "0.";
      resetInput = false;
    }
    if (!currentInput.includes(".")) {
      currentInput += ".";
    }
    updateDisplay();
  }
  function handleClear() {
    currentInput = "0";
    previousInput = "";
    operator = null;
    resetInput = false;
  }
  function handleOperator(op) {
    // 연산기호를 누르면 현재 input값으로 계산함
    debugger;
    if (operator !== null && !resetInput) {
      calculate();
    }
    // 첫 번째 연산자 입력 시 previousInput에 현재 값 저장
    if (operator === null || resetInput) {
      previousInput = currentInput;
    }
    operator = op;
    resetInput = true;
    updateDisplay();
  }
  function isNumberKey(e) {
    const exp = e.key;
    const regex = /^[0-9+\-*/.]+$/;
    return regex.test(exp);
  }
  function calculate() {
    if (
      operator === null ||
      previousInput === "" ||
      currentInput === "" ||
      resetInput
    ) {
      handleClear();
      // Clear 처리를 위해 ...
      setTimeout(() => {
        throw new Error("수식이 올바르지 않습니다");
      }, 100);
    }
    let result;
    const firstOperand = parseFloat(previousInput);
    const secondOperand = parseFloat(currentInput);

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
    result.toFixed(2);
    console.log(`${firstOperand} ${operator} ${secondOperand} = ${result}`);
    currentInput = result.toString();
    previousInput = currentInput;
    resetInput = true;
    operator = null;
    updateDisplay();
  }
  //버튼 이벤트
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const buttonType = this.classList.contains("number") ? "number" : "";
      const buttonText = this.querySelector(".button-text").textContent;
      switch (buttonText) {
        case "C": //clear
          handleClear();
          break;
        case "±": // 부호반전
          console.log("inversion");
          currentInput = (parseFloat(currentInput) * -1).toString();
          break;
        case ".":
          handleDecimal();
          break;
        case "＝":
          calculate();
          resetInput = true;
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
          if (buttonType === "number") {
            handleNumber(buttonText);
          }
          break;
      }
      updateDisplay();
    });
  });

  //키보드 이벤트
  this.addEventListener("keyup", function (e) {
    console.log(isNumberKey(e));
    if (!isNumberKey(e)) {
      handleClear();
      updateDisplay();
    }
    // 계산기에서 끝까지 Backspace 누를 경우 0추가
    if (e.key === "Backspace") {
      console.log(currentInput);
      if (currentInput.length <= 1) {
        currentInput = "0";
      } else {
        currentInput = currentInput.slice(0, -1);
      }
    }
    if (e.key === "0" && currentInput.length < 1) {
      return;
    }
    if (e.key >= "0" && e.key <= "9") {
      // 현재 숫자가 0이거나 초기화 상태일 경우 핸들링
      if (currentInput === "0" || resetInput) {
        currentInput = e.key;
        resetInput = false;
        console.log(currentInput);
        updateDisplay();
        return;
      }
      console.log(display.value);
      currentInput += e.key;
      console.log(currentInput);
      // 소수점일경우
    }
    if (e.key === ".") {
      handleDecimal();
    }
    // 연산자일 경우
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
    }
    //엔터키 처리
    if (e.key === "Enter") {
      // 계산
      calculate();
      resetInput = true;
    }
  });
  // 커서처리
  display.addEventListener("click", function () {
    display.focus();
    const tmp = this.value;
    this.value = "";
    this.value = tmp;
  });
  updateDisplay();
});
