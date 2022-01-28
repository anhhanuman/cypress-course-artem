describe('JSON example', () => {

    it('displays the JSON object', () => {
        cy.visit('/')
        const simpleObject = {"key1": "value", "key2": "value2", "key3": "value3"}
        const simpleArrayObject = ["Automation", "Manual", "Cypress", "Selenium"]
        const arrayOfObjects = [{"key1": "value1", "key2": "value2"}, {"obKey1": "obValue1", "obKey2": "obValue2"}]

        const dataTypes = {"string": "this is a string", "number": 10}

        const mixedObject = {
            "firstName": "Anh",
            "lastName": "Mai",
            "address": "TPHCM",
            "age": 33,
            "students": [
                {
                    "firstName":"Kevin",
                    "lastName":"Parker"
                },
                {
                    "firstName":"Sean",
                    "lastName":"Paul"
                }
            ]
        }

        console.log(simpleObject.key1)
        console.log(arrayOfObjects[1].obKey1)
        console.log(mixedObject.students[0].firstName)
    })

})
