

### 4 - Clone application under test


### 6 - Cypress installation
in the folder support

#### support/index.js is the first file that cypress executes, you can add some code here
- event listener
- beforeEach hook
- change default cypress behavior

#### support/command.js
you can add common functions that you use across the app
overwrite is an advanced topic, and it is rarely used

#### plugins/index.js
you can extend the cypress functionalities outside of cypress
#### integration
specs files are here
#### fixtures
mock objects, test data are here

### cypress.json
configuration: change default setting

### 7 - Cypress configuration
### cypress.json

all available options are at Cypress page: Cypress configuration
https://docs.cypress.io/guides/references/configuration#cypress-json

we start at the `baseUrl`
application is always at https://localhost:4200

also, look at for reference git ignore files,:
https://globster.xyz/



