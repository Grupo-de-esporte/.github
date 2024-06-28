function cards() {
    // Obter a lista de usuários cadastrados do armazenamento local
    let usuariosCadastrados = JSON.parse(localStorage.getItem("usuarios"));
    let usuarioLogado = JSON.parse(localStorage.getItem("logado"));

    
    // Selecionar o elemento onde os cards serão adicionados
    let container = document.getElementById("container-dos-cards");

    // Limpar o container antes de adicionar os novos cards
    container.innerHTML = '';

    // Iterar sobre a lista de usuários cadastrados
    for (let id in usuariosCadastrados) {
        let usuario = usuariosCadastrados[id];
    
        // Verificar se o usuário não é o usuário logado
        if (usuario.id !== usuarioLogado.id) {
            // Criar elementos do card
            let cardDiv = `<div class="card mb-3" id="carddoperfilvisualizavel">
                                <div class="row g-0">
                                    <div class="col-md-8">
                                        <div class="card-body" id="nomeperfilvisualizavel">
                                            <h5 class="card-title">@${usuario.user}</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>`;
    
            // Criar o link para o perfil escolhido
            let link = `<a href="perfilescolhido.html?id=${usuario.id}">${cardDiv}</a>`;
    
            // Adicionar o card ao container
            container.insertAdjacentHTML('beforeend', link);
        }
    }
}


document.addEventListener("DOMContentLoaded", function () {
    cards();
});


// Exemplo de JavaScript para filtrar os perfis conforme o usuário digita
function preenchePerfil() {
    // Código para preencher os perfis na div #container-dos-cards
}

// Exemplo de evento para buscar perfis ao clicar no botão de busca
document.querySelector('.search-button').addEventListener('click', function() {
    var searchTerm = document.querySelector('.search-input').value;
    // Lógica para buscar perfis com base em searchTerm
});