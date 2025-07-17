describe('Cadastro, edição e exclusão de conexão (sem retorno da API)', () => {

  beforeEach(() => {
    cy.login();
    cy.get('a[href="/connection"]', { timeout: 10000 }).first().should('be.visible').click();
  });

  it('Deve exibir mensagem de erro ao tentar salvar conexão com nome vazio', () => {
    cy.contains('button', 'Adicionar Item', { timeout: 10000 }).first().should('be.visible').click();

    // Campo nome vazio
    cy.get('#connectionName').should('exist').clear();

    // Clica no botão salvar
    cy.contains('button', 'Salvar').first().click();

    // ✅ Verifica se a mensagem "Campos obrigatórios" aparece no alerta
    cy.get('h2.swal2-title')
      .should('be.visible')
      .and('contain', 'Campos obrigatórios');

    // Opcional: fecha o alerta
    cy.get('.swal2-confirm').click();
  });
});