// / <reference types="Cypress" />

//head to hull dashboard and sign in
describe("Get to Dashboard", function() {
    it('Visit Hull and Sign in', function() {
        cy.visit("https://dashboard.hullapp.io/")
        cy.contains('Sign in with Google').click() //assume google login has been saved on browser
        cy.wait(7000) //account for slow connection
        cy.url().should('include', '/overview', { timeout: 10000 }) //check url for successful signin
    })
})

//switch orgs for testing
describe("Get to Testing Environment", function() {
    it('Open Available Orgs', function() {
        //cypress has no hover function
        cy.get('.avatar-container').click() //click open org panel by clicking avatar
        cy.get('.ant-popover-inner-content') //check that the popover element appears

        cy.get('.ant-select-selection-selected-value').click() //open orgs list
        // cy.get('ant-select-selection.ant-select-selection--single') //confirm popover appears
          // .its('aria-expanded').should('have.value', 'true') //does not work

        //type to search
        cy.get('input.ant-select-search__field')
          .type('Eric Wang Organization', { delay: 100 }) //slow typing
          .should('have.value', 'Eric Wang Organization') //confirm text shows up
    })

    it('Switch Orgs', function() {
        //click into test org
        cy.get("li.ant-select-dropdown-menu-item")
          .contains('Eric Wang Organization').click() //select the right org
        cy.url().should('include', '/5bfe0994/overview') //check org id, homepage
    })

    it("Access Existing Pipedrive Connector", function() {
        cy.get('li.ant-menu-item')
          .contains('Connectors').click() //go to connectors tab
        cy.url().should('include', '/5bfe0994/connectors') //check url

        cy.get('a.cell-link').contains('Pipedrive').click() //click into existing Pipedrive connector
        cy.url().should('include', '5bfe0994/ships') //check url
    })
})

//install Pipedrive connector
// describe("Add a Connector", function() {
//     it('Go to Gallery', function() {
//         //go to Connectors tab
//         cy.get('li.ant-menu-item')
//           .contains('Connectors').click()
//         cy.url().should('include', '/5bfe0994/connectors') //check for the right page

//         //click Add a connector
//         cy.contains('Add a connector').click()
//         cy.url().should('include', '/5bfe0994/gallery') //check for the right page
//     })

//     it('Install Pipedrive', function() {
//         //search for Pipedrive
//         cy.get('input.ant-input').first()
//           // .its('placeholder').should('have.value', 'Search') //does not work
//           .type('Pipedrive', { delay: 100 }) //slow typing
//         cy.get('h3', { timeout: 10000 }).contains('Pipedrive').click()
//         //add check for Pipedrive

//         //scroll and install
//         cy.get('.ant-modal-body').scrollTo('bottom')
//         cy.get('.ant-btn.ant-btn-primary.ant-btn-lg').click({ timeout: 10000}) //click install
//         cy.wait(7000) //account for slow connection
//         cy.url().should('include', '5bfe0994/ships', { timeout: 10000}) //check for the right landing page
//         cy.url().should('include', 'installed=true', { timeout: 10000}) //check for install complete
//    })
// })

//adding configurations to Pipedrive connector
describe("Configure a Connector - Add", function() {
    it('Go to Settings Page in Connector', function() {
        //2 ul's with same class, select second one (connector tabs) and then find li number 4 (settings)
        cy.get('ul.ant-menu.ant-menu-light.ant-menu-root.ant-menu-horizontal').should('have.length', 2)
          .eq(1).find('>li').eq(3).click({force: true})
        cy.url().should('include', '/settings', {timeout: 10000}) //check for the right page
    })

    //check that configs are grayed out if new

    //authenticate, cypress cannot access a popup window, doesn't work
    // it('Authenticate Pipedrive', function() {
    //     cy.get('div').contains('Log in to your Pipedrive account').click()
    //     cy.visit("https://oauth.pipedrive.com/auth/login?return_url=https%3A%2F%2Foauth.pipedrive.com%2Foauth%2Fauthorize%3Fresponse_type%3Dcode%26redirect_uri%3Dhttps%253A%252F%252Fhull-pipedrive.herokuapp.com%252Fauth%252Fcallback%26state%3DkpbFWUJaPB9%25252F5P6PzWGgg4H8ASx402nTVNa%25252BBzaGkiIPWONIhK58%25252FzEMjT7KjeHCzOX2tCbNp2yJAh8SrPzcoYumUYxWZHy6%25252BEu5a4uV6CAvfpGdZTZ7FJHwCKC5Gwa3%25252Bp%25252Biqimpf6gA7GJeOO9LYw%25253D%25253D%26client_id%3D89a6f1b53f0f7b06")
    //     cy.get('input').contains('Email')
    //       .type("eric+pipedrivetest1@hull.io", {delay: 100})
    //     cy.get('input').contains('Password')
    //       .type("password", {delay: 100})
    //     cy.get('button').contains('Log in').click()
    //     cy.get('button').contains('Continue to the App').click()
    // })

    //attempting to listen for window open, doesn't work
    // cy.visit('http://localhost:3000', {
    //   onBeforeLoad(win) {
    //     cy.stub(win, 'open')
    //   })
    // }
    // cy.get('div').contains('Log in to your Pipedrive account').click()
    // cy.window().its('open').should('be.called')

    it('Add User Attributes', function() {
        cy.get('span').contains('Edit the mapping').click({force: true}) //user atts
        cy.wait(1500)
        cy.get('span').contains('Name').click({force: true})
        cy.get('span').contains('Label').click({force: true})
        cy.get('span').contains('Phone').click({force: true})
        cy.get('button').contains('Confirm').click()

        // to get input for Hull attributes, will probably need to list out all 'div' or all 'svg'
        // and find index corresponding to the right input

        // cy.get('svg')
    })

    // it('Save and Wait', function() {
    //     cy.get('span').contains('Save changes').click({force: true, timeout: 10000})
    //     cy.get('button').contains('Commit Changes').click({force: true})
    //     cy.wait(5000) //time to view and confirm save
    //     //should check for Save changes button disappearing

    //     // cy.reload() //refresh requires login
    // })
})


//delete the Pipedrive connector
// describe("Remove a Connector", function() {
//     // it('Go to Settings Page in Connector', function() {
//     //     // cy.get('li.ant-menu-item').contains('Settings', { timeout: 10000 }).click() //sometimes cant find it

//     //     // 2 ul's with same class, select second one (connector tabs) and then find li number 4 (settings)
//     //     cy.get('ul.ant-menu.ant-menu-light.ant-menu-root.ant-menu-horizontal').should('have.length', 2)
//     //       .eq(1).find('>li').eq(3).click({force:true})
//     //     cy.url().should('include', '/settings', {timeout: 10000}) //check for the right page

//     //     //give some time to look around
//     //     cy.wait(7000)
//     // })

//     it('Delete the Connector', function() {
//         cy.scrollTo('bottom')
//         cy.get('span').contains('Delete this connector').click()
//         cy.get('.ant-popover-inner-content') //check for popover

//         cy.get('.ant-btn.ant-btn-primary.ant-btn-sm').click() //click delete confirmation
//         cy.url().should('include', '/5bfe0994/connectors') //check for url
//         // cy.get('a.cell-link').contains('Pipedrive') //should not contain "Pipedrive", does not work
//     })
// })
