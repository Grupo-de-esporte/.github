document.addEventListener("DOMContentLoaded", function() {
    const gruposContainer = document.getElementById('grupos-row');
    const emptyMessage = document.getElementById('empty-message');

    function loadGroups() {
        gruposContainer.innerHTML = '';
        const gruposJSON = localStorage.getItem('grupos');
        let grupos = gruposJSON ? JSON.parse(gruposJSON) : [];

        if (grupos.length === 0) {
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

                col.appendChild(card);
                gruposContainer.appendChild(col);
            });
        }
    }

    loadGroups();
});
