
/**
 * Insere caracteres aleatórios entre os dígitos de uma string binária, conforme as opções fornecidas.
 * @param {string} binaryString - A string binária original.
 * @param {Object} [options] - Opções para personalizar a inserção de caracteres.
 * @param {boolean} [options.numbers=true] - Se true, inclui números na inserção de caracteres.
 * @param {boolean} [options.letters=true] - Se true, inclui letras na inserção de caracteres.
 * @param {boolean} [options.specials=true] - Se true, inclui caracteres especiais na inserção de caracteres.
 * @returns {string} A string binária modificada com caracteres aleatórios inseridos.
 */
function insertRandomChars(binaryString, options = { numbers: true, letters: true, specials: true }) {
    const chars = [];

    if (options.numbers) {
        chars.push(...'23456789'.split(''));
    }

    if (options.letters) {
        chars.push(...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''));
    }

    if (options.specials) {
        chars.push(...'!@#$%^&*()_+-=[]{}|;:,.<>?'.split(''));
    }

    // Dividindo a string binária em um array de caracteres
    let binaryArray = binaryString.split('');

    // Inserindo caracteres aleatórios entre os dígitos binários
    for (let i = 0; i < binaryArray.length; i++) {
        // Escolhendo um caractere aleatório do array 'chars', ou uma string vazia se a opção for falsa
        let randomChar = options.numbers || options.letters || options.specials ? chars[Math.floor(Math.random() * chars.length)] : '';
        // Inserindo o caractere aleatório entre os dígitos binários
        binaryArray[i] += randomChar;
    }

    // Juntando o array de caracteres de volta em uma string
    let insertedString = binaryArray.join('');

    return insertedString;
}

// Exemplo de uso:
// let binaryString = '101010101';
// let options = {
//     numbers: false,   // Não incluir números
//     letters: false,   // Não incluir letras
//     specials: false   // Não incluir caracteres especiais
// };
// let modifiedString = insertRandomChars(binaryString, options);
// console.log(modifiedString);
