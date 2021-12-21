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
    it.only('then and wrap methods', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email')
        cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password')
        cy.contains('nb-card', 'Basic form').find('[for="exampleInputEmail1"]').should('contain', 'Email')
        cy.contains('nb-card', 'Basic form').find('[for="exampleInputPassword1"]').should('contain', 'Password')

    })
})
