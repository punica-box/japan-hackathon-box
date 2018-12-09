import { getAccount, registerClient } from './clients/ontology'
import React from 'react'
import { render } from 'react-dom'
import Main from './components/Main'

document.addEventListener('DOMContentLoaded', async () => {
  registerClient()
  const userAddress = await getAccount()

  const container = document.getElementById('root')
  render(<Main userAddress={userAddress} />, container)
})
