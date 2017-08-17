import React from 'react'
import ReactDOM from 'react-dom'
import { LinearGradient } from '../src'

describe('<LinearGradient />', () => {
  test('it should be defined', () => {
    expect(LinearGradient).toBeDefined()
  })

  test('it should render without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<LinearGradient id="linear" />, div)
  })
})
