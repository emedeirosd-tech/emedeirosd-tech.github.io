// Os dados ficam apenas na memória.
// Se a página for atualizada, eles serão apagados.
let filmes = [];
const app = document.querySelector("#app");
const botoesMenu = document.querySelectorAll("nav button");

function marcarMenuAtivo(rota) {
  botoesMenu.forEach(botao => {
    botao.classList.toggle("ativo", botao.dataset.rota === rota);
  });
}

function irPara(rota) {
  marcarMenuAtivo(rota);

  if (rota === "inicio") mostrarInicio();
  if (rota === "cadastro") mostrarCadastro();
  if (rota === "lista") mostrarLista();
  if (rota === "sobre") mostrarSobre();
}

function mostrarInicio() {
  app.innerHTML = `
    <h1>Sistema de Cadastro de Filmes</h1>
    <p>
      Este é meu Catálogo de Filmes feito com HTML, CSS e JavaScript.
      A navegação acontece sem recarregar a página.
    </p>

    <p>
      Os Filmes cadastrados ficam temporariamente guardados em um array JavaScript.
    </p>

    <div class="contador">
      Filmes cadastrados nesta sessão: <strong>${filmes.length}</strong>
    </div>

    <div class="acoes">
      <button class="botao" id="btnCadastrar">Cadastrar filme</button>
      <button class="botao secundario" id="btnVerFilmes">Ver filmes</button>
    </div>
  `;

  document.querySelector("#btnCadastrar")
    .addEventListener("click", () => irPara("cadastro"));

  document.querySelector("#btnVerFilmes")
    .addEventListener("click", () => irPara("lista"));
}

function mostrarCadastro() {
  app.innerHTML = `
    <h1>Cadastrar Filme</h1>

    <form id="formFilme">
      <div class="campo">
        <label for="nome">Nome</label>
        <input id="nome" type="text" placeholder="Digite o nome do Filme" required />
      </div>

      <div class="campo">
        <label for="genero">Gênero</label>
        <input id="genero" type="text" placeholder="Digite o gênero" required />
      </div>

      <div class="campo">
        <label for="lançamento">Lançamento</label>
        <input id="lançamento" type="text" placeholder="Digite o lançamento" required />
      </div>

      <button class="botao" type="submit">Salvar filme</button>
      <div id="mensagem"></div>
    </form>
  `;

  document.querySelector("#formFilme").addEventListener("submit", function(evento) {
    evento.preventDefault();

    const nome = document.querySelector("#nome").value.trim();
    const gênero = document.querySelector("#genero").value.trim();
    const lançamento = document.querySelector("#lançamento").value.trim();

    filmes.push({
      nome,
      gênero,
      lançamento
    });

    document.querySelector("#mensagem").innerHTML =
      `<div class="mensagem">Filme cadastrado com sucesso.</div>`;

    evento.target.reset();
  });
}

function mostrarLista() {
  app.innerHTML = `
    <h1>Lista de Filme</h1>
    <p>Esta tabela é criada dinamicamente pelo JavaScript a partir do array de filmes.</p>
    <div id="conteudoLista"></div>
  `;

  renderizarTabela();
}

function renderizarTabela() {
  const conteudo = document.querySelector("#conteudoLista");

  if (filmes.length === 0) {
    conteudo.innerHTML = `
      <div class="vazio">
        Nenhum Filme cadastrado ainda.
      </div>
    `;
    return;
  }

  let linhas = "";

  filmes.forEach((filme,indice) => {
    linhas += `
      <tr>
        <td>${filme.nome}</td>
        <td>${filme.gênero}</td>
        <td>${filme.lançamento}</td>
        <td>
          <button class="excluir" data-indice="${indice}">Excluir</button>
        </td>
      </tr>
    `;
  });

  conteudo.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Gênero</th>
          <th>Lançamento</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        ${linhas}
      </tbody>
    </table>
  `;

  document.querySelectorAll(".excluir").forEach(botao => {
    botao.addEventListener("click", function() {
      const indice = Number(this.dataset.indice);
      filmes.splice(indice, 1);
      renderizarTabela();
    });
  });
}

function mostrarSobre() {
  app.innerHTML = `
    <h1>Sobre o projeto</h1>
    <p>
      Este exemplo foi criado para demonstrar uma Single Page Application simples.
    </p>
    <p>
      Existe apenas um arquivo HTML. Ao clicar nas opções do menu,
      o JavaScript modifica o conteúdo do elemento <strong>#app</strong>.
    </p>
    <p>
      O projeto também demonstra cadastro em array, manipulação do DOM,
      eventos de clique, envio de formulário, listagem e exclusão.
    </p>
  `;
}

botoesMenu.forEach(botao => {
  botao.addEventListener("click", () => {
    irPara(botao.dataset.rota);
  });
});

mostrarInicio();
