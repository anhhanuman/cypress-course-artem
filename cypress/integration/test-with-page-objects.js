import {navigationPage} from "../support/page_objects/navigation-page";
import {formLayoutPage} from "../support/page_objects/form-layout-page";
import {datepickerPage} from "../support/page_objects/datepicker-page";
import {smartTablePage} from "../support/page_objects/smart-table-page";

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
        formLayoutPage
            .submitInlineFormWithNameAndEmail('Anh Mai', 'emailtest@yahoo.com')
            .submitBasicFormWithEmailAndPassword('emailtest@yahoo.com', 'test')
        navigationPage.displayDatePickerPage()
        datepickerPage
            .selectCommonDatepickerDateFromToday(1)
            .selectDateRangeFromToday(7, 14)
        navigationPage.displaySmartTable()
        smartTablePage.updateAgeByFirstName('Larry',30)
            .addNewRowWithFirstNameLastNameAndAssert('Anh','Mai')

    })
})
