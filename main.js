const display = document.getElementById('display');
let currentInput = '0';
let shouldResetDisplay = false;

// Atualiza o texto do visor
function updateDisplay() {
    display.innerText = currentInput;
}

// Adiciona números ao visor
function appendNumber(number) {
    if (currentInput === '0' || shouldResetDisplay) {
        currentInput = number;
        shouldResetDisplay = false;
    } else {
        // Evita colocar múltiplos pontos decimais seguidos
        if (number === '.' && currentInput.includes('.')) return;
        currentInput += number;
    }
    updateDisplay();
}

// Adiciona operadores (+, -, *, /)
function appendOperator(operator) {
    if (shouldResetDisplay) shouldResetDisplay = false;
    
    // Pega o último caractere para evitar operadores duplicados
    const lastChar = currentInput.slice(-1);
    if (['+', '-', '*', '/'].includes(lastChar)) {
        currentInput = currentInput.slice(0, -1) + operator;
    } else {
        currentInput += operator;
    }
    updateDisplay();
}

// Limpa a tela (Botão C)
function clearDisplay() {
    currentInput = '0';
    updateDisplay();
}

// Executa o cálculo matemático
function calculate() {
    try {
        // O uso do Function() aqui avalia a string matemática de forma segura
        let result = new Function('return ' + currentInput)();
        
        // Trata divisões por zero ou resultados inválidos
        if (result === Infinity || isNaN(result)) {
            currentInput = 'Erro';
        } else {
            // Limita as casas decimais se o número for muito longo
            currentInput = Number(result.toFixed(4)).toString();
        }
    } catch (error) {
        currentInput = 'Erro';
    }
    shouldResetDisplay = true;
    updateDisplay();
}
