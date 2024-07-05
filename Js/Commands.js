function inicializarCommands() {
    const btn_copiar = document.querySelector(".copiar");
    const inputTextoCodificado = document.querySelector("#texto_codificado");

    btn_copiar.addEventListener('click', () => {
        // Cria um textarea temporário
        const tempTextarea = document.createElement('textarea');
        tempTextarea.value = inputTextoCodificado.value;
        document.body.appendChild(tempTextarea);
        // Seleciona e copia o texto do textarea temporário
        tempTextarea.select();
        document.execCommand('copy');
        // Remove o textarea temporário
        document.body.removeChild(tempTextarea);
        // Mostra o alerta
        Swal.fire({
            title: "Item Copiado !!!",
            icon: "success",
            customClass: {
                title: 'swal-title',
                content: 'swal-content'
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    inicializarCommands();
});
