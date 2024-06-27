function adicionarAvaliacao() {
    
    const nomeUsuario = JSON.parse(localStorage.getItem("usuarioLogado")).usuario;
    const comentarioAvaliacao = document.getElementById("comentarioAvaliacao").value;
    if (comentarioAvaliacao.trim() !== "") {
        const avaliacoes = JSON.parse(localStorage.getItem("avaliacoes")) || [];
        avaliacoes.push({ usuario: nomeUsuario, comentario: comentarioAvaliacao });
        localStorage.setItem("avaliacoes", JSON.stringify(avaliacoes));
        exibirAvaliacoes();
        document.getElementById("comentarioAvaliacao").value = ""; // Limpa o campo de avaliação
    }
}

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
        div.innerHTML = `<strong>${avaliacao.usuario}</strong>: <br> ${avaliacao.comentario}`;

        // Adiciona um botão de excluir com um ícone de lixeira usando SVG
        const botaoExcluir = document.createElement("button");
        botaoExcluir.innerHTML = `<i class="fa-solid fa-trash"></i>`;
        botaoExcluir.addEventListener("click", () => excluirAvaliacao(index));
        div.appendChild(botaoExcluir);

        listaAvaliacoesElement.appendChild(div);
    });
}

function preenchePerfil() {
    // Obter a lista de usuários cadastrados do armazenamento local
    let usuariosCadastrados = JSON.parse(localStorage.getItem("usuarios"));
    let usuarioLogado = JSON.parse(localStorage.getItem("logado"));

    // Verificar se o usuário logado está presente na lista de usuários cadastrados
    for (let id in usuariosCadastrados) {
        console.log(usuarioLogado, usuariosCadastrados[id].id)
        if (usuarioLogado.id === usuariosCadastrados[id].id) {
            let titulo = document.getElementById("user");
            let nome = document.getElementById("nome");
            let texto = document.getElementById("texto");

            console.log(titulo, nome, texto); // Verifique se os elementos foram encontrados

            titulo.textContent = "Usuario: " + usuariosCadastrados[id].user;
            nome.textContent = "Nome: " + usuariosCadastrados[id].nomeUsuario;
            texto.textContent = "Descrição: " + usuariosCadastrados[id].descricao;

        }
    }
}


function alteraPerfil() {
    // Obter o usuário logado
    let usuarioLogado = JSON.parse(localStorage.getItem("logado"));

    // Obter os elementos de texto para edição
    let nomeElement = document.getElementById("nome");
    let textoElement = document.getElementById("texto");

    // Criar campos de entrada para editar nome e descrição
    let novoNomeInput = document.createElement("input");
    novoNomeInput.type = "text";
    novoNomeInput.value = nomeElement.textContent.split(": ")[1]; // Remove "Nome: " do conteúdo atual
    let novaDescricaoInput = document.createElement("textarea");
    novaDescricaoInput.value = textoElement.textContent.split(": ")[1]; // Remove "Descrição: " do conteúdo atual

    // Substituir os elementos de texto pelos campos de entrada
    nomeElement.innerHTML = ""; // Limpar conteúdo anterior
    nomeElement.appendChild(novoNomeInput);
    textoElement.innerHTML = ""; // Limpar conteúdo anterior
    textoElement.appendChild(novaDescricaoInput);

    // Criar botão de confirmação
    let botaoConfirmar = document.createElement("button");
    botaoConfirmar.textContent = "Confirmar";
    botaoConfirmar.onclick = function() {
        // Obter os novos valores dos campos de entrada
        let novoNome = novoNomeInput.value;
        let novaDescricao = novaDescricaoInput.value;

        // Atualizar as informações do perfil no armazenamento local
        let usuariosCadastrados = JSON.parse(localStorage.getItem("usuarios"));

        let usuarioId = 1; // Aqui você define o id do usuário desejado

        let usuario = usuariosCadastrados["usuario" + usuarioId];

        usuario.nomeUsuario = novoNome;
        usuario.descricao = novaDescricao;
        localStorage.setItem("usuarios", JSON.stringify(usuariosCadastrados));

        // Remover o botão de confirmação
        botaoConfirmar.remove();

        // Atualizar a exibição do perfil na página
        preenchePerfil();
    };

    // Adicionar botão de confirmação abaixo dos campos de entrada
    textoElement.parentNode.insertBefore(botaoConfirmar, textoElement.nextSibling);
}



// Função para salvar usuários e usuário logado no armazenamento local (apenas para teste)


document.addEventListener("DOMContentLoaded", function () {
    preenchePerfil();
});


// Carrega as avaliações ao carregar a página
exibirAvaliacoes();