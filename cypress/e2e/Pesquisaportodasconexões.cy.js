describe('Paginação completa da tabela de conexões', () => {
  it('Deve percorrer todas as páginas da tabela, validar paginação e registros', () => {
    cy.visit('/login');

    cy.get('[type="text"]').type('admin');
    cy.get('[type="password"]').type('admin');
    cy.contains('button', 'Entrar').first().should('be.visible').click();

    cy.get('a[href="/connection"]').eq(0).should('be.visible').click();
    cy.get('table').should('be.visible');

    // Função recursiva para navegar e validar cada página
    function navegarPaginas() {
      cy.get('table tbody tr').should('have.length.lte', 10);

      cy.get('p.text-sm.text-gray-700')
        .invoke('text')
        .then((texto) => {
          cy.log(`Texto da paginação: ${texto}`);

          const match = texto.match(/(\d+)\s*a\s*(\d+)\s*de\s*(\d+)\s*itens/);
          expect(match).to.not.be.null;

          const inicio = parseInt(match[1]);
          const fim = parseInt(match[2]);
          const total = parseInt(match[3]);

          expect(inicio).to.be.gte(1);
          expect(fim).to.be.lte(total);

          // (Opcional) Validar conteúdo da tabela
          cy.get('table tbody tr').each(($row) => {
            cy.wrap($row).should('be.visible');
          });

          // Verifica o botão "Seguinte"
          cy.get('button')
            .contains('Seguinte')
            .then(($btn) => {
              const desabilitado = $btn.is(':disabled');

              if (!desabilitado && fim < total) {
                cy.wrap($btn).click();
                cy.wait(300); // pequena pausa
                navegarPaginas(); // chama novamente para a próxima página
              } else {
                cy.log('Última página alcançada!');
              }
            });
        });
    }

    navegarPaginas(); // inicia a navegação
  });
});
