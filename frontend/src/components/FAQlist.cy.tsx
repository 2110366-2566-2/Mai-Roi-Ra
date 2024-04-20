import React from 'react'
import FAQlist from './FAQlist'

describe('<FAQlist />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<FAQlist />)
  })
})