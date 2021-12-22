/// <reference types="cypress" />
describe('the first test suite', () => {
    it('the first test case', () => {
        // already provided the baseUrl in the cypress.json, cy.visit(/) will provide the root path in order to open the web application
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()
        //search element by tag name
        cy.get('input')
        cy.get('#inputEmail1')
        cy.get('.input-full-width')
        // by attribute name
        cy.get('[placeholder]')
        //by attribute name and value
        cy.get('[placeholder="Email"]')
        // by class value
        cy.get('[class="input-full-width size-medium shape-rectangle"]')
        //by tag name and attribute with value
        cy.get('input[placeholder="Email"]')
        //by two different attributes
        cy.get('[placeholder="Email"][type="email"]')
        cy.get('[placeholder="Email"][type="email"][fullwidth]')

        // by tag name, attribute with value, id and class name
        cy.get('input[type="email"]#inputEmail1.input-full-width')

        // the most recommended way by Cypress. Add your own attribute data-cy to the source code/section HTML
        //you won't be afraid any attributes are changed, even the ID can be changed in the modern web such as dynamic id or dynamic classes
        cy.get('[data-cy="imputEmail1"]').type('vuonganh.dhkt@gmail.com')
    })

    it('second test', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()
        // find the SIGN IN element when it neither have ID nor any unique attribute
        // add the data-cy attribute to the html file
        cy.get('[data-cy="signInButton"]')
        //ALWAYS LOOK AT THE DOM text, here in this example the SIGN IN is upper case by css
        cy.contains('Sign in')
        //Cypress found several SIGN IN button, cypress find the fist matched

        //find SIGN IN button with attribute [status="warning"]
        cy.contains('[status="warning"]', 'Sign in')
        // travel through the DOM, find a unique element in the section
        // travel up levels using parents() - see https://docs.cypress.io/api/commands/parents
        // then travel to SIGN IN button
        // add assertion - see https://docs.cypress.io/guides/references/assertions

        cy.get('#inputEmail3')
            .parents('form')
            .find('button')
            .should('contain', 'Sign in')
            .parents('form')
            .find('nb-checkbox').click()
        //another example for cy.contains()
        //imagine that the email field does not have unique identifier
        cy.contains('nb-card', 'Horizontal form').find('[type="email"]')
        //SUMMARY: get is used to searching for element in the entire DOM
    })
    //how to save the result of cypress function to reuse later
    it('then and wrap methods', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email')
        cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password')
        cy.contains('nb-card', 'Basic form').find('[for="exampleInputEmail1"]').should('contain', 'Email')
        cy.contains('nb-card', 'Basic form').find('[for="exampleInputPassword1"]').should('contain', 'Password')

        //use the then() method in cypress to save the result from cypress command
        //cypress style:
        cy.contains('nb-card', 'Using the Grid').then(firstForm => {
            const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text()//jquery
            const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text()
            expect(emailLabelFirst).to.equal('Email')
            expect(passwordLabelFirst).to.equal('Password')

            cy.contains('nb-card', 'Basic form').then(secondForm => {
                const passwordLabelSecond = secondForm.find('[for="exampleInputPassword1"]').text()
                expect(passwordLabelFirst).equal(passwordLabelSecond)
                //how to switch back to Cypress methods from Jquery, use the cy.wrap()
                cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain', 'Password')

            })
        })

        //work with jquery, can't use the cypress click() method
        //work with jquery, have to use the expect from Chai

    })

    //how to get the text from the web page using the invoke command
    it('invoke command', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layout').click()

        //1
        cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')
        //2
        cy.get('[for="exampleInputEmail1"]').then(label => {
            expect(label.text()).to.equal('Email address')
        })
        //3
        cy.get('[for="exampleInputEmail1"]').invoke('text').then(text => {
            expect(text).to.equal('Email address')
        })
        // test case: verify the check-box is checked by class having checked value
        cy.contains('nb-card', 'Basic form')
            .find('nb-checkbox')
            .click()
            .find('.custom-checkbox')
            .invoke('attr', 'class')
            //.should('contain','checked')
            .then(classValue => {
                expect(classValue).to.contains('checked')
            })
    })

    it.only('', () => {
        // an example of date picker which the value is not displayed on the DOM, how to verify?
        //it is in the properties/value of the dev tools
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()

        cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
            cy.wrap(input).click()
            cy.get('nb-calendar-day-picker').contains('22').click()

        })
    })
})
