function inicializarDescriptor() {
    const btnDescriptografar = document.querySelector(".descriptografar");
    const inputTextoCodificar = document.querySelector("#texto_codificar");
    const inputTextoCodificado = document.querySelector("#texto_codificado");

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

    atualizarImagemDeFundo(inputTextoCodificado);

    // Função de Binario para Texto
    function binarioParaTexto(binario) {
        const binarioArray = binario.split(' ');
        const textoArray = binarioArray.map(bin => {
            const decimal = parseInt(bin, 2);
            return String.fromCharCode(decimal);
        });
        return textoArray.join('');
    }

    // Função de Reverter Texto
    function reverterTexto(texto) {
        if (typeof texto !== 'string') {
            throw new Error('O parâmetro deve ser uma string.');
        }
        return texto.split('').reverse().join('');
    }

    // Função de Remover Símbolos
    function removerSimbolos(string) {
        const regex = /[^01 ]/g; // Mantém apenas 0, 1 e espaços
        return string.replace(regex, '');
    }

    btnDescriptografar.addEventListener('click', () => {
        atualizarImagemDeFundo(inputTextoCodificado);

        // Remover Símbolos
        let textoCodificado = inputTextoCodificar.value;
        let textoSemSimbolos = removerSimbolos(textoCodificado);

        // Reverter Texto
        let textoRevertido = reverterTexto(textoSemSimbolos);
      
        // Converter Binário para Texto
        let textoDescriptografado = binarioParaTexto(textoRevertido);

        // Saída do Resultado
        inputTextoCodificado.value = textoDescriptografado;

        inputTextoCodificar.value = ""
        // Atualizar imagem de fundo após a descriptografia
        atualizarImagemDeFundo(inputTextoCodificado);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    inicializarDescriptor();
});
