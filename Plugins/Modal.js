class Modal {
    constructor(modalId, buttonId, elementoEmpyt = null, actions = []) {
        this.modal = document.getElementById(modalId);
        this.openModalBtn = document.getElementById(buttonId);
        this.closeModalSpan = this.modal.querySelector('.close');
        this.elementoEmpyt = elementoEmpyt ? document.getElementById(elementoEmpyt) : null;
        this.actions = actions;

        this.initializeEvents();
    }

    initializeEvents() {
        this.openModalBtn.addEventListener('click', () => this.handleOpenModal());
        this.closeModalSpan.addEventListener('click', () => this.closeModal());
        window.addEventListener('click', (event) => this.windowOnClick(event));

        // Executa ações ao abrir o modal
        this.modal.addEventListener('modal:opened', () => {
            this.executeActions();
        });
    }

    handleOpenModal() {
        if (this.elementoEmpyt && !this.elementoEmpyt.value.trim()) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Preencha os Campos vazios!",
                customClass: {
                    title: 'swal-title',
                    content: 'swal-content',
                    footer: 'swal-content'
                }
            });
        } else {
            this.openModal();
            // Dispara evento de modal aberto
            const event = new Event('modal:opened');
            this.modal.dispatchEvent(event);
        }
    }

    openModal() {
        this.modal.style.display = "block";
        this.modal.style.display = "flex";
    }

    closeModal() {
        this.modal.style.display = "none";
    }

    windowOnClick(event) {
        if (event.target === this.modal) {
            this.closeModal();
        }
    }

    executeActions() {
        this.actions.forEach(actionObj => {
            const selector = Object.keys(actionObj)[0]; // Pegando o primeiro e único seletor
            const action = actionObj[selector]; // Pegando a função de ação associada

            const elementoAction = this.modal.querySelector(selector);
            if (elementoAction) {
                action(elementoAction); // Executa a função de ação passando o elemento alvo
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const modals = [
        { modalId: 'modal-skins', buttonId: 'openModalSkins', elementoEmpyt: 'texto_codificado', actions: [] },
        { modalId: 'modal-paint', buttonId: 'openModalPaint', elementoEmpyt: 'texto_codificado', actions: [] },
        { modalId: 'modal-history', buttonId: 'openModalHistory', actions: [{ 'tbody': loadTemplates }] },
        { modalId: 'modal-import', buttonId: 'gooey-button'},
        { modalId: 'modal-configuration', buttonId: 'openModalConfigurationBtn'}
    ];

    modals.forEach(modal => {
        new Modal(modal.modalId, modal.buttonId, modal.elementoEmpyt, modal.actions);
    });
});