class Modal {
    constructor(modalId, buttonId) {
        this.modal = document.getElementById(modalId);
        this.openModalBtn = document.getElementById(buttonId);
        this.closeModalSpan = this.modal.querySelector('.close');

        this.initializeEvents();
    }

    initializeEvents() {
        this.openModalBtn.addEventListener('click', () => this.openModal());
        this.closeModalSpan.addEventListener('click', () => this.closeModal());
        window.addEventListener('click', (event) => this.windowOnClick(event));
    }

    openModal() {
        this.modal.style.display = "block";
    }

    closeModal() {
        this.modal.style.display = "none";
    }

    windowOnClick(event) {
        if (event.target == this.modal) {
            this.closeModal();
        }
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const modals = [
        { modalId: 'modal-skins', buttonId: 'openModalSkins' },
    ];

    modals.forEach(modal => {
        new Modal(modal.modalId, modal.buttonId);
    });
});
