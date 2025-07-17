Cypress.Commands.add('validarTotalDeItensEsperado', (valorEsperado) => {
  cy.get('p.text-sm.text-gray-700')
    .invoke('text')
    .then((texto) => {
      cy.log('Texto encontrado:', texto);
 
      // Regex mais flexível para capturar o número total
      const resultado = texto.match(/(\d+)\s*a\s*\d+\s*de\s*(\d+)\s*itens/);
 
      expect(resultado).to.not.be.null;
 
      const totalCapturado = parseInt(resultado[2]); // segundo grupo: total de itens
      expect(totalCapturado).to.equal(valorEsperado);
    });
});
 
Cypress.Commands.add('login', () => {
  cy.visit('/login');
 cy.get('input[name="email"]').type('admin')
  cy.get('[type="password"]').type('admin');
  cy.contains('button', 'Entrar').first().should('be.visible').click();
});