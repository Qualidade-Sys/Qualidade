describe('Login válido', () => {
  it('Deverá exibir mensagem de campo obrigatório', () => {
    cy.visit('http://192.169.2.108:3000/login');

    cy.get('[type="text"]').should('have.value', '');

    cy.get('.space-y-4 > .bg-blue-600').click();

    // Validação usando seletor CSS para campo inválido
    cy.get('[type="text"]:invalid').should('exist');

    // OU: Se houver validação visível renderizada via JS
    // cy.contains('Preencha este campo').should('be.visible');
  });
});

