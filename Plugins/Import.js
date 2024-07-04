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
            alert("Suporte para PDF não está implementado ainda.");
        }
    }

    handleFileChange(event) {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const content = e.target.result;
                this.displayContent(content);
            };

            reader.onerror = (e) => {
                console.error('Erro ao ler o arquivo', e);
            };

            reader.readAsText(file);

            this.fileInput.value = '';
        } else {
            console.log('Nenhum arquivo selecionado');
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
