describe('Login válido', () => {
  it('Deverá realizar o Login', () => {
    cy.visit('http://34.95.188.150/login');

    // Preenche as credenciais
    cy.get('input[name="email"]').type('admin');
    cy.get('[type="password"]').should('be.visible').type('admin');

    // Clica no botão de login
    cy.contains('button', 'Entrar').first().should('be.visible').click();

    // Aguarda a renderização do menu lateral e acessa a tela desejada
    cy.contains('a', 'De/Para').click();

    // Seleciona uma linha existente na tela
    cy.get(':nth-child(3) > .w-1 > .justify-end > .font-bold').should('be.visible').click();

    


    
  });
});
