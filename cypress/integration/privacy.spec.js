/// <reference types="Cypress" />

Cypress._.times(3, () => {

    it.only('testa a página da política de privacidade de forma independente', () => {
        cy.visit('./src/privacy.html')
        cy.contains('Talking About Testing')

    });

})
