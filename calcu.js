class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear() {
        this.currentOperand = ""
        this.previousOperand = ""
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        // the reaso we trun the, to string is that JS tries to add them in the state of real number
        // and we want our number to be appended not to added
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()


    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ""
    }

    compute() {
        // below is the resukt iof the computation
        let computation
        let prev = parseFloat(this.previousOperand)
        let cur = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(cur)) return
        switch (this.operation) {
            case '+':
                computation = prev + cur
                break;
            case '-':
                computation = prev - cur
                break;
            case '/':
                computation = prev / cur;
                break;
            case '*':
                computation = prev * cur
                break;
            default:
                return;
                break;
        }

        this.currentOperand = computation;
        this.operation = undefined
        this.previousOperand = ""
    }


    getDisplayNumber(number) {
        // bellow in string number we maybe get a string or a number
        const stringNumber = number.toString()
        // bellow is the part before the period and the part after the period
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = (stringNumber.split('.')[1])
        let inetegerDisplay
        if (isNaN(integerDigits)) {
            inetegerDisplay = ''
        } else {
            inetegerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if (decimalDigits !== null) {
            return `${inetegerDisplay}.${decimalDigits}`
        } else {
            return inetegerDisplay
        }
    }









    updateDisplay() {

        this.currentOperandTextElement.innerText =
            this.getDisplayNumber(this.currentOperand)
        if (this.operation !== null) {
            this.previousOperandTextElement.innerText =
                `${this.previousOperand} ${this.operation}`
        }

    }
}


const numberButtons = document.querySelectorAll("[data-number]")
const operationButtons = document.querySelectorAll("[data-operation]")
const equalsButton = document.querySelector("[data-equals]")
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-clear]");
const previousOperandTextElement = document.querySelector("[data-previous-operand]")
const currentOperandTextElement = document.querySelector("[data-current-operand]")




const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)


numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})


operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})


equalsButton.addEventListener('click', (button) => {
    calculator.compute()
    calculator.updateDisplay()
})


allClearButton.addEventListener('click', (button) => {
    calculator.clear()
    calculator.updateDisplay()
})


deleteButton.addEventListener('click', (button) => {
    calculator.delete()
    calculator.updateDisplay()
})


