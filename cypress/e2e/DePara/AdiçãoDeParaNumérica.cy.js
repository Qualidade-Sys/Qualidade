describe('Login válido', () => {
  it('Deverá realizar o Login', () => {
    cy.visit('http://34.95.188.150/login');

    // Preenche as credenciais
    cy.get('input[name="email"]').type('admin');
    cy.get('[type="password"]').should('be.visible').type('admin');

    // Clica no botão de login
    cy.contains('button', 'Entrar').first().should('be.visible').click();

    // Aguarda a renderização do menu lateral
    cy.contains('a', 'De/Para').click();

    // Adicionar 2 linhas e salvar
    cy.get('.p-2 > .cursor-pointer').should('be.visible').click();
    cy.get('#fromToName').should('be.visible').type('Teste Cypress 4321');
    cy.get('#description').should('be.visible').type('Desc. cypress -TSTT');
    cy.get('.border-2').should('be.visible').click();
    cy.get('#inputFrom').should('be.visible').type('38');
    cy.get('#inputTo').should('be.visible').type('47');
    cy.get('.mt-5 > :nth-child(3) > :nth-child(1) > .items-center > :nth-child(1)').should('be.visible').click();
    cy.get('#inputFrom').should('be.visible').type('030303');
    cy.get('#inputTo').should('be.visible').type('040404');
    cy.get('.mt-5 > :nth-child(3) > :nth-child(1) > .items-center > :nth-child(1)').should('be.visible').click();

    // Clica no botão de Salvar
    cy.get('.w-full > .flex > .bg-blue-700').should('be.visible').click();


    
  });
});

