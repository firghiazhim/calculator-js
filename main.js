const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null
}

const UpdateDisplay = () => {
    const display = document.querySelector('.calculator-display');
    display.value = calculator.displayValue;
}

const inputDigit = (digit) => {
    const {displayValue, waitingForSecondOperand} = calculator;

    if(waitingForSecondOperand === true){
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } else {
        calculator.displayValue = displayValue === '0' ? digit: displayValue + digit;
    }
    UpdateDisplay()
}

const inputDecimal = (dot) => {
    if(!calculator.displayValue.includes(dot)){
        calculator.displayValue += dot
    }
}

const handleOperator = (nextOperator) => {
    const {firstOperand, displayValue, operator} = calculator;
    const inputValue = parseFloat(displayValue);

    if(operator && calculator.waitingForSecondOperand){
        calculator.operator = nextOperator
        return
    }

    if(firstOperand === null && !isNaN(inputValue)){
        calculator.firstOperand = inputValue
    } else if (operator){
        const result = calculate(firstOperand, inputValue, operator)
        calculator.displayValue = `${parseFloat(result.toFixed(7))}`
        calculator.firstOperand = result
    }

    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator

    UpdateDisplay()
}

const calculate = (firstOperand, secondOperand, operator) => {
    if(operator === '+'){
        return firstOperand + secondOperand
    }else if(operator === '-'){
        return firstOperand - secondOperand
    }else if(operator === '*'){
        return firstOperand * secondOperand
    }else if(operator === '/'){
        return firstOperand / secondOperand
    }else if(operator === '√'){
        return Math.sqrt(firstOperand)
    }else if(operator === '%'){
        return firstOperand / 100
    }

    return secondOperand;
}

const resetCalculator = () => {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null
    UpdateDisplay()
}

const handleEqual = () => {
    const {firstOperand, displayValue, operator} = calculator;
    const inputValue = parseFloat(displayValue)

    if(operator && !calculator.waitingForSecondOperand){
        const result = calculate(firstOperand, inputValue, operator);
        calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
        calculator.firstOperand = null
        calculator.operator = null
        calculator.waitingForSecondOperand = false
        UpdateDisplay()
    }
}

document.querySelector('.calculator-keys').addEventListener('click', (event) => {
    const {target} = event

    if(!target.matches('button')){
        return
    }

    if(target.classList.contains('operator')){
        handleOperator(target.value)
        return
    }

    if(target.classList.contains('decimal')){
        handleOperator(target.value)
        return
    }

    if(target.classList.contains('all-clear')){
        resetCalculator()
        return
    }

    if(target.classList.contains('equal-sign')){
        handleEqual()
        return
    }

    inputDigit(target.value)
});