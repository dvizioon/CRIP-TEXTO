const all_Templates = [
    {
        "cartão de Namoro": {
            html: `
                <div class='cartao'>
                    <h1>Para o Amor da Minha Vida ❤️</h1>
                    <p>Meu amor por você é tão grande que até mesmo as palavras precisam de uma chave para serem reveladas... 💖</p>
                    <textarea id='texto_codificado' placeholder='Digite o texto codificado aqui' disabled></textarea>
                    <input type='password' id='senha' placeholder='Digite a senha'>
                    <button class='descriptografar'>Descriptografar 🔓</button>
                    <textarea id='texto_decifrado' placeholder='Texto decifrado aparecerá aqui' readonly></textarea>
                </div>
            `,
            style: `
                body {
                            font-family: Arial, sans-serif;
                            background-color: #f0f0f0;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            height: 100vh;
                            margin: 0;
                        }

                        .cartao {
                            max-width: 600px;
                            background-color: #fff;
                            padding: 20px;
                            border-radius: 10px;
                            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                            text-align: center;
                        }

                        h1 {
                            color: #c70039;
                        }

                        p {
                            color: #333;
                            margin-bottom: 20px;
                        }

                        textarea,
                        input,
                        button {
                            width: 100%;
                            padding: 10px;
                            margin-bottom: 10px;
                            border: 1px solid #ccc;
                            border-radius: 5px;
                            font-size: 14px;
                        }

                        textarea {
                            min-height: 100px;
                        }

                        button {
                            background-color: #c70039;
                            color: #fff;
                            cursor: pointer;
                            transition: background-color 0.3s ease;
                        }

                        button:hover {
                            background-color: #960032;
                        }

                        textarea[readonly] {
                            background-color: #f0f0f0;
                            color: #666;
                        }
            `,
            script: `
               
            `
        }
    }
];

const iframes_Templates = document.querySelector(".container-iframes-templates");

function openPopup(htmlRender, scriptRender, styleRender) {
    const config = 'width=600,height=400,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes';
    const popup = window.open('', '_blank', config);

    popup.document.write(`
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css'>
                <script src='https://cdn.jsdelivr.net/npm/sweetalert2@11'></script>
                <title>CripTexto</title>
                <style>
                    ${styleRender}
                </style>
            </head>

            <body>
                ${htmlRender}
            </body>

            <script >
                ${scriptRender}
                  function inicializarDescriptor() {
                    const btnDescriptografar = document.querySelector('.descriptografar');
                    const inputTextoCodificar = document.querySelector('#texto_codificado');
                    inputTextoCodificar.value = '1|1&1:190Y171U0> U040&1#0{1J15150* F0|0R0G141<1B1Q0X |160X150,0%1,1;0! @0V0L1+0J1@0.160: O0P0}0W0D1I1B1N0E T1.020>1?0(1&1T0D J0>14040,1D1>1C0{ #1.190C0,0#031H0@ S07080*0$0I1P0N0= :1G1[1*1F0G1P1T0% R1[0K0$0U0%1W1I0Q -060>0K0A0Y1N0S0Z F1;181,1A0B1&140{ *0B0(1.0Y0I1*1O0Q ,0%1K1T1,0F1I1[0F )1?0X0=1?0]1K1N0( 60<1:1}0<1L1Z120+ 80L0|030@0:1&0X0B (1M0N1{1@0Z1^1X0J J1I0!1(0T0F1Z1%0H 50K1+0N0W0A1&1N0< N0Z0W0Z0S041)0O0: Z1-0(0Q0-0D1E1@1U H0@0S1G1S081N140H 71*1X1C1E0.0_1@0I';
                    const textareaTextoDecifrado = document.querySelector('#texto_decifrado');
                    const inputSenha = document.querySelector('#senha');
                      inputSenha.placeholder = 'A senha para Acessar Aqui é 123'
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

                        if (senha !== '123') {
                            // alert('Senha incorreta.');
                            Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: "Senha que Você digitou está incorreta!!!",
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
        </html>
    `);
    popup.document.close();

    if (!popup || popup.closed || typeof popup.closed === 'undefined') {
        alert('O popup foi bloqueado pelo navegador. Verifique as configurações de bloqueio de popups.');
    }
}

function downloadTemplate_PrePronta(htmlRender, scriptRender, styleRender, templateName) {

    if (texto_criptografador.value === "") {
        Swal.fire({
            icon: "error",
            title: "Criar a Criptografia primeiro!!!",
            customClass: {
                title: 'swal-title',
                content: 'swal-content',
            }
        });
        return
    } else {
        Swal.fire({
            title: "Senha do Documento ",
            input: "password",
            inputLabel: "Criar Senha",
            inputPlaceholder: "Digite a Senha para salvar no Documento",
            inputAttributes: {
                maxlength: "10",
                autocapitalize: "off",
                autocorrect: "off"
            },
            showCancelButton: true,
            preConfirm: (password) => {
                return password;
            }
        }).then((result) => {
            // console.log(result.value)
            if (result.value === "" || result.value === null || result.value === undefined) {
                return
            } else {
                var content = `<!DOCTYPE html>
            <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css'>
                    <script src='https://cdn.jsdelivr.net/npm/sweetalert2@11'></script>
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

                            ${styleRender}
                        </style>
                    <title>${templateName}</title>
                </head>

                <body>
                    ${htmlRender}
                </body>

                <script>
                    function inicializarDescriptor() {
                        const btnDescriptografar = document.querySelector('.descriptografar');
                        const inputTextoCodificar = document.querySelector('#texto_codificado');
                        inputTextoCodificar.value = \`${texto_criptografador.value}\`;
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

                            if (senha !== '${result.value}') {
                                // alert('Senha incorreta.');
                                Swal.fire({
                                    icon: "error",
                                    title: "Oops...",
                                    text: "Senha que Você digitou está incorreta!!!",
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
            </html>`

                var blob = new Blob([content], { type: 'text/html' });
                var url = URL.createObjectURL(blob);

                var a = document.createElement('a');
                a.href = url;
                a.download = templateName + '.html';
                document.body.appendChild(a);
                a.click();

                // Limpa a referência do URL do objeto após o download
                URL.revokeObjectURL(url);
                document.body.removeChild(a);
            }


        })

    }

}

function addTemplates(templates) {
    templates.forEach((item) => {
        const templateName = Object.keys(item)[0];
        const htmlContent = item[templateName].html;
        const scriptContent = item[templateName].script;
        const styleContent = item[templateName].style;
        const imgSrc = `https://picsum.photos/2000/2000`;

        iframes_Templates.innerHTML += `
            <div class='container-iframes-templates_iframe_p'>
                <p>${templateName}</p>
                <div class='banner_img'>
                    <img src='${imgSrc}' alt='Imagem Aleatória'>
                </div>
                <div class='container-button-modal'>
                    <button onclick="openPopup(\`${htmlContent}\`, \`${scriptContent}\`,\`${styleContent}\`)">Visualizar Modelo</button>
                    <button onclick=" downloadTemplate_PrePronta(\`${htmlContent}\`, \`${scriptContent}\`,\`${styleContent}\`,\`${templateName}\`)">Baixar</button>
                </div>
            </div>
            <hr>
        `;
    });

}

addTemplates(all_Templates);
