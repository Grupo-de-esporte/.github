document.addEventListener("DOMContentLoaded", function() {
    const gruposContainer = document.getElementById('grupos-row');
    const emptyMessage = document.getElementById('empty-message');

    function loadGroups() {
        gruposContainer.innerHTML = '';
        const gruposJSON = localStorage.getItem('grupos');
        let grupos = gruposJSON ? JSON.parse(gruposJSON) : [];
        const user = JSON.parse(localStorage.getItem('usuarioLogado')).usuario;

        // Filtrar grupos onde o dono é igual ao usuário logado
        grupos = grupos.filter(grupo => grupo.Criador === user);

        if (grupos.length === 0 ) {
            emptyMessage.style.display = 'block';
        } else {
            emptyMessage.style.display = 'none';
            grupos.slice(0, 4).forEach((grupo, index) => {
                const col = document.createElement('div');
                col.className = 'col-md-6';

                const card = document.createElement('div');
                card.className = 'card grupo';

                const title = document.createElement('h2');
                title.textContent = grupo.nome;

                const date = document.createElement('p');
                date.textContent = grupo.data;

                const location = document.createElement('p');
                location.textContent = grupo.local;

                const sport = document.createElement('p');
                sport.textContent = grupo.esporte;

                const imageNumber = grupo.imagem;
                let imageName;
                if (grupo.esporte.toLowerCase() === "futebol") {
                    imageName = `futebol${imageNumber}.png`;
                } else if (grupo.esporte.toLowerCase() === "volei") {
                    imageName = `volei${imageNumber}.png`;
                } else if (grupo.esporte.toLowerCase() === "basquete") {
                    imageName = `basquete${imageNumber}.png`;
                } else {
                    imageName = `default.png`;
                }

                const img = document.createElement('img');
                img.src = `assets/img/${imageName}`;
                img.alt = grupo.esporte;
                img.className = 'card-img-top';

                const imgContainer = document.createElement('div');
                imgContainer.className = 'card-img-container';
                imgContainer.appendChild(img);

                card.appendChild(imgContainer);
                card.appendChild(title);
                card.appendChild(date);
                card.appendChild(location);
                card.appendChild(sport);

                const deleteButton = document.createElement('button');
                deleteButton.className = 'deletar-button';
                deleteButton.textContent = 'DELETAR';
                deleteButton.onclick = () => showConfirmDelete(card, index, deleteButton);

                card.appendChild(deleteButton);

                col.appendChild(card);
                gruposContainer.appendChild(col);
            });
        }
    }

    function showConfirmDelete(card, index, deleteButton) {
        if (card.querySelector('.confirm-delete')) {
            return;
        }

        deleteButton.disabled = true;

        const confirmDiv = document.createElement('div');
        confirmDiv.className = 'confirm-delete';

        const confirmText = document.createElement('p');
        confirmText.textContent = 'Tem certeza que deseja deletar este grupo?';

        const yesButton = document.createElement('button');
        yesButton.className = 'confirm-yes';
        yesButton.textContent = 'Sim';
        yesButton.onclick = () => deleteGroup(index);

        const noButton = document.createElement('button');
        noButton.className = 'confirm-no';
        noButton.textContent = 'Não';
        noButton.onclick = () => {
            card.removeChild(confirmDiv);
            deleteButton.disabled = false;
        };

        confirmDiv.appendChild(confirmText);
        confirmDiv.appendChild(yesButton);
        confirmDiv.appendChild(noButton);

        card.appendChild(confirmDiv);
    }

    function deleteGroup(index) {
        const gruposJSON = localStorage.getItem('grupos');
        let grupos = gruposJSON ? JSON.parse(gruposJSON) : [];
        grupos.splice(index, 1);
        localStorage.setItem('grupos', JSON.stringify(grupos));
        loadGroups();
    }

    loadGroups();
});
