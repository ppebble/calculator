import { evaluatePostfix, infixToPostfix, operatorMap } from "./postfix.js";

export class Calculator {
  constructor() {
    this.currentInput = "0";
    this.fullExpression = "";
    this.resetInput = false;
    this.lastOperator = null;
  }
  appendNumber(num) {
    if (this.resetInput || this.currentInput === "0") {
      this.currentInput = num;
      this.resetInput = false;
    } else {
      this.currentInput += num;
    }
    return this.currentInput;
  }
  appendOperator(op) {
    const convertOp = operatorMap[op] || op;
    if (this.currentInput !== "0" && !this.resetInput) {
      this.fullExpression += this.currentInput;
    }
    this.fullExpression += convertOp;
    this.resetInput = true;
    this.lastOperator = convertOp;
    return this.fullExpression;
  }

  appendBracket(bracket) {
    if (bracket === "(") {
      if (this.currentInput !== "0" && !this.resetInput) {
        this.fullExpression += this.currentInput;
      }
      this.fullExpression += "(";
    } else {
      if (!this.resetInput && this.currentInput !== "0") {
        this.fullExpression += this.currentInput;
      }
      this.fullExpression += ")";
    }
    this.resetInput = false;
    this.currentInput = "0";
    return this.fullExpression;
  }
  appendDecimal() {
    if (this.resetInput) {
      this.currentInput = "0.";
      this.resetInput = false;
    } else if (!this.currentInput.includes(".")) {
      this.currentInput += ".";
    }
  }
  handleBackSpace() {
    if (this.resetInput) return;
    if (this.currentInput.length > 1) {
      this.currentInput = this.currentInput.slice(0, -1);
    } else {
      this.currentInput = "0";
    }
    return this.currentInput;
  }
  clearAll() {
    this.currentInput = "0";
    this.fullExpression = "";
    this.resetInput = false;
    this.lastOperator = null;
  }

  calculate() {
    try {
      if (!this.resetInput && this.currentInput !== "0") {
        this.fullExpression += this.currentInput;
      }
      if (this.fullExpression.trim() === "") {
        return this.currentInput;
      }
      const result = this.calculatePostfix(this.fullExpression);
      this.currentInput = result.toString();
      this.fullExpression = "";
      this.resetInput = true;
      return result;
    } catch (e) {
      return "Error";
    }
  }
  calculatePostfix(exp) {
    try {
      const postfix = infixToPostfix(exp);
      const result = evaluatePostfix(postfix);
      console.log(result);
      return result;
    } catch (error) {
      console.error("Calculation error:", error);
      return "Error";
    }
  }
}
