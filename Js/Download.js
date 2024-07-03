const texto_criptografador_doc = document.getElementById('texto_codificado')
const name_document = document.getElementById('name_docs')
const password_document = document.getElementById('password')
const panel_security = document.querySelector(".panel-security")
const close_panel = document.querySelector(".close_panel")


function saveDB(template, content) {
    
    addOrUpdateTemplate(`${template}`, `${content}`);
    
    Swal.fire({
        icon: "success",
        title: "Template Salva com Sucesso",
        customClass: {
            title: 'swal-title',
            content: 'swal-content',
        }
    });
}


function Downloads(html, type) {

    close_panel.onclick = () => {
        panel_security.style.visibility = "hidden"
    }

    if (password_document.value === "") {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Você não definiu uma Senha!!!",
            customClass: {
                title: 'swal-title',
                content: 'swal-content',
            }
        });
        panel_security.style.visibility = "visible"
        return
    }

    if (name_document.value === "") {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Você não definiu Nome do documento!!!",
            customClass: {
                title: 'swal-title',
                content: 'swal-content',
            }
        });
        panel_security.style.visibility = "visible"
        return
    }





    const container = `
        <!DOCTYPE html>
        <html lang='pt-BR'>

        <head>
            <meta charset='UTF-8'>
            <meta name='viewport' content='width=device-width, initial-scale=1.0'>
            <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css'>
            <script src='https://cdn.jsdelivr.net/npm/sweetalert2@11'></script>
            <title>document</title>
            <style>
            *{
            
                margin:0;
                padding:0;
                box-sizing: border-box;
            }
            
                body {
                    font-family: Arial, sans-serif;
                    width:100vw;
                    height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding:1rem;
                }
            </style>
        </head>

        <body>

            ${html}
        
            <script>
                function inicializarDescriptor() {
                    const btnDescriptografar = document.querySelector('.descriptografar');
                    const inputTextoCodificar = document.querySelector('#texto_codificado');
                    inputTextoCodificar.value = \`${texto_criptografador_doc.value}\`;
                    const textareaTextoDecifrado = document.querySelector('#texto_decifrado');
                    const inputSenha = document.querySelector('#senha');

                    function verificarElementoVazio(elemento) {
                        return elemento.value.trim() === '';
                    }

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

                    function descriptografarTexto(textoCodificadoValue, senha) {
                    // Remover Símbolos
                        let textoCodificado = textoCodificadoValue;
                        let textoSemSimbolos = removerSimbolos(textoCodificado);
                        

                        // // Reverter Texto
                        let textoRevertido = reverterTexto(textoSemSimbolos);

                        // // Converter Binário para Texto
                        let textoDescriptografado = binarioParaTexto(textoRevertido);

                        return textoDescriptografado;
                    }

                    btnDescriptografar.addEventListener('click', () => {
                        const textoCodificado = inputTextoCodificar.value.trim();
                        const senha = inputSenha.value.trim();

                        if (verificarElementoVazio(inputTextoCodificar) || verificarElementoVazio(inputSenha)) {
                            alert('Por favor, preencha tanto o texto codificado quanto a senha.');
                            return;
                        }

                        if (senha !== '${password_document.value}') {
                            // alert('Senha incorreta.');
                            Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: "Senha que Você digitou está incorreta!!!",
                                footer: 'Você não se Lembra? 😞😨'
                            });
                            return;
                        }

                        const textoDecifrado = descriptografarTexto(textoCodificado, senha);
                        textareaTextoDecifrado.value = textoDecifrado;
                        // Foco no campo de texto decifrado
                        textareaTextoDecifrado.focus();
                    });
                }

                document.addEventListener('DOMContentLoaded', inicializarDescriptor);
            </script>
        </body>

        </html>
    `
    if (type === "save-html") {
        const blob = new Blob([container], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "documento.html";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

}