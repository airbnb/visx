import React from 'react'
import ReactDOM from 'react-dom'
import { RadialGradient } from '../src'

describe('<RadialGradient />', () => {
  test('should be defined', () => {
    expect(RadialGradient).toBeDefined()
  })

  test('should render without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<RadialGradient id="radial" />, div)
  })
})
