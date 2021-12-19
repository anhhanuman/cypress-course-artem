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

    })
})
