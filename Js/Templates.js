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
                 function inicializarDescriptor() {
            const btnDescriptografar = document.querySelector('.descriptografar');
            const inputTextoCodificar = document.querySelector('#texto_codificado');
            inputTextoCodificar.value = '0&1$0W0_1%1J1Z0C =1G161|1>0J1!1D0E :1A0C1_1K0%1^1)0) H1]0U090(0X1C1T0C [0Z0)0F020N1N0>0! D1T0T1W031S1K1J0+ 81^0:1Z0^0]1L1D0N *120:1V1J0L1E150_ ;0]0%0_090R120:02 F1P0=12160)1V1C0? 31(090F1>0$1?1R0B T1=0#1U1C0|1P1X0W V0&0#0^0=0+1H0Y0% E1@0?0(0W08181S0W }0,1&0?0M1C1I190I ]0&0U0_0W1F1L1(0( L0;030)070V1[0903 ,1P1D1W1S0}1G1B0S U0Q061;080*1^1M0? E1I0*1%0R1G1Y1J0T ;0N0)1(0,1X1H1Q06 ?0_0&0:0,0>1N0905 S1<0W0J1R0P1{1814 +0*0:0A0|0_1#0;0^ T0K1$0S1M0V1=121! L1F1G0^0:0!1>1^0P Y1F1[1#1?0R1H1J02 X0U121Q0(1K1N1&0- +0F0[0D0-071G0A0T N19070K0)0A1(1>08 @0I0A1&0D0,1;120G R1M0^0W120L151L0* K0&1&1A0L1T1?1%0( D0R0F0T0Z0{1!0I0Z @1M0%0!0V0:1V160) 90C0}0D1W0-1|1S0* P0>121H1:0F121:0] }1Y0{0]1N0V1%1,0> {1D071X1X0D1M1$0H P050*030S0D1N0!0) %1I0T0C0J0&1!1W0# X0!041:050Q1^1)0= ?0P0C0E0R0S1<0[0: -0N1%020!121C1{0; T1L1_1[1(0F1I1#0V N1^0(1}1402181L0; I1J0T0=0T0?1N120* J0?0!0(0L0W130*0S 31%1{0N0.1#1:1R0? S130Q0<1|0}1;1J0O 81M050)0<0)1[1Q0C :1Q0Z1V1E071:1-0= E1>0T1S0+0X1!1V0W :0)0%1M0_0(1|1U0: R060R0D0F0E1X0!0W J1{1%1%1G0]1I1=0# ;1<0V1(130Y1Y120Y .160,0{0R0:1>1K0# H0?0P070S0%1:0|0H ,1V0J1L0*0V1?180] 50W0A130F1E1V1{0O'
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
                <title>CripTexto</title>
                <style>
                    ${styleRender}
                </style>
            </head>

            <body>
                ${htmlRender}
            </body>

            <script type="text/javascript">
                ${scriptRender}
            </script>
        </html>
    `);
    popup.document.close();

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
                    <button onclick="">Baixar</button>
                </div>
            </div>
            <hr>
        `;
    });
}

addTemplates(all_Templates);
