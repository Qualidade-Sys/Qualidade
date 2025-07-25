describe('Login válido', () => {
  it('Deverá realizar o Login', () => {
    cy.visit('http://34.95.188.150/login');

    // Preenche as credenciais
    cy.get('input[name="email"]').type('admin');
    cy.get('[type="password"]').should('be.visible').type('admin');

    // Clica no botão de login
    cy.contains('button', 'Entrar').first().should('be.visible').click();

    // Aguarda a renderização do menu lateral
    cy.contains('a', 'Procedimento').click();

   // Preenche formulário
    cy.get('.p-2 > .cursor-pointer').click();
    cy.get('.grow-3 > .flex-col > label').should('be.visible').type('Teste Auto');

    cy.get('#description').should('be.visible').type('Descrição Teste Auto 321');
    cy.get('#connection').should('be.visible').select('Testes');
    cy.get('.mr-5 > .flex-col > label').should('be.visible').type('Teste 01');
    cy.get(':nth-child(4) > :nth-child(2) > .flex-col > label').should('be.visible').type('Versão 0.1');
    cy.get('#originType1').should('be.visible').click();

    // Clica no botão de salvar
    cy.get('.w-full > .flex > .bg-blue-700').click();

    cy.get('#swal2-html-container').should('be.visible').and('contain.text', 'Preencha os campos marcados antes de salvar');


  });
});