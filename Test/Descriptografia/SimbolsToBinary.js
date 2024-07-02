/**
 * Remove caracteres específicos entre os dígitos de uma string binária, conforme as opções fornecidas.
 * @param {string} binaryString - A string binária original.
 * @param {Object} [options] - Opções para personalizar a remoção de caracteres.
 * @param {boolean} [options.numbers=true] - Se true, remove números entre os dígitos binários.
 * @param {boolean} [options.letters=true] - Se true, remove letras entre os dígitos binários.
 * @param {boolean} [options.specials=true] - Se true, remove caracteres especiais entre os dígitos binários.
 * @returns {string} A string binária modificada com os caracteres especificados removidos.
 */
function removeRandomChars(binaryString, options = { numbers: true, letters: true, specials: true }) {
    // Caracteres a serem removidos conforme as opções
    const charsToRemove = [];

    if (options.numbers) {
        charsToRemove.push(...'1234567890'.split(''));
    }

    if (options.letters) {
        charsToRemove.push(...'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(''));
    }

    if (options.specials) {
        charsToRemove.push(...'!@#$%^&*()_+-=[]{}|;:,.<>?'.split(''));
    }

    // Dividindo a string binária em um array de caracteres
    let binaryArray = binaryString.split('');

    // Removendo caracteres específicos entre os dígitos binários
    for (let i = 0; i < binaryArray.length; i++) {
        // Verifica se o caractere atual deve ser removido
        if (charsToRemove.includes(binaryArray[i])) {
            binaryArray[i] = '';
        }
    }

    // Juntando o array de caracteres de volta em uma string
    let removedString = binaryArray.join('');

    return removedString;
}

// Exemplo de uso:
let binaryString = '1A0B1C0D1E0F1G';
let options = {
    numbers: true,   // Remover números
    letters: true,   // Remover letras
    specials: true   // Remover caracteres especiais
};
let modifiedString = removeRandomChars(binaryString, options);
console.log(modifiedString); // Saída esperada: '0 0 0 0 0'
