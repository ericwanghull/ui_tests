// / <reference types="Cypress" />

/*
Cypress works like jquery for accessing DOMs, but rather than saving them into
a variable, the query remains open for a set timeout period, and subsequent commands
can be chained onto the resulting DOM returned. This bypasses complications resulting
from loading content and empty variables, checking for null and conditionals, etc.

Steps to writing a good test:
1. Set up the application state.
2. Take an action.
3. Make an assertion about the resulting application state.
Or in the Given, When, Then syntax

Each test chunk (starting with "describe") is run sequentially, but independently, i.e. any failure in the first
chunk will not stop the next chunk from running. Individual tests (starting with "it") within a chunk, however,
are skipped if any preceding tests within that chunk fail.
*/

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
})

//install Segment connector
describe("Add a Connector", function() {
    it('Go to Gallery', function() {
        //go to Connectors tab
        cy.get('li.ant-menu-item')
          .contains('Connectors').click()
        cy.url().should('include', '/5bfe0994/connectors') //check for the right page

        //click Add a connector
        cy.contains('Add a connector').click()
        cy.url().should('include', '/5bfe0994/gallery') //check for the right page
    })

    it('Install Segment', function() {
        //search for Segment
        cy.get('input.ant-input').first()
          // .its('placeholder').should('have.value', 'Search') //does not work
          .type('Segment', { delay: 100 }) //slow typing
        cy.get('h3', { timeout: 10000 }).contains('Segment').click()
        //add check for segment

        //scroll and install
        cy.get('.ant-modal-body').scrollTo('bottom')
        cy.get('.ant-btn.ant-btn-primary.ant-btn-lg').click({ timeout: 10000}) //click install
        cy.wait(7000) //account for slow connection
        cy.url().should('include', '5bfe0994/ships', { timeout: 10000}) //check for the right landing page
        cy.url().should('include', 'installed=true', { timeout: 10000}) //check for install complete
   })
})

//adding configurations to Segment connector
describe("Configure a Connector - Add", function() {
    it('Go to Settings Page in Connector', function() {
        //2 ul's with same class, select second one (connector tabs) and then find li number 4 (settings)
        cy.get('ul.ant-menu.ant-menu-light.ant-menu-root.ant-menu-horizontal').should('have.length', 2)
          .eq(1).find('>li').eq(3).click({force: true})
        cy.url().should('include', '/settings', {timeout: 10000}) //check for the right page
    })

    it('Add User Segments', function() {
        cy.get('input').should('have.length', 10) //find all inputs, should have 10
          .eq(5).click({force: true}) //index 5 is user filter
          .type('User Segment', { delay: 100 }) //slow typing
          .should('have.value', 'User Segment') //confirm text shows up
        cy.get('span').contains('User Segment').first().click({force: true}) //add User Segment
        cy.scrollTo('50%', '45%') //scroll for viewing
        cy.get('p').contains('Find it under Settings').click({force: true}) //click out
        //should check for tag appearing
    })

    it('Add User Attributes', function() {
        cy.get('input').should('have.length', 10) //find all inputs, should have 10
          .eq(6).click('top', {force: true}) //index 6 is user attributes
          .type('name', { delay: 100 }) //slow typing
          .should('have.value', 'name') //confirm text shows up
        cy.get('span').contains('name').first().click({force: true}) //add "name" attribute
        cy.scrollTo('50%', '45%') //scroll for viewing
        cy.get('p').contains('Find it under Settings').click({force: true}) //click out
        //should check for tag appearing
    })

    it('Save and Wait', function() {
        cy.get('span').contains('Save changes').click({force: true, timeout: 10000})
        cy.get('button').contains('Commit Changes').click({force: true})
        cy.wait(5000) //time to view and confirm save
        //should check for Save changes button disappearing

        // cy.reload() //refresh requires login
    })
})

// // needed to access the connector again after a refresh/signout
// describe("Get back to Connector", function() {
//     it('Sign in Again', function() {
//             cy.contains('Sign in with Google').click() //assume login has been saved on browser
//             cy.wait(7000)
//             cy.url().should('include', '/overview', { timeout: 10000 }) //check url for successful signin
//         })
//     it('Open Available Orgs Again', function() {
//         //no hover function, check for popover
//         cy.get('.avatar-container').click() //click open org panel
//         cy.get('.ant-popover-inner-content') //check that the popover exists

//         //should check for second popover
//         cy.get('.ant-select-selection-selected-value').click() //open orgs list
//         // cy.get('ant-select-selection.ant-select-selection--single')
//           // .its('aria-expanded').should('have.value', 'true')

//         //type to search
//         cy.get('input.ant-select-search__field')
//           .type('Eric Wang Organization', { delay: 100 }) //slow typing
//           .should('have.value', 'Eric Wang Organization') //confirm text shows up
//     })
//     it('Switch Orgs Again', function() {
//         //click into test org
//         cy.get("li.ant-select-dropdown-menu-item")
//           .contains('Eric Wang Organization').click() //select the right org
//         cy.url().should('include', '/5bfe0994/overview') //check org id, homepage
//     })

//     it("Access Existing Segment Connector", function() {
//         cy.get('li.ant-menu-item')
//           .contains('Connectors').click() //go to connectors tab
//         cy.url().should('include', '/5bfe0994/connectors') //check url

//         cy.get('a.cell-link').contains('Segment').click() //click into existing Segment connector
//         cy.url().should('include', '5bfe0994/ships') //check url
//     })
// })

//removing configurations from the Segment connector
describe("Configure a Connector - Remove", function() {
    it('Go to Settings Page in Connector', function() {
        //2 ul's with same class, select second one (connector tabs) and then find li number 4 (settings)
        cy.get('ul.ant-menu.ant-menu-light.ant-menu-root.ant-menu-horizontal').should('have.length', 2)
          .eq(1).find('>li').eq(3).click({force: true})
        cy.url().should('include', '/settings', {timeout: 10000}) //check for the right page
    })

    it('Remove User Segments', function() {
        cy.get('rect').should('have.length', 4) //find all rect, should have 4
          .eq(0).click({force: true}) //first index is user filter
          //should check for removing tag
    })

    it('Remove User Attributes', function() {
        cy.get('rect').should('have.length', 3) //find all rect, should have 3
          .eq(0).click({force: true}) //first index is now user att
          //should check for removing tag
    })

    it('Save and Wait', function() {
        cy.get('span').contains('Save changes').click({force: true, timeout: 10000})
        cy.get('button').contains('Commit Changes').click({force: true})
        cy.wait(5000) //time to view and confirm save
        //should check for Save changes button disappearing

        // cy.reload() //refresh requires login
    })
})

// // needed to access the connector again after a refresh/signout
// describe("Get back to Connector", function() {
//     it('Sign in Again', function() {
//             cy.contains('Sign in with Google').click() //assume login has been saved on browser
//             cy.wait(7000)
//             cy.url().should('include', '/overview', { timeout: 10000 }) //check url for successful signin
//         })
//     it('Open Available Orgs Again', function() {
//         //no hover function, check for popover
//         cy.get('.avatar-container').click() //click open org panel
//         cy.get('.ant-popover-inner-content') //check that the popover exists

//         //should check for second popover
//         cy.get('.ant-select-selection-selected-value').click() //open orgs list
//         // cy.get('ant-select-selection.ant-select-selection--single')
//           // .its('aria-expanded').should('have.value', 'true')

//         //type to search
//         cy.get('input.ant-select-search__field')
//           .type('Eric Wang Organization', { delay: 100 }) //slow typing
//           .should('have.value', 'Eric Wang Organization') //confirm text shows up
//     })
//     it('Switch Orgs Again', function() {
//         //click into test org
//         cy.get("li.ant-select-dropdown-menu-item")
//           .contains('Eric Wang Organization').click() //select the right org
//         cy.url().should('include', '/5bfe0994/overview') //check org id, homepage
//     })

//     it("Access Existing Segment Connector", function() {
//         cy.get('li.ant-menu-item')
//           .contains('Connectors').click() //go to connectors tab
//         cy.url().should('include', '/5bfe0994/connectors') //check url

//         cy.get('a.cell-link').contains('Segment').click() //click into existing Segment connector
//         cy.url().should('include', '5bfe0994/ships') //check url
//     })
// })

//delete the Segment connector
describe("Remove a Connector", function() {
    // it('Go to Settings Page in Connector', function() {
    //     // cy.get('li.ant-menu-item').contains('Settings', { timeout: 10000 }).click() //sometimes cant find it

    //     // 2 ul's with same class, select second one (connector tabs) and then find li number 4 (settings)
    //     cy.get('ul.ant-menu.ant-menu-light.ant-menu-root.ant-menu-horizontal').should('have.length', 2)
    //       .eq(1).find('>li').eq(3).click({force:true})
    //     cy.url().should('include', '/settings', {timeout: 10000}) //check for the right page

    //     //give some time to look around
    //     cy.wait(7000)
    // })

    it('Delete the Connector', function() {
        cy.scrollTo('bottom')
        cy.get('span').contains('Delete this connector').click()
        cy.get('.ant-popover-inner-content') //check for popover

        cy.get('.ant-btn.ant-btn-primary.ant-btn-sm').click() //click delete confirmation
        cy.url().should('include', '/5bfe0994/connectors') //check for url
        // cy.get('a.cell-link').contains('Segment') //should not contain "Segment", does not work
    })
})

//risk of messing up clicks when one thing doesnt work but the test moves on, especially with force clicks
//risk of messing up customer org

//add more assertions and tests, e.g.:
//     expect(blank).to.equal(blank)

