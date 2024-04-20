import React from 'react'
import SignInForm from './SignInForm'

describe('<SignInForm />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<SignInForm />)
  })
})