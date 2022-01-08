export class SmartTablePage {
    updateAgeByFirstName(name, age) {
        cy.get('tbody').contains('tr', name).then(row => {
            cy.wrap(row).find('.nb-edit').click()
            cy.wrap(row).find('[placeholder="Age"]').click().clear().type(age)
            cy.wrap(row).find('.nb-checkmark').click()
            cy.wrap(row).find('td').eq(6).should('contain', age)

        })

        return this
    }

    addNewRowWithFirstNameLastNameAndAssert(firstName, lastName) {
        cy.get('i.nb-plus').click()
        cy.get('thead').find('tr').eq(2).then(row => {
            cy.wrap(row).find('[placeholder="First Name"]').click().type(firstName)
            cy.wrap(row).find('[placeholder="Last Name"]').click().type(lastName)
            cy.wrap(row).find('.nb-checkmark').click()
        })
        cy.get('tbody tr').first().find('td').then(cell => {
            cy.wrap(cell).eq(2).should('contain', firstName)
            cy.wrap(cell).eq(3).should('contain', lastName)
        })

        return this
    }

}

export const smartTablePage = new SmartTablePage()
