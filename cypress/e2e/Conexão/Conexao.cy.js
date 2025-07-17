describe('Cadastro, edição e exclusão de conexão (sem retorno da API)', () => {
  const dadosConexao = {
    nome: 'Garrafa',
    descricao: 'Descrição da conexão',
    path: 'testes',
    nomeBanco: 'nome do banco',
    porta: '1234',
    tipoBanco: 'ORACLE',
    usuario: 'teste',
    senha: 'teste2'
  };

  beforeEach(() => {
    cy.login();
    cy.get('a[href="/connection"]', { timeout: 10000 }).first().should('be.visible').click();
  });

  it('Deve cadastrar, salvar JSON local, clicar no botão Editar, editar e excluir uma conexão', () => {
    cy.contains('button', 'Adicionar Item', { timeout: 10000 }).should('be.visible').click();

    cy.get('#connectionName', { timeout: 10000 }).should('exist').type(dadosConexao.nome);

    cy.get('#description', { timeout: 10000 }).should('exist').clear().type(dadosConexao.descricao);

    cy.get('#path').type(dadosConexao.path);
    cy.get('#connectionType1').click();
    cy.get('#namebd').type(dadosConexao.nomeBanco);
    cy.get('#port').type(dadosConexao.porta);
    cy.get('#selectedDb').select(dadosConexao.tipoBanco);
    cy.get('#user').type(dadosConexao.usuario);
    cy.get('#password').type(dadosConexao.senha);

    cy.contains('button', 'Salvar').first().click();
    cy.get('.swal2-confirm', { timeout: 10000 }).click();

    cy.writeFile('cypress/fixtures/conexao.json', dadosConexao);

    cy.get('table tbody tr', { timeout: 10000 }).should('exist');
    cy.contains('td', dadosConexao.nome, { timeout: 10000 }).should('exist');

    cy.readFile('cypress/fixtures/conexao.json').then((conexao) => {
      // Verifica o nome na tabela e clica no botão Editar correspondente
      cy.contains('tr', conexao.nome, { timeout: 10000 })
        .should('be.visible')
        .within(() => {
          cy.contains('button', 'Editar').should('be.visible').click();
        });

      // Espera por um seletor que indica que a tela está pronta
      cy.get('form', { timeout: 10000 }).should('be.visible');

      // Confirma que algum campo da tela realmente existe antes de prosseguir
      cy.get('body').then(($body) => {
        if ($body.find('#description').length) {
          cy.get('#description', { timeout: 10000 }).clear().type('Descrição editada');
        } else if ($body.find('textarea[name="description"]').length) {
          cy.get('textarea[name="description"]', { timeout: 10000 }).clear().type('Descrição editada');
        } else {
          throw new Error('Campo de descrição não encontrado na tela de edição.');
        }
      });

      cy.contains('button', 'Salvar').click();
      cy.get('.swal2-confirm', { timeout: 10000 }).click();

      cy.get('a[href="/connection"]', { timeout: 10000 }).first().click();

      cy.get('table tbody tr', { timeout: 10000 }).should('exist');
      cy.contains('tr', conexao.nome, { timeout: 10000 }).should('be.visible').within(() => {
        cy.contains('button', 'Editar').click();
      });

      cy.get('.gap-3 > .cursor-pointer', { timeout: 10000 }).click();
      cy.get('.swal2-confirm', { timeout: 10000 }).click();
      cy.get('.swal2-confirm', { timeout: 10000 }).click();

      cy.get('.swal2-container', { timeout: 10000 }).should('not.exist');

      cy.contains('td', conexao.nome).should('not.exist');
    });
  });
});