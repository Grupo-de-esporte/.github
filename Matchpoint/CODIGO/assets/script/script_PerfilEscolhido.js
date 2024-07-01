document.addEventListener("DOMContentLoaded", function () {
    // Extrair o parâmetro 'id' da URL
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    // Verificar se o 'id' foi encontrado na URL
    if (id) {
        // Obter os dados do localStorage
        const loginData = JSON.parse(localStorage.getItem('login'));
        
        // Verificar se os dados existem e o perfil pode ser encontrado
        if (loginData && loginData.contatos) {
            const perfil = loginData.contatos.find(contato => contato.email === id);

            // Verificar se o perfil foi encontrado
            if (perfil) {
                // Exibir os detalhes do perfil na página
                const perfilDetails = document.getElementById('perfil-details');
                perfilDetails.innerHTML = `
                    <div class="profile">
                        <div class="profile-info">
                            <div class="profile-img">
                                <img src="assets/img/perfil${perfil.foto}.jpg" alt="Foto de perfil">
                            </div>
                            <div class="profile-details">
                                <h1>${perfil.nome}</h1>
                                <div class="bio-section">
                                    <p><strong>Bio:</strong> ${perfil.bio}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            } else {
                // Caso o perfil não seja encontrado
                const perfilDetails = document.getElementById('perfil-details');
                perfilDetails.innerHTML = `<p>Perfil não encontrado.</p>`;
            }
        } else {
            // Caso os dados não existam no localStorage
            const perfilDetails = document.getElementById('perfil-details');
            perfilDetails.innerHTML = `<p>Dados de perfil não encontrados.</p>`;
        }
    } else {
        // Caso o parâmetro 'id' não seja encontrado na URL
        const perfilDetails = document.getElementById('perfil-details');
        perfilDetails.innerHTML = `<p>Parâmetro 'id' não encontrado na URL.</p>`;
    }
});