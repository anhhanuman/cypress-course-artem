function expandMenu(menuName) {
    cy.contains('a', menuName).then(formMenu => {
        cy.wrap(formMenu).find('.expand-state g g').invoke('attr', 'data-name').then(collapsingState => {
            if (collapsingState.includes('chevron-left')) {
                cy.wrap(formMenu).click()
            }
        })
    })
}

export class NavigationPage {
    displayFormLayout() {
        expandMenu('Forms')
        cy.contains('Form Layouts').click()

        return this
    }

    displayDatePickerPage() {
        expandMenu('Forms')
        cy.contains('Datepicker').click()

        return this
    }

    displaySmartTable() {
        expandMenu('Tables & Data')
        cy.contains('Smart Table').click()

        return this
    }

    displayToolTip(){
        expandMenu('Modal & Overlays')
        cy.contains('Tooltip').click()

        return this
    }
    displayToastr(){
        expandMenu('Modal & Overlays')
        cy.contains('Toastr').click()
        return this;
    }

}

export const navigationPage = new NavigationPage()
