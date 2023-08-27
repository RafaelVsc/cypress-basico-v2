
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    const longText  =  "é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos. Lorem Ipsum sobreviveu não só a cinco séculos, como também ao salto para a editoração eletrônica, permanecendo essencialmente inalterado. Se popularizou na década de 60, quando a Letraset lançou decalques contendo passagens de Lorem Ipsum, e mais recentemente quando passou a ser integrado a softwares de editoração eletrônica como Aldus PageMaker."
    cy.get('#firstName').should('be.visible').type('Rafael').should('have.value', 'Rafael')
    cy.get('#lastName').should('be.visible').type('Vescio')
    cy.get('#email').should('be.visible').type('rafael@testeqa.com')
    cy.get('#open-text-area').type(longText, {delay: 0})
    cy.contains('button', 'Enviar').click()
});

Cypress.Commands.add('validSuccessSubmit', () => {
    cy.get('span.success').should('be.visible')
});