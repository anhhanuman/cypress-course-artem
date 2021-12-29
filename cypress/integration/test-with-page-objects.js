import {navigationPage} from "../support/page_objects/navigation-page";

describe('Test with page object', () => {
    beforeEach('open application', () => {
        cy.visit('/')
    })

    it('verify navigations across pages', () => {
        navigationPage
            .displayFormLayout()
            .displayDatePickerPage()
            .displaySmartTable()
            .displayToolTip()
            .displayToastr()
    })

    it.only('submit inline and basic form and select tomorrow from the calendar', () => {
        navigationPage.displayFormLayout()
    })
})
