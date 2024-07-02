const all_Templates = [
    {
        'Namoro': {
            'img': '',
            'html': `
          <!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Carta de Amor</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f7f7f7;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        .container {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
            max-width: 600px;
            width: 100%;
            text-align: center;
        }
        .title {
            font-size: 2rem;
            color: #e91e63;
        }
        .heart-icon {
            font-size: 3rem;
            color: #e91e63;
            margin-bottom: 20px;
        }
        textarea {
            width: 100%;
            height: 150px;
            padding: 10px;
            margin-top: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            resize: none;
        }
        input[type=password] {
            width: calc(100% - 22px);
            padding: 10px;
            margin-top: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 1rem;
            box-sizing: border-box;
        }
        button.descriptografar {
            background-color: #e91e63;
            color: #fff;
            border: none;
            padding: 10px 20px;
            margin-top: 10px;
            cursor: pointer;
            border-radius: 4px;
            font-size: 1rem;
            transition: background-color 0.3s ease;
        }
        button.descriptografar:hover {
            background-color: #c2185b;
        }
        #texto_decodificado {
            width: 100%;
            height: 150px;
            padding: 10px;
            margin-top: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            resize: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <span class="heart-icon">&#10084;</span>
        <h1 class="title">Minha Carta de Amor</h1>
        <textarea id="texto_codificado" placeholder="Digite sua carta aqui..."></textarea>
        <input type="password" id="senha" placeholder="Digite a senha">
        <button class="descriptografar">Descriptografar</button>
        <textarea id="texto_decodificado" readonly placeholder="Aqui aparecerá o texto descriptografado"></textarea>
    </div>
</body>
</html>

            `
        }
    },
    {
        'Namoro': {
            'img': '',
            'html': `
          <!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Carta de Amor</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f7f7f7;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        .container {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
            max-width: 600px;
            width: 100%;
            text-align: center;
        }
        .title {
            font-size: 2rem;
            color: #e91e63;
        }
        .heart-icon {
            font-size: 3rem;
            color: #e91e63;
            margin-bottom: 20px;
        }
        textarea {
            width: 100%;
            height: 150px;
            padding: 10px;
            margin-top: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            resize: none;
        }
        input[type=password] {
            width: calc(100% - 22px);
            padding: 10px;
            margin-top: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 1rem;
            box-sizing: border-box;
        }
        button.descriptografar {
            background-color: #e91e63;
            color: #fff;
            border: none;
            padding: 10px 20px;
            margin-top: 10px;
            cursor: pointer;
            border-radius: 4px;
            font-size: 1rem;
            transition: background-color 0.3s ease;
        }
        button.descriptografar:hover {
            background-color: #c2185b;
        }
        #texto_decodificado {
            width: 100%;
            height: 150px;
            padding: 10px;
            margin-top: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            resize: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <span class="heart-icon">&#10084;</span>
        <h1 class="title">Minha Carta de Amor</h1>
        <textarea id="texto_codificado" placeholder="Digite sua carta aqui..."></textarea>
        <input type="password" id="senha" placeholder="Digite a senha">
        <button class="descriptografar">Descriptografar</button>
        <textarea id="texto_decodificado" readonly placeholder="Aqui aparecerá o texto descriptografado"></textarea>
    </div>
</body>
</html>

            `
        }
    }
];

const iframes_Templates = document.querySelector(".container-iframes-templates");

function openPopup(htmlRender) {
    const config = 'width=600,height=400,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes';
    const popup = window.open('', '_blank', config);

    popup.document.write(decodeURIComponent(htmlRender)); // Decodifica o HTML antes de escrever no popup
    popup.document.close(); // Fechar o documento após a escrita

    if (!popup || popup.closed || typeof popup.closed === 'undefined') {
        alert('O popup foi bloqueado pelo navegador. Verifique as configurações de bloqueio de popups.');
    }
}

function addTemplates(templates) {
    templates.forEach((item) => {
        const templateName = Object.keys(item)[0];
        const encodedHtml = encodeURIComponent(item[templateName].html); // Codifica o HTML
        const imgSrc = `https://picsum.photos/2000/2000`; // URL aleatória de imagem (200x150)

        iframes_Templates.innerHTML += `
            <div class='container-iframes-templates_iframe_p'>
                <p>${templateName}</p>
                <div class='banner_img'>
                    <img src='${imgSrc}' alt='Imagem Aleatória'>
                </div>
                <div class='container-button-modal'>
                <button onclick="openPopup('${encodedHtml}')"> Abrir ${templateName} </button>
                <button onclick="openPopup('${encodedHtml}')"> Baixar </button>
                </div>
            </div>
            <hr>
        `;
    });
}

addTemplates(all_Templates);
