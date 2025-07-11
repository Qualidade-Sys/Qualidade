describe('Cadastro, edição e exclusão de conexão (sem retorno da API)', () => {
  const dadosConexao = {
    nome: 'Wellington',
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

  it('Deve cadastrar, salvar JSON local, clicar no nome, editar e excluir uma conexão', () => {
    cy.contains('button', 'Adicionar Item', { timeout: 10000 }).first().should('be.visible').click();
    cy.get('#connectionName').should('exist').type(dadosConexao.nome);
    cy.get('#description').type(dadosConexao.descricao);
    cy.get('#path').type(dadosConexao.path);
    cy.get('#connectionType1').click();
    cy.get('#namebd').type(dadosConexao.nomeBanco);
    cy.get('#port').type(dadosConexao.porta);
    cy.get('#selectedDb').select(dadosConexao.tipoBanco);
    cy.get('#user').type(dadosConexao.usuario);
    cy.get('#password').type(dadosConexao.senha);
    cy.contains('button', 'Salvar').first().click();
    cy.get('.swal2-confirm').click();

     cy.writeFile('cypress/fixtures/conexao.json', dadosConexao);

    // Aguarda a tabela carregar e verifica se o nome apareceu
    cy.get('table tbody tr', { timeout: 10000 }).should('exist');
    cy.contains('td', dadosConexao.nome, { timeout: 10000 }).should('exist');

    // Agora lê o JSON e interage com a conexão
    cy.readFile('cypress/fixtures/conexao.json').then((conexao) => {
      // Clica no nome da conexão — assumindo que está em uma <td>
      cy.contains('td', conexao.nome, { timeout: 10000 })
        .should('be.visible')
        .click(); // Se não for clicável, remova este `.click()`

      // Aguarda a tela de edição carregar e edita a descrição
      cy.get('#description').click() .clear().type('Descrição editada');
      cy.contains('button', 'Salvar').click();

    cy.get('.swal2-confirm').click();
     
     

      // Volta para a lista de conexões
    cy.get('a[href="/connection"]').eq(0).click();

      // Aguarda a tabela e procura a linha da conexão
     cy.contains('td', conexao.nome, { timeout: 10000 })
  .should('be.visible')
  .click();

      // Confirma a exclusão
      cy.get('.gap-3 > .cursor-pointer').click();
      cy.get('.swal2-confirm').click();
      cy.get('.swal2-confirm').click();

      cy.get('.swal2-container', { timeout: 10000 }).should('not.exist');

      // Confirma que o item não aparece mais na tabela
      cy.contains('td', conexao.nome).should('not.exist');

      
    });
  });
});
