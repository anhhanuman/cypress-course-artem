export class FormLayoutPage {
    submitInlineFormWithNameAndEmail(name, email) {
        cy.contains('nb-card', 'Inline form').find('form').then(form => {
            cy.wrap(form).find('input[placeholder="Jane Doe"]').click().type(name)
            cy.wrap(form).find('input[placeholder="Email"]').click().type(email)
            cy.wrap(form).find('[type="checkbox"]').check({force: true})
            cy.wrap(form).submit()
            //only use for form, if DOM element has form tag
        })

        return this
    }

    submitBasicFormWithEmailAndPassword(email, password) {
        cy.contains('nb-card', 'Basic form').find('form').then(form => {
            cy.wrap(form).find('input[placeholder="Email"]').click().type(email)
            cy.wrap(form).find('input[placeholder="Password"]').click().type(password)
            cy.wrap(form).find('[type="checkbox"]').check({force: true})
            cy.wrap(form).submit()
        })

        return this
    }
}

export const formLayoutPage = new FormLayoutPage()
