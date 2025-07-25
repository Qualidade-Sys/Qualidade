describe('Login válido', () => {
  it('Deverá realizar o Login', () => {
    cy.visit('http://34.95.188.150/login');

    // Preenche as credenciais
    cy.get('[type="text"]').type('admin');
    cy.get('[type="password"]').should('be.visible').type('admin');

    // Clica no botão de login
    cy.get('.space-y-4 > .bg-blue-600').click();

    // Aguarda a renderização do menu no cabeçalho
   cy.get('.flex', { timeout: 10000 }).should('be.visible');

    // Clica nos itens do menu no cabeçalho
    cy.get('.flex > :nth-child(1) > a').click();
    cy.get('.flex > :nth-child(2) > a').click();
    cy.get('.flex > :nth-child(3) > a').click();
    cy.get('.flex > :nth-child(4) > a').click();
    cy.get('.flex > :nth-child(5) > a').click();
    cy.get('.container > .items-center > .flex > :nth-child(1)').click();
    cy.get('.container > .items-center > .flex > :nth-child(2)').click();
    cy.get('.container > .items-center > .flex > :nth-child(3)').click();
    cy.get('.container > .items-center > .ml-4')
    
    
  });
});
