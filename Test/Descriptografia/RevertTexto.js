/**
 * Reverte uma string para o seu formato original.
 * @param {string} texto - O texto a ser revertido.
 * @returns {string} O texto revertido para o seu formato original.
 */
function reverterTexto(texto) {
    // Verifica se o input é uma string
    if (typeof texto !== 'string') {
        throw new Error('O parâmetro deve ser uma string.');
    }

    // Divide a string em um array de caracteres, inverte o array e junta novamente em uma string
    return texto.split('').reverse().join('');
}

// Exemplo de uso:
const textoInvertido = 'leinaD'; // Texto invertido
const textoOriginal = reverterTexto(textoInvertido);
console.log(`Texto invertido "${textoInvertido}" revertido para texto normal: ${textoOriginal}`);
