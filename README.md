# ui_tests

See Cypress documentation for more information:
https://docs.cypress.io/guides/getting-started/installing-cypress.html#System-requirements

### To Install Cypress:
```
cd /your/path
npm install cypress --save-dev
```
Put "ui_test_1.js" and "ui_test_2.js" in **"cypress/integration"**.
### To Run:
```
$(npm bin)\\cypress open
```
In the UI, open "ui_test_1.js" to start tests on the Segment connector, and "ui_test_2.js" to start tests on the Pipedrive connector.
