function inicializarCriptor() {
    const btn_criptografar = document.querySelector(".criptografar");
    const texto_codificar = document.querySelector("#texto_codificar");
    const texto_codificado = document.querySelector("#texto_codificado");

    function verificarElemento(id) {
        const element = document.querySelector(id);

        if (element.value === "") {
            return { r: true, el: element };
        } else {
            return { r: false, el: element };
        }
    }

    function atualizarImagemDeFundo(element) {
        if (element.value === "") {
            element.setAttribute('style', `
                background-image: url(./Assets/Person.svg);
                background-repeat: no-repeat;
                background-size: auto;
                background-position: center;
            `);
        } else {
            element.setAttribute('style', ``);
        }
    }

    atualizarImagemDeFundo(texto_codificado);

    // Função de Texto para Binario
    function textoParaBinario(texto) {
        if (typeof texto !== 'string') {
            throw new Error('O parâmetro deve ser uma string.');
        }
        const binarioArray = [];
        for (let i = 0; i < texto.length; i++) {
            const binario = texto[i].charCodeAt(0).toString(2);
            binarioArray.push(binario.padStart(8, '0'));
        }
        return binarioArray.join(' ');
    }

    // Função de Inverter Binario
    function inverterTexto(texto) {
        if (typeof texto !== 'string') {
            throw new Error('O parâmetro deve ser uma string.');
        }
        return texto.split('').reverse().join('');
    }

    // Função de inserir e Controlar simbolos 
    function inserirSimbolos(binaryString, options = { numbers: true, letters: true, specials: true }) {
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
        let binaryArray = binaryString.split('');
        for (let i = 0; i < binaryArray.length; i++) {
            let randomChar = options.numbers || options.letters || options.specials ? chars[Math.floor(Math.random() * chars.length)] : '';
            binaryArray[i] += randomChar;
        }
        let insertedString = binaryArray.join('');

        return insertedString;
    }

    btn_criptografar.addEventListener('click', () => {
        const { letras, numeros, simbolos, } = JSON.parse(logCheckedCheckboxes())
        let options = {
            numbers: numeros,
            letters: letras,
            specials: simbolos
        };
        // console.log(letras,numeros,simbolos)
        // Verificar se o elemento está vazio e atualizar a imagem de fundo
        atualizarImagemDeFundo(texto_codificado);
        // console.log(logCheckedCheckboxes());  // Mostra as opções iniciais no console
        // Texto para Binario
        let texto_para_banario = texto_codificar.value;
        let texto_convert_Binario = textoParaBinario(texto_para_banario);

        // Inverter Valor Binario
        let inverter_valor_binario = inverterTexto(texto_convert_Binario);


        // Inserir Simbolos Controlados
        let adicionar_simbolos = inserirSimbolos(inverter_valor_binario, options);

        // Saida do Resultado
        texto_codificado.value = adicionar_simbolos;

        texto_codificar.value = ""
        // Atualizar imagem de fundo após a codificação
        atualizarImagemDeFundo(texto_codificado);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    inicializarCriptor();
});
