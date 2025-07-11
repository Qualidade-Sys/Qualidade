describe('Login valido', () => {
  it('Deverá realizar o Login', () => {
    cy.visit('http://192.169.2.108:3000/login');
    cy.get('.flex > .bg-blue-600').click();
   cy.get('.absolute > .flex > :nth-child(2)').click();
    cy.get('.flex > :nth-child(3)').click();

  });
});
