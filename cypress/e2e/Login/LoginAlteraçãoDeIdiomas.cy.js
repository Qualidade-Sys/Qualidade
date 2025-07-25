describe('Login valido', () => {
  it('Deverá realizar o Login', () => {
    cy.visit('http://34.95.188.150/login');
    cy.get('.flex > .bg-blue-600').click();
   cy.get('.absolute > .flex > :nth-child(2)').click();
    cy.get('.flex > :nth-child(3)').click();

  });
});
