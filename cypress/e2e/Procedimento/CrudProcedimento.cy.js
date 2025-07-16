describe('CRUD de Procedimento com login válido', () => {
  let dados;

  before(() => {
    cy.fixture('procedimento').then((data) => {
      dados = data;
    });
  });

  beforeEach(() => {
    cy.visit('http://192.169.2.108:3000/login');
    cy.get('input[name="email"]').type('admin');
    cy.get('[type="password"]').should('be.visible').type('admin');
    cy.contains('button', 'Entrar').should('be.visible').click();
    cy.contains('a', 'Procedimento', { timeout: 10000 }).click();
  });

  it('Deverá criar um novo procedimento', () => {
    cy.get('.p-2 > .cursor-pointer').click();

    cy.get('.grow-3 > .flex-col > label').should('be.visible').type(dados.nome);
    cy.get('#description').should('be.visible').type(dados.descricao);
    cy.get('#connection').should('be.visible').select(dados.conexao);
    cy.get('.mr-5 > .flex-col > label').should('be.visible').type(dados.responsavel);
    cy.get(':nth-child(4) > :nth-child(2) > .flex-col > label').should('be.visible').type(dados.versao);

    cy.get('#type1').should('be.visible').click();
    cy.get('#originType1').should('be.visible').click();

    cy.get('.w-full > .flex > .bg-blue-700').click();

    cy.get('#swal2-html-container', { timeout: 10000 })
      .should('be.visible')
      .and('contain.text', 'Adições salvas com sucesso');
  });

  it('Deverá editar o procedimento', () => {
    cy.contains(dados.nome, { timeout: 10000 })
      .should('exist')
      .parents('tr')
      .within(() => {
        cy.contains('button', 'Editar').click();
      });

    cy.wait(1000);

    cy.get('.grow-3 > .flex-col > input', { timeout: 10000 })
      .should('be.visible')
      .clear()
      .type(dados.nomeEditado);

    cy.get('.w-full > .flex > .bg-blue-700').click();

    cy.get('#swal2-html-container', { timeout: 10000 })
      .should('be.visible')
      .and('contain.text', 'Edições salvas com sucesso');

    cy.wait(1000);
    cy.reload();

    cy.contains('a', 'Procedimento', { timeout: 10000 }).should('be.visible');
    cy.contains(dados.nomeEditado, { timeout: 15000 }).should('exist');
  });

  it('Deverá deletar o procedimento', () => {
    cy.contains(dados.nomeEditado, { timeout: 10000 })
      .parents('tr')
      .within(() => {
        cy.contains('button', 'Editar').click();
      });

    // Espera o modal aparecer
    cy.get('.rounded-b-lg > .w-full', { timeout: 10000 }).should('be.visible');

    // Dentro do modal, clica no botão "Excluir"
    cy.get('.rounded-b-lg > .w-full')
      .contains('button', 'Excluir')
      .click({ force: true });

    // No SweetAlert, clica em "Confirmar"
    cy.get('.swal2-popup')
      .contains('button', 'Confirmar')
      .click();

    // Aguarda o alerta de sucesso da exclusão
    cy.get('#swal2-html-container', { timeout: 10000 })
      .should('be.visible')
      .and('contain.text', 'Exclusão salva com sucesso');

    // Recarrega para garantir a lista atualizada
    cy.wait(1000);
    cy.reload();

    cy.contains('a', 'Procedimento', { timeout: 10000 }).should('be.visible');

    // Garante que o nome editado não existe mais
    cy.contains(dados.nomeEditado, { timeout: 15000 }).should('not.exist');
  });
});


