describe('Acesso à página de usuários', () => {
    beforeEach(() => {
        cy.login();
    });

    it('Deve navegar para usuários via sidebar', () => {
        cy.get('#usuarios_nav').click();
        cy.url().should('include', '/usuarios');
        cy.contains('Usuários').should('exist');
    });
});