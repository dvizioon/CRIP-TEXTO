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


async function createPdf() {
    const { jsPDF } = window.jspdf;

    const imageUrl = './Assets/Logo.jpg';
    const imgBytes = await fetch(imageUrl).then(res => res.blob());
    const reader = new FileReader();
    reader.readAsDataURL(imgBytes);
    reader.onloadend = function () {
        const base64data = reader.result;

        const doc = new jsPDF({
            unit: 'pt',
            format: [600, 800]
        });

        const content = texto_criptografador_doc.value;

        const fontSize = 15;
        const lineHeight = fontSize * 1.5;
        const maxLineWidth = 500;
        const marginX = (doc.internal.pageSize.getWidth() - maxLineWidth) / 2;
        let currentY = 270 + 50;
        const padding = 10;

        const lines = doc.splitTextToSize(content, maxLineWidth - padding * 2);
        const pageHeight = doc.internal.pageSize.getHeight();
        const availableHeight = pageHeight - 100; 

        doc.addImage(base64data, 'JPEG', 200, 0, 200, 200);

        doc.setDrawColor(10, 56, 113);
        doc.setLineWidth(2);
        doc.rect(marginX - padding, currentY - padding, maxLineWidth + padding * 2, availableHeight - currentY + padding);

        doc.setTextColor(41, 186, 99);
        doc.setFontSize(fontSize);

        lines.forEach((line, index) => {
            if (currentY + lineHeight > availableHeight) {
                doc.addPage();
                currentY = 50; 
                doc.setDrawColor(10, 56, 113);
                doc.setLineWidth(2);
                doc.rect(marginX - padding, currentY - padding, maxLineWidth + padding * 2, pageHeight - 100);
            }
            doc.text(line, marginX + padding, currentY + padding);
            currentY += lineHeight;
        });

        doc.save(`${name_document.value}`);
    };
}

// createPdf()

// async function createPdfandKey() {
//     // Defina o conteúdo do PDF
//     const conteudo = 'Olá, mundo!';

//     // Defina as configurações do documento
//     const docDefinition = {
//         content: conteudo,
//         userPassword: 'minhaSenha', // Defina a senha desejada
//     };

//     // Crie o PDF
//     pdfMake.createPdf(docDefinition).download('meu-arquivo-com-senha.pdf');

// }


// async function createPdfandKey() {
//     const doc = new jsPDF({
//         encryption: {
//             userPassword: "user",
//             ownerPassword: "owner",
//             userPermissions: ["print", "modify", "copy", "annot-forms"]
//         }
//     });
//     doc.text("Conteúdo do PDF protegido por senha.", 10, 10);

//     // Salve o arquivo
//     doc.save("meu_arquivo_protegido.pdf");
// }


async function createPdfandKey() {

    const { jsPDF } = window.jspdf;

    const { value: userPassword } = await Swal.fire({
        title: 'Defina a senha do documento',
        input: 'password',
        inputPlaceholder: 'Digite a senha',
        inputAttributes: {
            autocapitalize: 'off',
            autocorrect: 'off'
        },
        customClass: {
            title: 'swal-title',
            input: 'swal-input',
        },
        showCancelButton: true,
        confirmButtonText: 'Criar PDF',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        preConfirm: async (password) => {
            if (!password) {
                Swal.showValidationMessage('Por favor, digite a senha');
            }
            return password;
        }
    });

    if (!userPassword) {
        return;
    }



    const imageUrl = './Assets/Logo.jpg';
    const imgBytes = await fetch(imageUrl).then(res => res.blob());
    const reader = new FileReader();
    reader.readAsDataURL(imgBytes);
    reader.onloadend = function () {
        const base64data = reader.result;


        const doc = new jsPDF({
            encryption: {
                userPassword: userPassword,
                ownerPassword: 'owner-123',
                permissions: {
                    printing: 'highResolution',
                    modifying: false,
                    copying: false,
                    annotating: false,
                    fillingForms: false,
                    contentAccessibility: false,
                    documentAssembly: false,
                }
            },
            unit: 'pt',
            format: [600, 800]
        });

        const content = texto_criptografador_doc.value;

        const fontSize = 15;
        const lineHeight = fontSize * 1.5;
        const maxLineWidth = 500;
        const marginX = (doc.internal.pageSize.getWidth() - maxLineWidth) / 2;
        let currentY = 270 + 50;
        const padding = 10;

        const lines = doc.splitTextToSize(content, maxLineWidth - padding * 2);
        const pageHeight = doc.internal.pageSize.getHeight();
        const availableHeight = pageHeight - 100;

        doc.addImage(base64data, 'JPEG', 400, 0, 200, 200);

        doc.setDrawColor(10, 56, 113);
        doc.setLineWidth(2);
        doc.rect(marginX - padding, currentY - padding, maxLineWidth + padding * 2, availableHeight - currentY + padding);

        doc.setTextColor(41, 186, 99);
        doc.setFontSize(fontSize);

        lines.forEach((line, index) => {
            if (currentY + lineHeight > availableHeight) {
                doc.addPage();
                currentY = 50;
                doc.setDrawColor(10, 56, 113);
                doc.setLineWidth(2);
                doc.rect(marginX - padding, currentY - padding, maxLineWidth + padding * 2, pageHeight - 100);
            }
            doc.text(line, marginX + padding, currentY + padding);
            currentY += lineHeight;
        });

        doc.save(`${name_document.value}`);
    };
}



// createPdfandKey()

function Downloads(html, type) {

    close_panel.onclick = () => {
        panel_security.style.visibility = "hidden"
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

        const blob = new Blob([container], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${name_document.value}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
    }
    else if (type === "save-pdf") {
        createPdf()
    }
    else if (type === "save-pdf-password") {
        createPdfandKey()
    }
}
