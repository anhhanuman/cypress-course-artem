/// <reference types="cypress" />
describe('the first test suite', () => {
    it('the first test case', () => {
        //search element by tag name
        cy.get('input')
        cy.get('#inputEmail')
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
        cy.get('input [type="email"]##inputEmail.input-full-width')

    })
})
