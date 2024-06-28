// Função para carregar dados do localStorage ou usar dados padrão se não houver
function loadData() {
    let profileData = JSON.parse(localStorage.getItem('usuarioLogado')) || {
        "usuario": "user1",  // Dados padrão se nenhum estiver armazenado
        "senha": "defaultPassword"  // Senha padrão, só para exemplo
    };

    let commentsData = JSON.parse(localStorage.getItem('commentsData')) || {
        "ComentariosUserx": {
            "user1": "Muito lindo"
        }
    };

    let loginData = JSON.parse(localStorage.getItem('login')) || { contatos: [] };

    return { profileData, commentsData, loginData };
}

// Função para salvar dados no localStorage
function saveData(profileData, commentsData, loginData) {
    localStorage.setItem('usuarioLogado', JSON.stringify(profileData));
    localStorage.setItem('commentsData', JSON.stringify(commentsData));
    localStorage.setItem('login', JSON.stringify(loginData));
}

// Função para carregar o perfil e comentários na página
function loadProfile() {
    const { profileData, commentsData } = loadData();

    const usernameDisplay = document.getElementById('usernameDisplay');
    const usernameTitle = document.getElementById('usernameTitle');
    usernameDisplay.textContent = profileData.usuario;
    usernameTitle.textContent = `(${profileData.usuario})`;

    const passwordDisplay = document.getElementById('passwordDisplay');
    passwordDisplay.textContent = "*********"; // Ajuste conforme necessário

    const commentsList = document.getElementById('commentsList');
    commentsList.innerHTML = ''; // Limpa a lista de comentários antes de recarregar

    for (const user in commentsData.ComentariosUserx) {
        const comment = commentsData.ComentariosUserx[user];
        const listItem = document.createElement('li');
        listItem.textContent = `${user}: ${comment}`;

        const likeButton = document.createElement('button');
        likeButton.textContent = 'Curtir';
        likeButton.addEventListener('click', function() {
            alert(`Você curtiu o comentário de ${user}: ${comment}`);
        });

        listItem.appendChild(likeButton);
        commentsList.appendChild(listItem);
    }
}

// Função para atualizar nome de usuário nos contatos
function updateUsernameInContacts(oldUsername, newUsername, loginData) {
    loginData.contatos = loginData.contatos.map(contato => {
        if (contato.nome === oldUsername) {
            return { ...contato, nome: newUsername };
        }
        return contato;
    });
}

// Função para atualizar senha nos contatos
function updatePasswordInContacts(username, newPassword, loginData) {
    loginData.contatos = loginData.contatos.map(contato => {
        if (contato.nome === username) {
            return { ...contato, senha: newPassword };
        }
        return contato;
    });
}

// Função para alterar o nome de usuário
function changeUsername() {
    const { profileData, commentsData, loginData } = loadData();
    const oldUsername = profileData.usuario;

    const newUsername = prompt("Digite um novo nome de usuário:");
    if (newUsername) {
        profileData.usuario = newUsername;

        // Atualiza o nome do contato nos dados de login
        updateUsernameInContacts(oldUsername, newUsername, loginData);

        // Salvar os dados atualizados
        saveData(profileData, commentsData, loginData);

        // Atualiza o nome de usuário na tela
        const usernameDisplay = document.getElementById('usernameDisplay');
        const usernameTitle = document.getElementById('usernameTitle');
        usernameDisplay.textContent = newUsername;
        usernameTitle.textContent = `(${newUsername})`;
    }
}

// Função para alterar a senha
function changePassword() {
    const { profileData, commentsData, loginData } = loadData();
    const username = profileData.usuario;

    const newPassword = prompt("Digite uma nova senha:");
    if (newPassword) {
        profileData.senha = newPassword;

        // Atualiza a senha do contato nos dados de login
        updatePasswordInContacts(username, newPassword, loginData);

        // Salvar os dados atualizados
        saveData(profileData, commentsData, loginData);

        alert("Senha alterada com sucesso!");
    }
}

document.addEventListener('DOMContentLoaded', function() {
    loadProfile();
});
