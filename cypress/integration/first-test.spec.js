/// <reference types="cypress" />
describe('the first test suite', () => {
    it('the first test case', () => {
        // already provided the baseUrl in the cypress.json, cy.visit(/) will provide the root path in order to open the web application
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()
        //search element by tag name
        cy.get('input')
        cy.get('#inputEmail1')
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
        cy.get('input[type="email"]#inputEmail1.input-full-width')

        // the most recommended way by Cypress. Add your own attribute data-cy to the source code/section HTML
        //you won't be afraid any attributes are changed, even the ID can be changed in the modern web such as dynamic id or dynamic classes
        cy.get('[data-cy="imputEmail1"]').type('vuonganh.dhkt@gmail.com')
    })

    it('second test', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()
        // find the SIGN IN element when it neither have ID nor any unique attribute
        // add the data-cy attribute to the html file
        cy.get('[data-cy="signInButton"]')
        //ALWAYS LOOK AT THE DOM text, here in this example the SIGN IN is upper case by css
        cy.contains('Sign in')
        //Cypress found several SIGN IN button, cypress find the fist matched

        //find SIGN IN button with attribute [status="warning"]
        cy.contains('[status="warning"]', 'Sign in')
        // travel through the DOM, find a unique element in the section
        // travel up levels using parents() - see https://docs.cypress.io/api/commands/parents
        // then travel to SIGN IN button
        // add assertion - see https://docs.cypress.io/guides/references/assertions

        cy.get('#inputEmail3')
            .parents('form')
            .find('button')
            .should('contain', 'Sign in')
            .parents('form')
            .find('nb-checkbox').click()
        //another example for cy.contains()
        //imagine that the email field does not have unique identifier
        cy.contains('nb-card', 'Horizontal form').find('[type="email"]')
        //SUMMARY: get is used to searching for element in the entire DOM
    })
    //how to save the result of cypress function to reuse later
    it('then and wrap methods', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email')
        cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password')
        cy.contains('nb-card', 'Basic form').find('[for="exampleInputEmail1"]').should('contain', 'Email')
        cy.contains('nb-card', 'Basic form').find('[for="exampleInputPassword1"]').should('contain', 'Password')
        //use the then() method in cypress to save the result from cypress command
        //cypress style:
        cy.contains('nb-card', 'Using the Grid').then(firstForm => {
            const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text()//jquery
            const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text()
            expect(emailLabelFirst).to.equal('Email')
            expect(passwordLabelFirst).to.equal('Password')

            cy.contains('nb-card', 'Basic form').then(secondForm => {
                const passwordLabelSecond = secondForm.find('[for="exampleInputPassword1"]').text()
                expect(passwordLabelFirst).equal(passwordLabelSecond)
                //how to switch back to Cypress methods from Jquery, use the cy.wrap()
                cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain', 'Password')

            })
        })

        //work with jquery, can't use the cypress click() method
        //work with jquery, have to use the expect from Chai

    })

    //how to get the text from the web page using the invoke command
    it('invoke command', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layout').click()

        //1
        cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')
        //2
        cy.get('[for="exampleInputEmail1"]').then(label => {
            expect(label.text()).to.equal('Email address')
        })
        //3
        cy.get('[for="exampleInputEmail1"]').invoke('text').then(text => {
            expect(text).to.equal('Email address')
        })
        // test case: verify the check-box is checked by class having checked value
        cy.contains('nb-card', 'Basic form')
            .find('nb-checkbox')
            .click()
            .find('.custom-checkbox')
            .invoke('attr', 'class')
            //.should('contain','checked')
            .then(classValue => {
                expect(classValue).to.contains('checked')
            })
    })

    it('', () => {
        // an example of date picker which the value is not displayed on the DOM, how to verify?
        //it is in the properties/value of the dev tools
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()

        cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
            cy.wrap(input).click()
            cy.get('nb-calendar-day-picker').contains('22').click()
            cy.wrap(input).invoke('prop', 'value').should('contain', 'Dec 22, 2021')
        })
    })

    it('radio buttons', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Form Layout').click()
        cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then(radioButtons => {
            cy.wrap(radioButtons)
                .first()
                .check({force: true})
                .should('be.checked')
            cy.wrap(radioButtons)
                .eq(1)
                .check({force: true})
                .should('be.checked')

            cy.wrap(radioButtons)
                .first()
                .should('not.be.checked')

            cy.wrap(radioButtons)
                .eq(2)
                .should('be.disabled')
        })
    })
    it('check boxes', () => {
        cy.visit('/')
        cy.contains('Modal & Overlays').click()
        cy.contains('Toastr').click()
        cy.get('[type="checkbox"]').check({force: true})
        //check method only check to the UNCHECK boxes
        //IF you want to  uncheck you have to use the click()
        cy.get('[type="checkbox"]').eq(1).check({force: true})
        cy.get('[type="checkbox"]').eq(0).check({force: true})//not work
        cy.get('[type="checkbox"]').eq(0).click({force: true})
    })

    it('verify the dropdown selecting Dark and background color', () => {
        cy.visit('/')
        cy.get('nav nb-select button').click()
        cy.get('ul.options-list').contains('Dark').click()
        cy.get('nav nb-select').should('contain', 'Dark')
        cy.get('nav.fixed').should('have.css', 'background-color', 'rgb(34, 43, 69)')
    })
    it('Select each option in dropdown list and assert the text', () => {
        cy.visit('/')
        cy.get('nav nb-select').then(dropdown => {
            cy.wrap(dropdown).click()
            cy.get('ul.options-list nb-option').each(listItem => {
                cy.wrap(listItem).click()
                cy.wrap(dropdown).should('contain', listItem.text().trim())
                cy.wrap(dropdown).click()
            })
        })
    })

    it('iterate through each option in dropdown list and assert the background-color', () => {
        cy.visit('/')
        cy.get('nav nb-select').then(dropdown => {
            cy.wrap(dropdown).click()
            cy.get('ul.options-list nb-option').then(options => {
                const total = options.length
                cy.wrap(options).each((listItem, index) => {
                    const itemText = listItem.text().trim()
                    cy.wrap(listItem).click()
                    const colors = {
                        "Light": "rgb(255, 255, 255)",
                        "Dark": "rgb(34, 43, 69)",
                        "Cosmic": "rgb(50, 50, 89)",
                        "Corporate": "rgb(255, 255, 255)",
                    }
                    cy.get('nav.fixed').should('have.css', 'background-color', colors[itemText])
                    if (index < total - 1) {
                        cy.wrap(dropdown).click()
                    }
                    // Can not use the Cypress Select because the tag name is nb-select
                })
            })
        })
    })

    it('Web table', () => {
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()
        cy.get('tbody').contains('tr', 'Larry').then(tableRow => {
            cy.wrap(tableRow).find('.nb-edit').click()
            cy.wrap(tableRow).find('[placeholder="Age"]').click().clear().type('25')
            cy.wrap(tableRow).find('.nb-checkmark').click()
            //const initialValue = tableRow.find('td.ng-star-inserted').eq(6).text()
            //expect(initialValue).to.equal('18')
            cy.wrap(tableRow).find('td').eq(6).should('contain', '25')
        })
    })

    it('add new row and verify', () => {
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()
        cy.get('i.nb-plus').click()
        cy.get('thead').find('tr').eq(2).then(row => {
            cy.wrap(row).find('[placeholder="First Name"]').click().type('Anh')
            cy.wrap(row).find('[placeholder="Last Name"]').click().type('Mai')
            cy.wrap(row).find('.nb-checkmark').click()
        })
        cy.get('tbody tr').first().then(firstRow => {
            cy.wrap(firstRow).find('td').eq(2).should('contain', 'Anh')
            cy.wrap(firstRow).find('td').eq(3).should('contain', 'Mai')
        })
    })
    it('filter by age', () => {
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()
        cy.get('thead [placeholder="Age"]').type('20')
        cy.wait(500)
        cy.get('tbody tr').each(row => {
            const rowValue = row.find('td').eq(6).text()
            expect(rowValue).to.equal('20')
        })
    })

    it('filter by age by multiple loops', () => {
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        const tobeFilteredAge = [20, 30, 40]
        cy.wrap(tobeFilteredAge).each(age => {
            console.log('iterate through each array value: ' + age)
        })
    })

    it('filter by age by multiple loops and assert', () => {
        cy.visit('/')
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        const tobeFilteredAge = ['20', '30', '40', 200]
        cy.wrap(tobeFilteredAge).each(age => {
            cy.get('thead [placeholder="Age"]').clear().type(age.toString())
            cy.wait(500)
            cy.get('tbody tr').each(row => {
                if (Number(age) === 200) {
                    cy.wrap(row).should('contain', 'No data found')
                } else {
                    cy.wrap(row).find('td').eq(6).should('contain', age)
                }
            })
        })
    })

    it.only('Lesson 17: Date picker', () => {
        cy.visit('/')
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()
        cy.get('input[placeholder="Form Picker"]').click()

        let date = new Date()
        date.setDate(date.getDate() + 70)
        const futureDate = date.getDate()
        const futureMonth = date.toLocaleDateString('default', {month: 'short'})
        const expectedDate = futureMonth + ' ' + futureDate + ', ' + date.getFullYear()
        selectDayFromCurrent()
        function selectDayFromCurrent() {
            cy.get('nb-calendar-navigation button').invoke('text', ).then(buttonText => {
                if (!buttonText.includes(futureMonth)) {
                    cy.get('[data-name="chevron-right"]').click()
                    console.log(futureDate)
                    selectDayFromCurrent()
                }
                else {
                    cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDate).click()
                }
            })
        }
    })
})
