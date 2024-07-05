# CripTexto
<img src="./Assets/Screenshots/01.png" alt="" />

## Descrição
O **CripTexto** é uma aplicação web desenvolvida para criptografar e descriptografar textos, além de oferecer funcionalidades adicionais como importação de arquivos PDF e TXT, manipulação de templates e geração de documentos em PDF, você pode usar Temas já prontos ou pode criar seu propios tema usando AI, isso usando um estilo propio de cbt ou seja com base no tema fonercido a AI gerar um tema usando um findTunner Especifico.

## Funcionalidades

- **Criptografar e Descriptografar:** Permite aos usuários inserir texto e realizar operações de criptografia e descriptografia utilizando métodos seguros.
- **Importação de Arquivos:** Suporta importação de arquivos nos formatos PDF e TXT para visualização e manipulação de conteúdo.
- **Templates de Documentos:** Oferece modelos pré-definidos para facilitar a criação de documentos padronizados.
- **Exportação em PDF:** Permite salvar documentos criados como arquivos PDF, com opção de proteção por senha para garantir a segurança dos documentos.
- **Desenho de Templates Personalizados:** Funcionalidade para desenhar templates personalizados diretamente na aplicação, permitindo a criação de layouts únicos.
- **Histórico de Templates:** Mantém um registro de templates criados, facilitando o acesso e a gestão de documentos anteriores.

## Tecnologias Utilizadas

- **Front-end:** HTML, CSS, JavaScript (ES6+)
- **Bibliotecas Externas:**
  - jsPDF: Para geração de documentos em PDF no navegador.
  - pdf.js: Para visualização e extração de texto de arquivos PDF.
  - SweetAlert2: Para exibição de alertas e prompts personalizados.
- **Armazenamento Local:** LocalDB.js para gerenciamento de banco de dados local no navegador, facilitando o armazenamento e recuperação de templates e configurações.

## FLuxo de Segurança
<img src="./Assets/Screenshots/02.png" alt="" />

## Fluxo de Rederização AI
- Entre no `Assistent.js` e Mude Logica eo temperamento da AI para gerar os temas

>[!IMPORTANT]
>Para Criar um FIndTunner bom é necessario adptar esse plugin de assistencia é criar um filtro mais especifico assim criar um filtro mais especifico.

```javascript
btn_search.addEventListener('click', function () {
    
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

  ...

})
```

## Plugins Criados

- Import.js
<img src="./Assets/Screenshots/03.png" alt="" />

>[!ALERT]
>Plugin para Criar as importação com uma Atributo especial chamado `data-type`

```javascript
class FileImporter {
    constructor(buttonSelector, displaySelector) {
        this.buttons = document.querySelectorAll(buttonSelector);
        this.displayElement = document.querySelector(displaySelector);
        this.init();
    }

    init() {
        this.fileInput = document.createElement('input');
        this.fileInput.type = 'file';
        this.fileInput.style.display = 'none';
        document.body.appendChild(this.fileInput);

        this.buttons.forEach(button => {
            button.addEventListener('click', (event) => this.handleButtonClick(event));
        });

        this.fileInput.addEventListener('change', (event) => this.handleFileChange(event));
    }

    handleButtonClick(event) {
        const fileType = event.target.getAttribute('data-type');

        if (fileType === 'txt') {
            this.fileInput.setAttribute('accept', '.txt');
            this.fileInput.click();
        } else if (fileType === 'pdf') {
            this.fileInput.setAttribute('accept', '.pdf');
            this.fileInput.click();
        }
    }

    async handleFileChange(event) {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = async (e) => {
                const content = e.target.result;

                if (file.type === 'application/pdf') {
                    const text = await this.extractTextFromPdf(content);
                    this.displayContent(text);
                } else {
                    this.displayContent(content);
                }
            };

            reader.onerror = (e) => {
                console.error('Erro ao ler o arquivo', e);
            };

            if (file.type === 'application/pdf') {
                reader.readAsArrayBuffer(file);
            } else {
                reader.readAsText(file);
            }

            this.fileInput.value = '';
        } else {
            console.log('Nenhum arquivo selecionado');
        }
    }

    async extractTextFromPdf(arrayBuffer) {
        let loadingTask;

        try {
            loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
            const pdf = await loadingTask.promise;
            let text = '';

            for (let i = 0; i < pdf.numPages; i++) {
                const page = await pdf.getPage(i + 1);
                const textContent = await page.getTextContent();
                const strings = textContent.items.map(item => item.str);
                text += strings.join(' ') + '\n';
            }

            return text;
        } catch (error) {
            if (error.name === 'PasswordException') {
                const { value: password } = await Swal.fire({
                    title: 'PDF protegido',
                    text: 'Digite a senha para abrir o PDF',
                    input: 'password',
                    inputPlaceholder: 'Senha',
                    inputAttributes: {
                        autocapitalize: 'off',
                        autocorrect: 'off'
                    },
                    showCancelButton: true,
                    confirmButtonText: 'Abrir',
                    cancelButtonText: 'Cancelar'
                });

                if (password) {
                    try {
                        loadingTask = pdfjsLib.getDocument({ data: arrayBuffer, password });
                        const pdf = await loadingTask.promise;
                        let text = '';

                        for (let i = 0; i < pdf.numPages; i++) {
                            const page = await pdf.getPage(i + 1);
                            const textContent = await page.getTextContent();
                            const strings = textContent.items.map(item => item.str);
                            text += strings.join(' ') + '\n';
                        }

                        return text;
                    } catch (error) {
                        Swal.fire('Erro', 'Senha incorreta ou erro ao abrir o PDF', 'error');
                        throw error;
                    }
                } else {
                    Swal.fire('Cancelado', 'Operação cancelada pelo usuário', 'info');
                }
            } else {
                console.error('Erro ao extrair texto do PDF', error);
                throw error;
            }
        }
    }

    displayContent(content) {
        this.displayElement.textContent = content;
        Swal.fire({
            icon: 'success',
            title: 'Sucesso!',
            text: 'Arquivo importado com sucesso!',
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const fileImporter = new FileImporter('.sd_import_button button', '#texto_codificar');
});

```

>[!NOTE]
>Para Vizualizar todos os Plugins diponiveis entre em `Plugins`.


## Instalação

1. Clone o repositório: `git clone https://github.com/dvizioon/CRIP-TEXTO.git`
2. Abra o diretório do projeto: `cd CRIP-TEXTO`
3. Abra o arquivo `index.html` no seu navegador web.


## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).
