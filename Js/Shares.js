document.getElementById('shareButton').addEventListener('click', async () => {
    const textToShare = document.getElementById('texto_codificado').value;
    if (navigator.share) {
        try {
            await navigator.share({
                title: 'CripTexto',
                text: textToShare,
                url: window.location.href
            });
            console.log('Successfully shared');
        } catch (error) {
            console.error('Error sharing:', error);
        }
    } else {
        alert('Web Share API not supported in your browser.');
    }
});