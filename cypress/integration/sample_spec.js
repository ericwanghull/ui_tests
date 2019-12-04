// / <reference types="Cypress" />

// describe('My First Test', function() {
//   it('Does not do much!', function() {
//     expect(true).to.equal(true)
//   })
// })

// describe('My Second Test', function() {
//   it('Does too much!', function() {
//     expect(true).to.equal(false)
//   })
// })

// describe('My Third Test', function() {
//   it('Visits the Kitchen Sink', function() {
//     cy.visit('https://example.cypress.io')

//     cy.contains('type').click()

//     // Should be on a new URL which includes '/commands/actions'
//     cy.url().should('include', '/commands/actions')

//     // Get an input, type into it and verify that the value has been updated
//     cy.get('.action-email')
//       .type('fake@email.com')
//       .should('have.value', 'fake@email.com')
//   })
// })


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
*/

//head to hull dashboard and sign in
describe("Get to Dashboard", function() {
    it('Visit Hull and Sign in', function() {
        cy.visit("https://dashboard.hullapp.io/")
        cy.contains('Sign in with Google').click() //assume login has been saved on browser
        cy.wait(7000)
        cy.url().should('include', '/overview', { timeout: 30000 }) //check url for successful signin
    })
})

//switch orgs for testing
describe("Get to Testing Environment", function() {
    it('Open Available Orgs', function() {
        //no hover function, check for popover
        cy.get('.avatar-container').click() //click open org panel
        cy.get('.ant-popover-inner-content') //check that the popover exists

        //should check for second popover
        cy.get('.ant-select-selection-selected-value').click() //open orgs list
        // cy.get('ant-select-selection.ant-select-selection--single')
          // .its('aria-expanded').should('have.value', 'true')

        //type to search
        cy.get('input.ant-select-search__field')
          .type('Eric Wang Organization', { delay: 100 }) //delay
          .should('have.value', 'Eric Wang Organization') //confirm text shows up
    })

    it('Switch Orgs', function() {
        //click into test org
        cy.get("li.ant-select-dropdown-menu-item")
          .contains('Eric Wang Organization').click() //select the right org
        cy.url().should('include', '/5bfe0994/overview') //check org id, homepage
    })
})

describe("Add a Connector", function() {
    it('Go to Gallery', function() {
        // cy.get('ul.ant-menu ant-menu-light ant-menu-root ant-menu-horizontal')
        // cy.get("li.ant-select-dropdown-menu-item")
        cy.get('li.ant-menu-item')
          .contains('Connectors').click()
        cy.url().should('include', '/5bfe0994/connectors')

        //add
        cy.contains('Add a connector').click()
        cy.url().should('include', '/5bfe0994/gallery')
    })

    it('Install Segment', function() {
        //search
        cy.get('input.ant-input').first()
          // .its('placeholder').should('have.value', 'Search')
          .type('Segment', { delay: 100 })
        cy.get('h3', { timeout: 30000 }).contains('Segment').click()


        //scroll and install
        cy.get('.ant-modal-body').scrollTo('bottom') //how to test
        cy.get('.ant-btn.ant-btn-primary.ant-btn-lg').click({ timeout: 30000})
        cy.wait(7000)
        cy.url().should('include', '5bfe0994/ships', { timeout: 30000})
        cy.url().should('include', 'installed=true', { timeout: 30000})
   })
})

describe("Configure a Connector - Add", function() {
    it('Go to Settings Page in Connector', function() {
        //2 ul's with same class, select second one and then find li number 4
        cy.get('ul.ant-menu.ant-menu-light.ant-menu-root.ant-menu-horizontal').should('have.length', 2)
          .eq(1).find('>li').eq(3).click({force: true})
        cy.url().should('include', '/settings', {timeout: 30000})
    })

    it('Add User Segments', function() {
        // cy.get('p').contains('Users are only sent to segment.com').scrollIntoView()
        //   .should('be.visible')
        cy.get('input').should('have.length', 10) //need index 5, 6, 7
          .eq(5).click({force: true}) //user filter, should check for popover opening
          .type('User Segment', { delay: 100 })
          .should('have.value', 'User Segment') //confirm text shows up
        cy.get('span').contains('User Segment').first().click({force: true}) //should check for tag appearing
        cy.scrollTo('50%', '45%')
        cy.get('p').contains('Find it under Settings').click({force: true}) //click out
    })

    it('Add User Attributes', function() {
        // cy.get('p').contains('Users are only sent to segment.com').scrollIntoView()
        //   .should('be.visible')
        // cy.get('li')
          // .eq(38).click({force: true}) //force click location
        cy.get('input').should('have.length', 10) //need index 5, 6, 7
          .eq(6).click('top', {force: true}) //user att, should check for popover opening
          .type('name', { delay: 100 })
          .should('have.value', 'name') //confirm text shows up
        cy.get('span').contains('name').first().click({force: true}) //should check for tag appearing
        cy.scrollTo('50%', '45%')
        cy.get('p').contains('Find it under Settings').click({force: true}) //click out
    })

    it('Save and Wait', function() {
        cy.get('span').contains('Save changes').click({force: true, timeout: 10000})
        cy.get('button').contains('Commit Changes').click({force: true})
        cy.wait(5000)

        // cy.reload()
    })
})

// describe("Get back to Connector", function() {
//     it('Sign in Again', function() {
//             cy.contains('Sign in with Google').click() //assume login has been saved on browser
//             cy.wait(5000)
//             cy.url().should('include', '/overview', { timeout: 30000 }) //check url for successful signin
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
//           .type('Eric Wang Organization', { delay: 100 }) //delay
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
//           .contains('Connectors').click()
//         cy.url().should('include', '/5bfe0994/connectors')

//         cy.get('a.cell-link').contains('Segment').click()
//         cy.url().should('include', '5bfe0994/ships')
//     })
// })

describe("Configure a Connector - Delete", function() {
    it('Go to Settings Page in Connector', function() {
        //2 ul's with same class, select second one and then find li number 4
        cy.get('ul.ant-menu.ant-menu-light.ant-menu-root.ant-menu-horizontal').should('have.length', 2)
          .eq(1).find('>li').eq(3).click({force: true})
        cy.url().should('include', '/settings', {timeout: 30000})
    })

    it('Delete User Segments', function() {
        // cy.get('p').contains('Users are only sent to segment.com').scrollIntoView()
        //   .should('be.visible')
        cy.get('rect').should('have.length', 4)
          .eq(0).click({force: true}) //user filter, should check for tag deleting
    })

    it('Delete User Attributes', function() {
        cy.get('rect').should('have.length', 3)
          .eq(0).click({force: true}) //user att, should check for tag deleting
    })

    it('Save and Wait', function() {
        cy.get('span').contains('Save changes').click({force: true, timeout: 10000})
        cy.get('button').contains('Commit Changes').click({force: true})
        cy.wait(5000)

        // cy.reload()
    })
})

// describe("Get back to Connector", function() {
//     it('Sign in Again', function() {
//             cy.contains('Sign in with Google').click() //assume login has been saved on browser
//             cy.wait(5000)
//             cy.url().should('include', '/overview', { timeout: 30000 }) //check url for successful signin
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
//           .type('Eric Wang Organization', { delay: 100 }) //delay
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
//           .contains('Connectors').click()
//         cy.url().should('include', '/5bfe0994/connectors')

//         cy.get('a.cell-link').contains('Segment').click()
//         cy.url().should('include', '5bfe0994/ships')
//     })
// })

describe("Remove a Connector", function() {
    // it('Go to Settings Page in Connector', function() {
    //     // cy.get('li.ant-menu-item').contains('Settings', { timeout: 10000 }).click() //sometimes cant find it
    //     cy.get('ul.ant-menu.ant-menu-light.ant-menu-root.ant-menu-horizontal').should('have.length', 2)
    //       .eq(1).find('>li').eq(3).click()
    //     cy.url().should('include', '/settings')

    //     //give some time to look around
    //     cy.wait(7000)
    // })

    it('Delete the Connector', function() {
        cy.scrollTo('bottom') //how to test?
        cy.get('span').contains('Delete this connector').click()
        cy.get('.ant-popover-inner-content') //check for popover

        cy.get('.ant-btn.ant-btn-primary.ant-btn-sm').click()
        cy.url().should('include', '/5bfe0994/connectors')
        // cy.get('a.cell-link').contains('Segment') //should not contain
    })
})

//add more assertions and tests
//comment code and add documentation
//best practices and risks
    //risk of messing up clicks when one thing doesnt work but the test keeps going
    //risk of messing up customer org
