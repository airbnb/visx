import React from 'react'
import ReactDOM from 'react-dom'
import { RadialGradient } from '../src'

describe('<RadialGradient />', () => {
  test('it should be defined', () => {
    expect(RadialGradient).toBeDefined()
  })

  test('it should render without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<svg><RadialGradient id="radial" /></svg>, div)
  })
})
