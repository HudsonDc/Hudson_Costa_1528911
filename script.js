// Obtém o nome da obra a partir da URL
const urlParams = new URLSearchParams(window.location.search);
const obraNome = urlParams.get('obra');

fetch('../dados_pinturas.json')
  .then(res => res.json())
  .then(json => {
    if (!obraNome) {
      console.error('Nome da obra não especificado na URL');
      return;
    }

    const obra = json[0].dados.find(o => o.nome === obraNome);
    
    if (!obra) {
      console.error('Obra não encontrada:', obraNome);
      return;
    }

    const container = document.getElementById('card-container');

    container.innerHTML = `
      <img src="../${obra.imagem}" class="d-block mx-auto" style="max-height: 300px; object-fit: contain;" alt="Imagem da Pintura ${obra.nome}">
      <div class="card-body">
        <h5 class="card-title">${obra.nome}</h5>
        <p class="card-text"><strong>Autor:</strong> ${obra.autor}</p>
        <p class="card-text"><strong>Ano:</strong> ${obra.ano}</p>
        <p class="card-text"><strong>Técnica:</strong> ${obra.tecnica}</p>
        <p class="card-text"><strong>Estilo:</strong> ${obra.estilo}</p>
        <p class="card-text"><strong>Localização:</strong> ${obra.localizacao}</p>
        <p class="card-text">${obra.descricao}</p>
      </div>
    `;
  })
  .catch(error => {
    console.error('Erro ao carregar os dados:', error);
  });