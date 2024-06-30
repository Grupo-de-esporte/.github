// Função para carregar dados do localStorage ou usar dados padrão se não houver
photoSelector.style.display = 'none';
function loadData() {
    console.log('Loading data...');
    let profileData = JSON.parse(localStorage.getItem('usuarioLogado')) || {
        "usuario": "user1",
    };

    let commentsData = JSON.parse(localStorage.getItem('commentsData')) || {
        "ComentariosUserx": {
            "user1": "Muito lindo"
        }
    };

    let loginData = JSON.parse(localStorage.getItem('login'));

    let index = loginData.contatos.findIndex(contato => contato.nome === profileData.usuario);
    if (index !== -1) {
        profileData.bio = loginData.contatos[index].bio;
    }

    return { profileData, commentsData, loginData, index };
}

// Função para salvar dados do perfil no localStorage
function saveProfileData(profileData, commentsData, loginData) {
    localStorage.setItem('usuarioLogado', JSON.stringify(profileData));
    localStorage.setItem('commentsData', JSON.stringify(commentsData));
    localStorage.setItem('login', JSON.stringify(loginData));
}

// Função para exibir a foto do usuário
function exibirFotoUsuario() {
    const { profileData, loginData, index } = loadData();

    if (index !== -1) {
        const fotoIndex = loginData.contatos[index].foto;
        const fotoElement = document.getElementById('userPhoto');
        
        if (fotoElement) {
            fotoElement.src = `assets/img/perfil${fotoIndex}.jpg`; // Nome da foto baseado no índice
        } else {
            console.error("Element with ID 'userPhoto' not found");
        }
    } else {
        console.error("User not found in loginData");
    }
}

// Função para abrir o seletor de imagens
function abrirSeletorDeImagens() {
    const { loginData, index } = loadData();
    const fotoIndex = loginData.contatos[index].foto;

    const photoSelector = document.getElementById('photoSelector');
    const photoOptions = document.getElementById('photoOptions');

    photoOptions.innerHTML = ''; // Limpa as opções anteriores

    for (let i = 0; i < 5; i++) {
        if (i !== fotoIndex) {
            const imgOption = document.createElement('img');
            imgOption.src = `assets/img/perfil${i}.jpg`;
            imgOption.classList.add('photo-option');
            imgOption.dataset.index = i; // Armazena o índice da imagem
            imgOption.addEventListener('click', selecionarImagem);
            photoOptions.appendChild(imgOption);
        }
    }

    photoSelector.style.display = 'block';
    photoSelector.style.position = 'fixed';
    photoSelector.style.top = '50%';
    photoSelector.style.left = '50%';
    photoSelector.style.transform = 'translate(-50%, -50%)'; // Mostra o seletor de imagens
}

// Função para selecionar uma imagem
function selecionarImagem(event) {
    const selectedPhoto = document.querySelector('.photo-option.selected');
    if (selectedPhoto) {
        selectedPhoto.classList.remove('selected');
    }
    event.target.classList.add('selected');
}

// Função para confirmar a seleção de imagem
function confirmarImagem() {
    const selectedPhoto = document.querySelector('.photo-option.selected');
    if (selectedPhoto) {
        const newPhotoIndex = selectedPhoto.dataset.index;
        const { profileData, commentsData, loginData, index } = loadData();

        // Atualiza o índice da foto no objeto de loginData se o usuário estiver presente nos contatos
        if (index !== -1) {
            loginData.contatos[index].foto = parseInt(newPhotoIndex, 10);
            saveProfileData(profileData, commentsData, loginData); // Salva os dados atualizados no localStorage
            exibirFotoUsuario(); // Atualiza a foto exibida
            alert("Foto alterada com sucesso!");
        }
    }

    const photoSelector = document.getElementById('photoSelector');
    photoSelector.style.display = 'none'; // Esconde o seletor de imagens
}

document.addEventListener('DOMContentLoaded', function () {
    console.log('Document loaded');
    loadProfile();
    exibirFotoUsuario(); // Chama a função para exibir a foto do usuário

    const editPhotoButton = document.getElementById('editPhotoButton');
    editPhotoButton.addEventListener('click', abrirSeletorDeImagens);

    const confirmPhotoButton = document.getElementById('confirmPhotoButton');
    confirmPhotoButton.addEventListener('click', confirmarImagem);
});

function loadProfile() {
    const { profileData, commentsData, loginData, index } = loadData();

    console.log('Loaded profile data:', profileData);

    const usernameDisplay = document.getElementById('usernameDisplay');
    if (usernameDisplay) {
        usernameDisplay.textContent = profileData.usuario; // Exibir o nome de usuário
    } else {
        console.error("Element with ID 'usernameDisplay' not found");
    }

    const passwordDisplay = document.getElementById('passwordDisplay');
    if (passwordDisplay) {
        passwordDisplay.textContent = "*********"; // Ajuste conforme necessário
    } else {
        console.error("Element with ID 'passwordDisplay' not found");
    }

    const bioElement = document.getElementById('bio');
    if (bioElement) {
        if (index !== -1) {
            bioElement.innerText = loginData.contatos[index].bio;
        } else {
            bioElement.innerText = "Bio não encontrada";
        }
    } else {
        console.error("Element with ID 'bio' not found");
    }
    const commentsList = document.getElementById('commentsList');
    commentsList.innerHTML = ''; // Limpa a lista de comentários antes de recarregar

    for (const user in commentsData.ComentariosUserx) {
        const comment = commentsData.ComentariosUserx[user];
        const listItem = document.createElement('li');
        listItem.textContent = `${user}: ${comment}`;

        const likeButton = document.createElement('button');
        likeButton.textContent = 'Curtir';
        likeButton.addEventListener('click', function () {
            alert(`Você curtiu o comentário de ${user}: ${comment}`);
        });

        listItem.appendChild(likeButton);
        commentsList.appendChild(listItem);
    }
}

// Função para salvar a bio editada
function saveBio() {
    const { profileData, commentsData, loginData } = loadData();
    const newBio = document.getElementById('bio').textContent;

    // Atualiza a bio no objeto de loginData se o usuário estiver presente nos contatos
    const index = loginData.contatos.findIndex(contato => contato.nome === profileData.usuario);
    if (index !== -1) {
        loginData.contatos[index].bio = newBio;
    }

    saveProfileData(profileData, commentsData, loginData); // Salva os dados atualizados no localStorage

    alert("Bio salva com sucesso!");
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
        saveProfileData(profileData, commentsData, loginData);

        // Atualiza o nome de usuário na tela
        const usernameDisplay = document.getElementById('usernameDisplay');
        usernameDisplay.textContent = newUsername;
    }
}

// Função para alterar a senha
function changePassword() {
    const { profileData, commentsData, loginData } = loadData();
    const newPassword = prompt("Digite sua nova senha:");

    if (newPassword) {
        profileData.senha = newPassword;

        // Atualiza a senha nos contatos
        updatePasswordInContacts(profileData.usuario, newPassword, loginData);

        // Salva os dados atualizados
        saveProfileData(profileData, commentsData, loginData);

        // Atualiza a exibição de senha na tela (opcional, depende de como deseja exibir)
        const passwordDisplay = document.getElementById('passwordDisplay');
        passwordDisplay.textContent = "*********";
        
        alert("Senha alterada com sucesso!");
    }
}
