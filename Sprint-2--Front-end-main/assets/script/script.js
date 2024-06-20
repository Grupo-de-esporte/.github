function adicionarAvaliacao() {
    const nomeUsuario = "@OtonielTheGoulart"; // Nome de usuário fixo
    const comentarioAvaliacao = document.getElementById("comentarioAvaliacao").value;
    if (comentarioAvaliacao.trim() !== "") {
        const avaliacoes = JSON.parse(localStorage.getItem("avaliacoes")) || [];
        avaliacoes.push({ usuario: nomeUsuario, comentario: comentarioAvaliacao });
        localStorage.setItem("avaliacoes", JSON.stringify(avaliacoes));
        exibirAvaliacoes();
        document.getElementById("comentarioAvaliacao").value = ""; // Limpa o campo de avaliação
    }
}

function exibirAvaliacoes() {
    const avaliacoes = JSON.parse(localStorage.getItem("avaliacoes")) || [];
    const listaAvaliacoesElement = document.getElementById("listaAvaliacoes");
    listaAvaliacoesElement.innerHTML = "";
    avaliacoes.forEach((avaliacao) => {
        const div = document.createElement("div");
        div.innerHTML = `<strong>${avaliacao.usuario}</strong>: ${avaliacao.comentario}`;
        listaAvaliacoesElement.appendChild(div);
    });
}

// Carrega as avaliações ao carregar a página
exibirAvaliacoes();

function excluirAvaliacao(index) {
    const avaliacoes = JSON.parse(localStorage.getItem("avaliacoes")) || [];
    avaliacoes.splice(index, 1); // Remove a avaliação pelo índice
    localStorage.setItem("avaliacoes", JSON.stringify(avaliacoes));
    exibirAvaliacoes();
} 

function exibirAvaliacoes() {
    const avaliacoes = JSON.parse(localStorage.getItem("avaliacoes")) || [];
    const listaAvaliacoesElement = document.getElementById("listaAvaliacoes");
    listaAvaliacoesElement.innerHTML = "";
    avaliacoes.forEach((avaliacao, index) => {
        const div = document.createElement("div");
        div.innerHTML = `<strong>${avaliacao.usuario}</strong>: <br> ${avaliacao.comentario}
            `;
        listaAvaliacoesElement.appendChild(div);
    });
}

// Carrega as avaliações ao carregar a página
exibirAvaliacoes();