const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const targetUrl = 'https://www.blackbox.ai/api/chat';
const btn_search = document.querySelector('.search-find-template')
const input_search = document.querySelector('#text_seacher')
const container_frame = document.querySelector('.modal_paint_view')
const texto_criptografador = document.getElementById('texto_codificado')
const button_download = document.querySelector('.download_btn')
const select_metodo_save = document.getElementById('select-method-save-paint')
const openConfigSecurity = document.getElementById('openConfigSecurity')
const btn_save = document.getElementById('insert-data')

if (container_frame.innerHTML === "") {
    container_frame.innerHTML = `
        <h1 style='font-family: var(--font-family); font-weight: 700;'>Explore suas Ideias 🔰</h1>
    `
}

openConfigSecurity.addEventListener('click', () => {
    const panel_security = document.querySelector(".panel-security")
    const panel_style = window.getComputedStyle(panel_security)
    const close_panel = document.querySelector(".close_panel")

    if (panel_style.visibility == "hidden") {
        panel_security.style.visibility = "visible"
    }

    close_panel.onclick = () => {
        panel_security.style.visibility = "hidden"
    }
})


// Button Download
button_download.addEventListener('click', () => {
    const html = container_frame.innerHTML === "" ? "<h1>Bem vindo ao CripTexto</h1>" : container_frame.innerHTML
    Downloads(html, select_metodo_save.value)
})

btn_search.addEventListener('click', function () {
    
    if (input_search.value === "") {
        Swal.fire({
            title: "Opps!!!",
            icon: "error",
            customClass: {
                title: 'swal-title',
                content: 'swal-content'
            }
        });

        return
    }

    const question = `
    Por favor, crie uma página de convite em HTML e CSS com as seguintes características
    Quero uma página unica, com o seguinte tema ${input_search.value}:

    obs1:quero as cores que codizem como o tema ${input_search.value} e os Textos também:

    obs2:Quero o codigo entre """ Codigo Aqui dentro """
    1 **Faça o Estilo usando de ${input_search.value} é use <style></style> faça o body padrão é 
        -Faça a Font se adptar de acordo com o tema para os <p> adptar as cores por exemplo se o tema for dark usar cores white
        -Para cada elemento ultizar o display:Flex;
        -Para cada elmento coloque o width:100%:
        -para cada elemento use o Gap;
        -para cada elemento use class unicas e estilos unicos
    **
    - No Estilo não quero estilo nem **Body**

    2**Dentro do Body Coloque esse Codigo aqui porem vc vai adptar ao tema que a pessoa pediu que é ${input_search.value} **:
    '
        <div class='cartao'>
            <!-- Aqui Colocar Titulo -->
            <h1>[]</h1>
            <!-- Aqui Sobre o tema : Pequeno Texto -->
            <p>[]</p>
            <!-- Aqui Colocar Msg para Descriptgrafar -->
            <p>[]</p>
            <textarea id='texto_codificado' class='texto_codificado' placeholder='Digite o texto codificado aqui' disabled></textarea>
            <input type='password' class='password' id='senha' placeholder='Digite a senha'>
            <button class='descriptografar'>Descriptografar 🔓</button>
            <textarea id='texto_decifrado' class='texto_decifrado' placeholder='Texto decifrado aparecerá aqui' readonly></textarea>
        </div>
    '

    Aguardo o código completo. Obrigado!
`

    function Question(question) {
        return question
    }
    const questao = Question(question)
    
    const data = {
        messages: [{ "content": questao , "role": "user" }],
        previewToken: null,
        userId: "6e75da85-5501-4825-ae6b-cd19543d582c",
        codeModelMode: true,
        agentMode: {},
        trendingAgentMode: {},
        isMicMode: false,
        isChromeExt: false,
        githubToken: null
    };



    const headers = {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        "Date": "Tue, 09 Apr 2024 20:26:03 GMT",
        "Transfer-Encoding": "chunked",
        "Connection": "keep-alive",
        "CF-Ray": "871d3add5d4779f1-GIG",
        "CF-Cache-Status": "DYNAMIC",
        "Cache-Control": "private, no-cache, no-store, max-age=0, must-revalidate",
        "Content-Encoding": "gzip",
        "Set-Cookie": "sessionId=eda2d978-14ca-40c0-8b9d-8fea4d07bf98; Path=/; Expires=Sun, 08 Apr 2029 20:26:03 GMT",
        "Vary": "RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Url, Accept-Encoding",
        "rndr-id": "9f3df134-ca16-458d",
        "x-powered-by": "Next.js",
        "x-render-origin-server": "Render",
        "Server": "cloudflare",
        "alt-svc": "h3=\":443\"; ma=86400"
    };

    container_frame.innerHTML = `
        <div class="loader"></div>
    `
    // btn_save.disabled = true
    // select_metodo_save.disabled = true

    fetch(proxyUrl + targetUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na requisição: ' + response.statusText);
            }
            return response.text();
        })
        .then(responseText => {
            container_frame.innerHTML = ``

            // console.log(responseText)
            
            // Expressão regular para extrair o conteúdo dentro das marcações """ ... """
            const regex = /"""([\s\S]*)"""/;
            const matches = responseText.match(regex);

            if (matches && matches.length > 1) {
                const codigoHTMLCSS = matches[1];
                // console.log(codigoHTMLCSS);
                btn_save.addEventListener('click', async () => {
                    // alert('salvando')
                    saveDB(input_search.value, codigoHTMLCSS)
                });

                container_frame.innerHTML = `
                <div class="frame">
                    ${codigoHTMLCSS}
                </div>
            `
            } else {
                console.log('Não foi possível encontrar o código dentro das marcações """ ... """');
            }



        })
        .catch(error => {
            // container_frame.innerHTML = ``
            // container_frame.innerHTML = `
            //     <button class='proxy-button'>Veja as Configurarações de Proxy</button>
            // `
            console.error('Erro na requisição:', error);
        });

})