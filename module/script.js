// module/script.js
import { Calculator } from "./calculator.js";

const calculator = new Calculator();
const display = document.getElementById("display");
const historyDisplay = document.getElementById("history");

function updateDisplay() {
  display.textContent = calculator.currentInput;
}

function updateHistory() {
  historyDisplay.textContent = calculator.fullExpression;
}

// 버튼 이벤트 핸들러
document.querySelectorAll(".button").forEach((button) => {
  button.addEventListener("click", () => {
    const text = button.textContent;

    if (!isNaN(text)) {
      calculator.appendNumber(text);
    } else if (text === "()") {
      const open = calculator.fullExpression.split("(").length;
      const close = calculator.fullExpression.split(")").length;
      calculator.appendBracket(open <= close ? "(" : ")");
    } else if (["+", "-", "×", "÷", "%"].includes(text)) {
      calculator.appendOperator(text);
    } else if (text === "＝") {
      calculator.calculate();
    } else if (text === "⌫") {
      calculator.handleBackSpace();
    } else if (text === "C") {
      calculator.clearAll();
    }
    updateDisplay();
    updateHistory();
  });
});

// 키보드 이벤트 핸들러
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey || e.altKey || e.metaKey || e.key === "F12") {
    return; // 기본 동작 유지
  }
  const handledKeys = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "+",
    "-",
    "*",
    "/",
    "%",
    "(",
    ")",
    "Enter",
    "Backspace",
    "Escape",
    ".",
  ];
  if (handledKeys.includes(e.key)) {
    e.preventDefault(); // 기본 동작 방지
    if (e.key >= "0" && e.key <= "9") {
      calculator.appendNumber(e.key);
    } else if (["+", "-", "*", "/", "%"].includes(e.key)) {
      const opMap = { "+": "＋", "-": "－", "*": "×", "/": "÷" };
      calculator.appendOperator(opMap[e.key] || e.key);
    } else if (e.key === "(" || e.key === ")") {
      calculator.appendBracket(e.key);
    } else if (e.key === "Enter") {
      calculator.calculate();
    } else if (e.key === "Backspace") {
      calculator.handleBackSpace();
    } else if (e.key === "Escape") {
      calculator.clearAll();
    } else if (e.key === ".") {
      calculator.appendDecimal();
    }
  }
  updateDisplay();
  updateHistory();
});
