const all_Templates = [
    {
        "cartão de Namoro": {
            html: `
 
            `,
            style: `

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

    if (!popup || popup.closed || typeof popup.closed === 'undefined') {
        alert('O popup foi bloqueado pelo navegador. Verifique as configurações de bloqueio de popups.');
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
