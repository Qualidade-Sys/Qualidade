describe('CRUD de dePara com login válido', () => {
  let dados;

  // Corrigir o nome do arquivo de fixture aqui (sem espaço, minúsculo)
  before(() => {
    cy.fixture('dePara').then((data) => {
      dados = data;
    });
  });

  beforeEach(() => {
    cy.visit('http://34.95.188.150/login');
    cy.get('input[name="email"]').type('admin');
    cy.get('[type="password"]').should('be.visible').type('admin');
    cy.contains('button', 'Entrar').should('be.visible').click();
    cy.contains('a', 'De/Para', { timeout: 10000 }).click();
  });

  it('Deverá criar um novo dePara', () => {
    cy.get('.p-2 > .cursor-pointer').should('be.visible').click();
    cy.get('#fromToName').type(dados.nome);
    cy.get('#description').type(dados.descricao);
    cy.get('.border-2').click();
    cy.get('#inputFrom').type(dados.from);
    cy.get('#inputTo').type(dados.to);
    cy.get('.mt-5 > :nth-child(3) > :nth-child(1) > .items-center > :nth-child(1)').click();
    cy.get('.w-full > .flex > .bg-blue-700').click();
  });

  it('Deverá editar um dePara existente', () => {
    cy.get(':nth-child(3) > .w-1 > .justify-end > .font-bold').click();
    cy.get('#description').clear().type(dados.descricaoEditada);
    cy.get('.w-full > .flex > .bg-blue-700').click();
  });

  it('Deverá deletar o dePara', () => {
    cy.get(':nth-child(1) > .w-1 > .justify-end > .font-bold').click();
    cy.contains('button', 'Excluir').click();
    cy.contains('button', 'Confirmar').click(); // Se houver confirmação

   // Garante que o nome editado não existe mais
    cy.contains(dados.descricaoEditado, { timeout: 15000 }).should('not.exist');


  });
});
