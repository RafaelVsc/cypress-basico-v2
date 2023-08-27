/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
    const THREE_SECONDS_IN_MS = 3000
    beforeEach(() => {
        cy.visit('./src/index.html')
    });


    it('verifica o título da aplicação', function () {

        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')

    })

    it('preenche os campos obrigatórios e envia o formulário', () => {
        cy.clock()
        const longText = "é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos. Lorem Ipsum sobreviveu não só a cinco séculos, como também ao salto para a editoração eletrônica, permanecendo essencialmente inalterado. Se popularizou na década de 60, quando a Letraset lançou decalques contendo passagens de Lorem Ipsum, e mais recentemente quando passou a ser integrado a softwares de editoração eletrônica como Aldus PageMaker."
        cy.get('#firstName').should('be.visible').type('Rafael').should('have.value', 'Rafael')
        cy.get('#lastName').should('be.visible').type('Vescio')
        cy.get('#email').should('be.visible').type('rafael@testeqa.com')
        cy.get('#open-text-area').type(longText, { delay: 0 })
        cy.contains('button', 'Enviar').click()

        cy.get('span.success').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('span.success').should('not.be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.clock()
        const longText = "é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos. Lorem Ipsum sobreviveu não só a cinco séculos, como também ao salto para a editoração eletrônica, permanecendo essencialmente inalterado. Se popularizou na década de 60, quando a Letraset lançou decalques contendo passagens de Lorem Ipsum, e mais recentemente quando passou a ser integrado a softwares de editoração eletrônica como Aldus PageMaker."
        cy.get('#firstName').should('be.visible').type('Rafael').should('have.value', 'Rafael')
        cy.get('#lastName').should('be.visible').type('Vescio')
        cy.get('#email').should('be.visible').type('rafael#testeqa.com')
        cy.get('#open-text-area').type(longText, { delay: 0 })
        cy.contains('button', 'Enviar').click()

        cy.get('span.error').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('span.error').should('not.be.visible')

    })

    it('campo telefone continua vazio quando preenchido com valor não-numérico', () => {
        cy.get('#phone').type('abcdef').should('have.value', '')
    })

    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.clock()
        const longText = "é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos. Lorem Ipsum sobreviveu não só a cinco séculos, como também ao salto para a editoração eletrônica, permanecendo essencialmente inalterado. Se popularizou na década de 60, quando a Letraset lançou decalques contendo passagens de Lorem Ipsum, e mais recentemente quando passou a ser integrado a softwares de editoração eletrônica como Aldus PageMaker."
        cy.get('#firstName').should('be.visible').type('Rafael').should('have.value', 'Rafael')
        cy.get('#lastName').should('be.visible').type('Vescio')
        cy.get('#email').should('be.visible').type('rafael@testeqa.com')
        cy.get('#phone-checkbox').check().should('be.checked')
        cy.get('#open-text-area').type(longText, { delay: 0 })
        cy.contains('button', 'Enviar').click()

        cy.get('span.error').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('span.error').should('not.be.visible')


    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        const longText = "é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos. Lorem Ipsum sobreviveu não só a cinco séculos, como também ao salto para a editoração eletrônica, permanecendo essencialmente inalterado. Se popularizou na década de 60, quando a Letraset lançou decalques contendo passagens de Lorem Ipsum, e mais recentemente quando passou a ser integrado a softwares de editoração eletrônica como Aldus PageMaker."
        cy.get('#firstName')
            .type('Rafael')
            .should('have.value', 'Rafael')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('Vescio')
            .should('have.value', 'Vescio')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('rafael@testeqa.com')
            .should('have.value', 'rafael@testeqa.com')
            .clear()
            .should('have.value', '')

        cy.get('#phone')
            .type('12345678900')
            .should('have.value', '12345678900')
            .clear()
            .should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.clock()

        cy.contains('button', 'Enviar').click()

        cy.get('span.error').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('span.error').should('not.be.visible')


    })

    it('envia o formuário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit()
        cy.validSuccessSubmit()
    })

    it('seleciona um produto (YouTube) por seu texto', () => {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu texto', () => {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu texto', () => {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('be.checked')
    })

    it('marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(($radio) => {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })

    it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('@sampleFile')
            .should(function ($input) {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    });

    it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
        cy.get('a')
            .invoke('removeAttr', 'target')
            .click()
        cy.contains('Talking About Testing')
    });

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
        cy.get('.success')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Mensagem enviada com sucesso.')
            .invoke('hide')
            .should('not.be.visible')
        cy.get('.error')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Valide os campos obrigatórios!')
            .invoke('hide')
            .should('not.be.visible')
    })

    it('preenche a area de texto usando o comando invoke', () => {
        const longText = Cypress._.repeat('0123456790', 20)
        cy.get('#open-text-area')
            .invoke('val', longText)
            .should('have.value', longText)
    });

    it('faz uma requisição HTTP', () => {
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
            .should((res) => {
                const { status, statusText, body } = res
                expect(status).to.eq(200)
                expect(statusText).to.eq('OK')
                expect(body).to.include('CAC TAT')
            })
    });

    it('encontrando o gato escondido', () => {
        cy.get('#cat')
            .invoke('show')
            .should('be.visible')
            .and('contain', '🐈')
        cy.get('#title')
            .invoke('text', 'CAT TAT')
            .should('contain', 'CAT TAT')
        cy.get('#subtitle')
            .invoke('text', 'Eu ❤️ Gatos')
    });
})