document.querySelector('button').addEventListener('click', function() {
    let textarea = document.querySelector('textarea');
    let question = textarea.value.trim(); // Obtém o valor do textarea e remove espaços em branco extras

    if (question === '') {
        alert('Por favor, digite sua pergunta.');
    } else {
        alert('Pergunta enviada!');
        textarea.value = ''; // Limpa o conteúdo da caixa de mensagem
    }
});
