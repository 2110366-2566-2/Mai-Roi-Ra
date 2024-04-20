import React from 'react'
import SearchBar from './SearchBar'

describe('<SearchBar />', () => {

  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })

  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    //cy.mount(<SearchBar />)
  })
})