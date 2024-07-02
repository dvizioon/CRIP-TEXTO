/**
 * Converte uma string binária de volta para o texto original.
 * @param {string} binario - A string binária a ser convertida para texto.
 * @returns {string} O texto original convertido a partir da string binária.
 */
function binarioParaTexto(binario) {
    // Separa a string binária em um array de substrings de 8 bits
    const binarioArray = binario.split(' ');

    // Converte cada substring binária de volta para seu caractere correspondente
    const textoArray = binarioArray.map(bin => {
        // Converte o binário para um número inteiro decimal
        const decimal = parseInt(bin, 2);
        // Converte o número decimal para o caractere correspondente na tabela ASCII
        return String.fromCharCode(decimal);
    });

    // Junta o array de caracteres de volta em uma string
    const textoOriginal = textoArray.join('');

    return textoOriginal;
}

// Exemplo de uso:
const binarioExemplo = '01001000 01100101 01101100 01101100 01101111'; // Exemplo de string binária
const textoOriginal = binarioParaTexto(binarioExemplo);
console.log(`Binário "${binarioExemplo}" convertido para texto: ${textoOriginal}`);
