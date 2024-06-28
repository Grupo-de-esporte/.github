document.addEventListener("DOMContentLoaded", function() {
    function exibirComentarios() {
        // Obtém o ID da URL
        const urlParams = new URLSearchParams(window.location.search);
        const idURL = parseInt(urlParams.get('id'));

        // Obtém os dados do localStorage
        const usuariosCadastrados = JSON.parse(localStorage.getItem("usuarios"));

        // Verifica se o usuário com o ID fornecido existe
        if (usuariosCadastrados && usuariosCadastrados[`usuario${idURL + 1}`]) {
            const usuario = usuariosCadastrados[`usuario${idURL + 1}`];
            const comentarios = usuario.comentarios;

            // Seleciona o elemento onde os comentários serão exibidos
            const listaComentariosElement = document.getElementById("listaAvaliacoes");

            // Limpa o conteúdo anterior
            listaComentariosElement.innerHTML = "";
            // Verifica se o usuário possui comentários
            if (comentarios) {
                // Itera sobre os comentários e os adiciona ao elemento na tela
                for (const key in comentarios) {
                    if (comentarios.hasOwnProperty(key)) {
                        const comentario = comentarios[key];
                        const div = document.createElement("div");
                        div.textContent = `${key}: ${comentario}`;
                        listaComentariosElement.appendChild(div);
                    }
                }
            } else {
                console.log("O usuário não possui comentários.");
            }
        } else {
            console.log(`Não há usuário com o ID ${idURL} no localStorage.`);
        }
    }
    
    // Chame a função para exibir os comentários
    exibirComentarios();
});

document.addEventListener("DOMContentLoaded", function() {
    function preenchePerfil() {
        // Obter a lista de usuários cadastrados do armazenamento local
        let usuariosCadastrados = JSON.parse(localStorage.getItem("usuarios"));
        let usuarioLogado = JSON.parse(localStorage.getItem("logado"));
        // Obtém o ID da URL
        const urlParams = new URLSearchParams(window.location.search);
        const idURL = parseInt(urlParams.get('id'));
    
        // Verificar se o usuário logado está presente na lista de usuários cadastrados
        for (let id in usuariosCadastrados) {
            console.log(usuarioLogado, usuariosCadastrados[id].id)
            if (idURL === usuariosCadastrados[id].id) {
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
    
    // Chame a função para exibir os comentários
    preenchePerfil();
});


function adicionarAvaliacao() {
    const comentario = document.getElementById("comentarioAvaliacao").value;
    const idURL = parseInt(new URLSearchParams(window.location.search).get('id'));
    const usuariosCadastrados = JSON.parse(localStorage.getItem("usuarios"));

    if (usuariosCadastrados && usuariosCadastrados[`usuario${idURL + 1}`]) {
        const usuario = usuariosCadastrados[`usuario${idURL + 1}`];
        const comentarios = usuario.comentarios || {};

        // Adiciona o novo comentário ao objeto de comentários do usuário
        const novoComentarioKey = `comentario${Object.keys(comentarios).length}`;
        comentarios[novoComentarioKey] = comentario;

        // Atualiza o objeto de usuário no localStorage
        usuario.comentarios = comentarios;
        localStorage.setItem("usuarios", JSON.stringify(usuariosCadastrados));

        // Chama a função para exibir os comentários novamente
        exibirComentarios();

        // Limpa o campo de texto após adicionar o comentário
        document.getElementById("comentarioAvaliacao").value = "";
    } else {
        alert("Usuário não encontrado.");
    }
}

function exibirComentarios() {
    // Obtém o ID da URL
    const urlParams = new URLSearchParams(window.location.search);
    const idURL = parseInt(urlParams.get('id'));

    // Obtém os dados do localStorage
    const usuariosCadastrados = JSON.parse(localStorage.getItem("usuarios"));

    // Verifica se o usuário com o ID fornecido existe
    if (usuariosCadastrados && usuariosCadastrados[`usuario${idURL + 1}`]) {
        const usuario = usuariosCadastrados[`usuario${idURL + 1}`];
        const comentarios = usuario.comentarios;

        // Seleciona o elemento onde os comentários serão exibidos
        const listaComentariosElement = document.getElementById("listaAvaliacoes");

        // Limpa o conteúdo anterior
        listaComentariosElement.innerHTML = "";
        // Verifica se o usuário possui comentários
        if (comentarios) {
            // Itera sobre os comentários e os adiciona ao elemento na tela
            for (const key in comentarios) {
                if (comentarios.hasOwnProperty(key)) {
                    const comentario = comentarios[key];
                    const div = document.createElement("div");
                    div.textContent = `${key}: ${comentario}`;
                    listaComentariosElement.appendChild(div);
                }
            }
        } else {
            console.log("O usuário não possui comentários.");
        }
    } else {
        console.log(`Não há usuário com o ID ${idURL} no localStorage.`);
    }
}