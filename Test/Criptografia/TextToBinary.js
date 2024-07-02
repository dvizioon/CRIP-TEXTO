/**
 * Converte uma string para sua representação binária.
 * @param {string} texto - O texto a ser convertido para binário.
 * @returns {string} Uma string representando o texto em binário.
 */
function textoParaBinario(texto) {
    // Verifica se o input é uma string
    if (typeof texto !== 'string') {
        throw new Error('O parâmetro deve ser uma string.');
    }

    // Converte cada caractere para seu valor binário e concatena
    const binarioArray = [];
    for (let i = 0; i < texto.length; i++) {
        const binario = texto[i].charCodeAt(0).toString(2);
        binarioArray.push(binario.padStart(8, '0')); // Completa para 8 bits
    }

    return binarioArray.join(' ');
}

// Exemplo de uso:
// const textoExemplo = 'Daniel';
// const textoBinario = textoParaBinario(textoExemplo);
// console.log(`Texto "${textoExemplo}" em binário: ${textoBinario}`);
