import {navigationPage} from "../support/page_objects/navigationPage";

describe('Test with page object', () => {
    beforeEach('open application', () => {
        cy.visit('/')
    })

    it.only('verify navigations across pages', () => {
        navigationPage
            .displayFormLayout()
            .displayDatePickerPage()
            .displaySmartTable()
            .displayToolTip()
            .displayToastr()
    })
})
