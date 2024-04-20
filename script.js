const calculator = {
    displayValue: '0',
    firstEnteredValue:  null,
    waitingForSecondValue: false,
    operator: null,
};

updateDisplay();

const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {
    console.log(event.target);
    const { target } = event;

    if (!target.matches('button')) {
        return;
    }

    if (target.classList.contains('operator')) {
        handleOperator(target.value);
        updateDisplay();
        return;
    }

    if (target.classList.contains('decimal')) {
        inputDecimal(target.value);
        updateDisplay();
        return;
    }

    if (target.classList.contains('all-clear')) {
        resetCalculator();
        updateDisplay();
        return;
    }

    inputDigit(target.value);
    updateDisplay();
});

function inputDigit(digit) { //didnt understand
    const { displayValue, waitingForSecondValue } = calculator;

    if (waitingForSecondValue == true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondValue = false;
    } else {
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }

    // const { displayValue } = calculator;
    // calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
}

function inputDecimal(dot){
    if (!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot;
    }
}

function handleOperator(nextOperator) {
    console.log('nextOperator', nextOperator)
    const { firstEnteredValue, displayValue, operator } = calculator
    const inputValue = parseFloat(displayValue);

    if (operator && calculator.waitingForSecondValue) {
        calculator.operator = nextOperator;
        
        return;
    }
    console.log('gectiiii')

    if (firstEnteredValue == null) {
        calculator.firstEnteredValue = inputValue;
        console.log('calculator.firstEnteredValue', calculator.firstEnteredValue)
    } else if (operator) {
        const currentValue = firstEnteredValue || 0;
        console.log('currentValue', currentValue)
        const result = performanceCalculation[operator](currentValue, inputValue)
        calculator.displayValue = String(result);
        calculator.firstEnteredValue = result;
    }

    calculator.waitingForSecondValue = true;
    calculator.operator = nextOperator;
    console.log("calculator", calculator)
}

const performanceCalculation = {
    '/': (firstValue, secondValue) => firstValue / secondValue,

    '*': (firstValue, secondValue) => firstValue * secondValue,
    
    '+': (firstValue, secondValue) => firstValue + secondValue,

    '-': (firstValue, secondValue) => firstValue - secondValue,

    '=': (firstValue, secondValue) => secondValue
}

function updateDisplay() {
    const display = document.querySelector('.calculator-screen');
    display.value = calculator.displayValue;
}

function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstEnteredValue = null;
    calculator.waitingForSecondValue = false;
    calculator.operator = null;
}