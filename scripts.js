document.querySelector('button').addEventListener('click', function() {
    let question = document.querySelector('textarea').value;
    if (question.trim() === '') {
        alert('Por favor, digite sua pergunta.');
    } else {
        alert('Pergunta enviada!');
       
    }
});
