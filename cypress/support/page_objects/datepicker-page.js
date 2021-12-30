function selectDayFromCurrent(day) {
    let date = new Date()
    date.setDate(date.getDate() + day)
    const futureDate = date.getDate()
    const futureMonth = date.toLocaleDateString('default', {month: 'short'})
    const expectedDate = futureMonth + ' ' + futureDate + ', ' + date.getFullYear()

    cy.get('nb-calendar-navigation button').invoke('text').then(buttonText => {
        if (!buttonText.includes(futureMonth)) {
            cy.get('[data-name="chevron-right"]').click()
            console.log(futureDate)
            selectDayFromCurrent(day)
        } else {
            cy.get('.day-cell').not('.bounding-month').contains(futureDate).click()
        }
    })

    return expectedDate
}

export class DatepickerPage {
    selectCommonDatepickerDateFromToday(dateFromToday) {
        cy.get('input[placeholder="Form Picker"]').then(input => {
            cy.wrap(input).click()
            const expectedDate = selectDayFromCurrent(dateFromToday)
            cy.wrap(input).invoke('prop', 'value').should('contain', expectedDate)
        })

        return this
    }

    selectDateRangeFromToday(firstDay, secondDay) {
        cy.contains('nb-card', 'Datepicker With Range').find('input').then(input => {
            cy.wrap(input).click()
            const expectedFirstDate = selectDayFromCurrent(firstDay)
            const expectedSecondDate = selectDayFromCurrent(secondDay)
            const expectedFinalDate = expectedFirstDate + ' - ' + expectedSecondDate
            cy.wrap(input).invoke('prop', 'value').should('contain', expectedFinalDate)
        })

        return this
    }

}

export const datepickerPage = new DatepickerPage()
