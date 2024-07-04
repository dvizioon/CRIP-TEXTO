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
    const { PDFDocument, rgb } = PDFLib;

    const imageUrl = './Assets/Logo.jpg';
    const imgBytes = await fetch(imageUrl).then(res => res.arrayBuffer());
    const pdfDoc = await PDFDocument.create();
    let img;
    if (imageUrl.endsWith('.png')) {
        img = await pdfDoc.embedPng(imgBytes);
    } else if (imageUrl.endsWith('.jpg') || imageUrl.endsWith('.jpeg')) {
        img = await pdfDoc.embedJpg(imgBytes);
    } else {
        throw new Error('Formato de imagem não suportado!');
    }

    const imgDims = img.scale(0.9);
    const page = pdfDoc.addPage([600, 800]);
    const x = (page.getWidth() - imgDims.width) / 2;
    const y = (page.getHeight() - imgDims.height) / 2 + 270;
    const padding = 5; 

    page.drawImage(img, {
        x: x,
        y: y,
        width: imgDims.width,
        height: imgDims.height,
    });

    const content = texto_criptografador_doc.value;

    const fontSize = 15;
    const lineHeight = fontSize * 1.2;
    const lines = content.split('\n').flatMap(line => {
        const words = line.split(' ');
        const lines = [];
        let currentLine = '';
        for (const word of words) {
            if (currentLine.length + word.length + 1 <= 50) {
                currentLine += (currentLine.length === 0 ? '' : ' ') + word;
            } else {
                lines.push(currentLine);
                currentLine = word;
            }
        }
        lines.push(currentLine);
        return lines;
    });

    const textHeight = lines.length * lineHeight;
    const textWidth = 500;
    const textX = (page.getWidth() - textWidth) / 2;
    const textY = y - 50 - textHeight;

    const red = 10 / 255; 
    const green = 56 / 255; 
    const blue = 113 / 255; 

    page.drawRectangle({
        x: textX,
        y: textY,
        width: textWidth,
        height: textHeight,
        borderColor: rgb(red, green, blue),
        borderWidth: 2,
        padding: 2,
    });

    lines.forEach((line, i) => {
        page.drawText(line, {
            x: textX + 10,
            y: textY + textHeight - lineHeight * (i + 1),
            size: fontSize,
            color: rgb(41 / 255, 186 / 255, 99 / 255), 
            maxWidth: textWidth - 20,
        });
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.download = `${name_document.value}.pdf`;
    link.href = URL.createObjectURL(blob);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
    // Carregar a imagem
    const imageUrl = './Assets/Logo.jpg';
    const imgBytes = await fetch(imageUrl).then(res => res.arrayBuffer());
    let imgDataUri;

    // Carregar a imagem como Data URI para jsPDF
    const imgBlob = new Blob([imgBytes], { type: 'image/jpeg' });
    const reader = new FileReader();
    reader.readAsDataURL(imgBlob);
    reader.onloadend = function () {
        imgDataUri = reader.result;
    };

    // Exibir um alerta para definir a senha do documento
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

    // Se o usuário cancelar ou não definir a senha, encerrar a função
    if (!userPassword) {
        return;
    }

    // Configurações para desenhar o PDF com jsPDF
    const doc = new jsPDF({
        encryption: {
            userPassword: userPassword,
            ownerPassword: 'ower-123',
            permissions: {
                printing: 'highResolution',
                modifying: false,
                copying: false,
                annotating: false,
                fillingForms: false,
                contentAccessibility: false,
                documentAssembly: false,
            }
        }
        
    });

    // Incorporar a imagem no documento PDF
    if (imgDataUri) {
        doc.addImage(imgDataUri, 'JPEG', 40, 40, 100, 100); // Exemplo de posição e tamanho
    } else {
        throw new Error('Formato de imagem não suportado!');
    }

    // Obter o conteúdo do textarea
    const content = texto_criptografador_doc.value;

    // Configurações para desenhar o retângulo e o texto no PDF
    const fontSize = 12;
    const margin = 10;
    let y = 160; // Posição inicial do texto

    // Desenhar retângulo
    doc.rect(margin, y - margin, doc.internal.pageSize.width - margin * 2, doc.internal.pageSize.height - margin * 2, 'S');

    // Dividir o conteúdo em linhas e desenhar no PDF
    const lines = doc.splitTextToSize(content, doc.internal.pageSize.width - margin * 2);
    doc.setFontSize(fontSize);
    doc.setTextColor(0, 0, 0);
    lines.forEach(line => {
        doc.text(line, margin, y);
        y += fontSize + 5; // Espaçamento entre linhas
    });

    // Salvar e baixar o documento PDF

    // if (!!name.value === "", Object.prototype(name.value)) {
    //         doc.save(`PDF is not Valid`)
    // } else {
    //         doc.save(`is Valid`)
    // }


    doc.save(`${name_document.value}.pdf`);
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