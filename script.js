
    document.addEventListener('DOMContentLoaded', () => {
        const display = document.getElementById('display');
        const buttons = document.querySelectorAll('button:not(.theme-toggle)');
        const themeToggle = document.getElementById('themeToggle');
        
        let currentInput = '0';
        let previousInput = '';
        let operation = null;
        let resetInput = false;
        
        // Update display
        function updateDisplay() {
            display.value = currentInput;
        }
        
        // Handle number input
        function inputNumber(number) {
            if (currentInput === '0' || resetInput) {
                currentInput = number;
                resetInput = false;
            } else {
                currentInput += number;
            }
            updateDisplay();
        }
        
        // Handle decimal point
        function inputDecimal() {
            if (resetInput) {
                currentInput = '0.';
                resetInput = false;
                updateDisplay();
                return;
            }
            
            if (!currentInput.includes('.')) {
                currentInput += '.';
                updateDisplay();
            }
        }
        
        // Handle operators
        function handleOperator(op) {
            if (operation && !resetInput) {
                calculate();
            }
            
            previousInput = currentInput;
            operation = op;
            resetInput = true;
        }
        
        // Perform calculation
        function calculate() {
            let result;
            const prev = parseFloat(previousInput);
            const current = parseFloat(currentInput);
            
            if (isNaN(prev) || isNaN(current)) return;
            
            switch (operation) {
                case '+':
                    result = prev + current;
                    break;
                case '-':
                    result = prev - current;
                    break;
                case '×':
                    result = prev * current;
                    break;
                case '÷':
                    result = prev / current;
                    break;
                case '%':
                    result = prev % current;
                    break;
                default:
                    return;
            }
            
            currentInput = result.toString();
            operation = null;
            updateDisplay();
        }
        
        // Clear calculator
        function clearAll() {
            currentInput = '0';
            previousInput = '';
            operation = null;
            updateDisplay();
        }
        
        // Delete last character
        function deleteLastChar() {
            if (currentInput.length === 1 || (currentInput.length === 2 && currentInput.startsWith('-'))) {
                currentInput = '0';
            } else {
                currentInput = currentInput.slice(0, -1);
            }
            updateDisplay();
        }
        
        // Button click event listeners
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                if (button.classList.contains('clear')) {
                    clearAll();
                } else if (button.classList.contains('delete')) {
                    deleteLastChar();
                } else if (button.classList.contains('operator')) {
                    handleOperator(button.textContent);
                } else if (button.classList.contains('equals')) {
                    calculate();
                } else if (button.textContent === '.') {
                    inputDecimal();
                } else {
                    inputNumber(button.textContent);
                }
            });
        });
        
        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if (e.key >= '0' && e.key <= '9') {
                inputNumber(e.key);
            } else if (e.key === '.') {
                inputDecimal();
            } else if (e.key === 'Enter' || e.key === '=') {
                calculate();
            } else if (e.key === 'Escape') {
                clearAll();
            } else if (e.key === 'Backspace') {
                deleteLastChar();
            } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/' || e.key === '%') {
                handleOperator(e.key === '*' ? '×' : e.key === '/' ? '÷' : e.key);
            }
        });
        
        // Theme toggle
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            
            // Save preference to localStorage
            const isDarkMode = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDarkMode);
            
            // Update icon
            themeToggle.textContent = isDarkMode ? '🌞' : '🌓';
        });
        
        // Check for saved theme preference
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
            themeToggle.textContent = '🌞';
        }
    });
                                              
