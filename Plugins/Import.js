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
