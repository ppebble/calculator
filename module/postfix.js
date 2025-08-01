const precedence = { "＋": 2, "－": 2, "×": 3, "÷": 3, "%": 3 };
// 연산자 매핑 테이블
export const operatorMap = {
  "+": "＋",
  "-": "－",
  "*": "×",
  "/": "÷",
};

export function infixToPostfix(infix) {
  const output = [];
  const stack = [];
  const tokens = infix.match(/(\d+\.?\d*|[＋－×÷%()])/g) || [];
  for (const token of tokens) {
    if (operatorMap[token]) {
      token = operatorMap[token];
    }
    if (!isNaN(parseFloat(token))) {
      output.push(token);
    } else if (token === "(") {
      stack.push(token);
    } else if (token === ")") {
      while (stack.length && stack[stack.length - 1] !== "(") {
        output.push(stack.pop());
      }
      stack.pop();
    } else {
      while (
        stack.length &&
        precedence[stack[stack.length - 1]] >= precedence[token]
      ) {
        output.push(stack.pop());
      }
      stack.push(token);
    }
  }
  while (stack.length) {
    output.push(stack.pop());
  }
  console.log(output);
  return output;
}

export function evaluatePostfix(postfix) {
  const stack = [];
  for (const token of postfix) {
    if (!isNaN(parseFloat(token))) {
      stack.push(parseFloat(token));
    } else {
      const b = stack.pop();
      const a = stack.pop();
      switch (token) {
        case "＋":
          stack.push(a + b);
          break;
        case "－":
          stack.push(a - b);
          break;
        case "×":
          stack.push(a * b);
          break;
        case "÷":
          stack.push(a / b);
          break;
        case "%":
          stack.push(a % b);
          break;
        default:
          throw new Error(`알 수 없는 연산자 : ${token}`);
      }
    }
  }
  if (stack.length !== 1) {
    throw new Error("잘못된 연산식");
  }
  console.log(stack);
  return stack.pop();
}
