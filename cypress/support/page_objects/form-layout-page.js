export class FormLayoutPage {
    submitInlineFormWithNameAndEmail() {
        cy.contains('nb-card', 'Inline Form').find('form').then(form => {
            cy.wrap(form).find('input[placeholder=Jane Doe]').click().type('Anh Mai')
            cy.wrap(form).find('input[placeholder="Email"]').click().type('anhmai@autotest.vn')
            cy.wrap(form).find('[type="checkbox"]').check({force: true})
            cy.wrap(form).submit()
        })
    }
}

export const formLayoutPage = new FormLayoutPage()
