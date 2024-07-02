/**
 * Inverte uma string.
 * @param {string} texto - O texto a ser invertido.
 * @returns {string} O texto invertido.
 */
function inverterTexto(texto) {
    // Verifica se o input é uma string
    if (typeof texto !== 'string') {
        throw new Error('O parâmetro deve ser uma string.');
    }

    // Divide a string em um array de caracteres, inverte o array e junta novamente em uma string
    return texto.split('').reverse().join('');
}

// Exemplo de uso:
// const textoExemplo = 'Daniel';
// const textoInvertido = inverterTexto(textoExemplo);
// console.log(`Texto "${textoExemplo}" invertido: ${textoInvertido}`);
