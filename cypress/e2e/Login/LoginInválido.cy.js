describe('Login valido', () => {
  it('Deverá realizar o Login', () => {
    cy.visit('http://192.169.2.108:3000/login');
    cy.get('[type="text"]').type('admin');
    cy.get('[type="password"]').should('be.visible').type('1234');
    cy.get('.space-y-4 > .bg-blue-600').click();

   

  });
});
