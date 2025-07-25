describe('Login valido', () => {
  it('Deverá realizar o Login', () => {
    cy.visit('http://34.95.188.150/login');
    cy.get('[type="text"]').type('admin');
    cy.get('[type="password"]').should('be.visible').type('admin');
    cy.get('.space-y-4 > .bg-blue-600').click();

   

  });
});
