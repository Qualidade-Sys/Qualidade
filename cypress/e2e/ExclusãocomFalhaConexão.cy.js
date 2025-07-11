describe('Exclusão da conexão "testwes 2"', () => {
  it('Deve excluir a conexão chamada "testwes 2"', () => {
    cy.visit('/login');

    
    cy.get('[type="text"]').type('admin');
    cy.get('[type="password"]').type('admin');
    cy.contains('button', 'Entrar').click();
    cy.get('a[href="/connection"]').eq(0).click();
    cy.contains('tr', 'testwes 2')
      .should('exist')
      .within(() => {
        cy.contains('button', 'Editar').should('be.visible').click();
      });
          cy.contains('button', 'Excluir').should('be.visible').click();  

    // Confirma a exclusão (ex: em um modal)
    cy.contains('button', 'Confirmar').should('be.visible').click();

    // 
    //  Valida que "testwes 2" foi removida da tabela
    cy.contains('tr', 'nanda testwes 2').should('not.exist');
  });
});
