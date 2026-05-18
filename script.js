const currentValueEl = document.getElementById('current-value');
const expressionEl = document.getElementById('expression');

let currentInput = '0';
let operator = null;
let firstNumber = null;
let resultShown = false;

const opSymbols = { '+': '+', '-': '−', '*': '×', '/': '÷' };

function updateDisplay(value) {
    currentValueEl.textContent = value;
    if (value.length > 12) {
        currentValueEl.style.fontSize = '1.2rem';
    } else if (value.length > 8) {
        currentValueEl.style.fontSize = '1.8rem';
    } else {
        currentValueEl.style.fontSize = '2.5rem';
    }
}

function updateExpression(text) {
    expressionEl.textContent = text;
}

function handleNumber(value) {
    if (resultShown) {
        currentInput = value;
        resultShown = false;
        updateExpression('');
    } else if (currentInput === '0' || currentInput === 'Error') {
        currentInput = value;
    } else {
        currentInput += value;
    }
    if (operator !== null && firstNumber !== null) {
        updateExpression(`${firstNumber} ${opSymbols[operator]} ${currentInput}`);
    }
    updateDisplay(currentInput);
}

function handleOperator(op) {
    if (currentInput === 'Error') return;

    if (firstNumber !== null && !resultShown && currentInput !== '0') {
        const result = calculate(firstNumber, operator, currentInput);
        if (result === null) return;
        firstNumber = String(result);
        currentInput = '0';
        updateDisplay(firstNumber);
    } else if (firstNumber === null || resultShown) {
        firstNumber = currentInput;
        currentInput = '0';
        resultShown = false;
    }

    operator = op;
    updateExpression(`${firstNumber} ${opSymbols[op]}`);
}

function calculate(a, op, b) {
    const num1 = parseFloat(a);
    const num2 = parseFloat(b);

    if (isNaN(num1) || isNaN(num2)) return null;

    let result;
    switch (op) {
        case '+': result = num1 + num2; break;
        case '-': result = num1 - num2; break;
        case '*': result = num1 * num2; break;
        case '/':
            if (num2 === 0) {
                currentInput = 'Error';
                firstNumber = null;
                operator = null;
                resultShown = false;
                updateDisplay('Error');
                updateExpression('');
                return null;
            }
            result = num1 / num2;
            break;
        default: return null;
    }

    return parseFloat(result.toPrecision(10));
}

function handleEquals() {
    if (firstNumber === null || operator === null || currentInput === 'Error') return;

    const exprText = `${firstNumber} ${opSymbols[operator]} ${currentInput} =`;
    const result = calculate(firstNumber, operator, currentInput);
    if (result === null) return;

    currentInput = String(result);
    firstNumber = null;
    operator = null;
    resultShown = true;
    updateExpression(exprText);
    updateDisplay(currentInput);
}

function handleClear() {
    currentInput = '0';
    operator = null;
    firstNumber = null;
    resultShown = false;
    updateDisplay('0');
    updateExpression('');
}

function handleDelete() {
    if (currentInput === 'Error' || resultShown) {
        handleClear();
        return;
    }
    currentInput = currentInput.length <= 1 ? '0' : currentInput.slice(0, -1);
    if (operator !== null && firstNumber !== null) {
        updateExpression(`${firstNumber} ${opSymbols[operator]} ${currentInput}`);
    }
    updateDisplay(currentInput);
}

function handleDecimal() {
    if (resultShown) {
        currentInput = '0.';
        resultShown = false;
        updateExpression('');
        updateDisplay(currentInput);
        return;
    }
    if (currentInput === 'Error') {
        currentInput = '0.';
        updateExpression('');
        updateDisplay(currentInput);
        return;
    }
    if (!currentInput.includes('.')) {
        currentInput += '.';
        if (operator !== null && firstNumber !== null) {
            updateExpression(`${firstNumber} ${opSymbols[operator]} ${currentInput}`);
        }
        updateDisplay(currentInput);
    }
}

document.querySelectorAll('button[data-value]').forEach(function (button) {
    button.addEventListener('click', function () {
        const value = button.dataset.value;

        if (value >= '0' && value <= '9') {
            handleNumber(value);
        } else if (value === '+' || value === '-' || value === '*' || value === '/') {
            handleOperator(value);
        } else if (value === '=') {
            handleEquals();
        } else if (value === 'C') {
            handleClear();
        } else if (value === 'DEL') {
            handleDelete();
        } else if (value === '.') {
            handleDecimal();
        }
    });
});

updateDisplay('0');
updateExpression('');
