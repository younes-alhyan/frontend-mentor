const toggle = document.querySelector(".toggle");

toggle.addEventListener("click", () => {
  let state = parseInt(toggle.getAttribute("data-state"), 10);
  let nextState = state === 3 ? 1 : state + 1; // Cycle between 1 → 2 → 3 → 1
  toggle.setAttribute("data-state", nextState);
  document.body.className = nextState === 1 ? `` : `theme${nextState}`;
});

const buttons = document.querySelectorAll(".button");
const result = document.getElementById('result');
const reset = document.getElementById('reset');
const del = document.getElementById('del');
const equal = document.getElementById('equal');

function calculateResult(expression) {
  try {
    const calculated = eval(expression);  // Eval to calculate expression
    return isFinite(calculated) ? calculated : 'Error';  // Check if the result is a valid number
  } catch (error) {
    console.error("Error evaluating the expression:", error);
    return 'Error';  // Return Error if eval fails
  }
}

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    // Clear screen when an error is displayed
    if (result.textContent === 'Error' || result.textContent === 'NaN') {
      result.textContent = '';
    }
  });

  if (button.id) {
    return;
  }

  button.addEventListener('click', () => {
    // Append the button's text to result
    result.textContent += button.textContent.replace('.', ',');
  });
});

reset.addEventListener('click', () => {
  result.textContent = '';
});

del.addEventListener('click', () => {
  result.textContent = result.textContent.length > 0 ? result.textContent.slice(0, -1) : result.textContent;
});

equal.addEventListener('click', () => {
  const expression = result.textContent.replace(/,/g, '.').replace(/x/g, '*');  // Convert commas back to dots and x to multiplication
  result.textContent = calculateResult(expression);
});
