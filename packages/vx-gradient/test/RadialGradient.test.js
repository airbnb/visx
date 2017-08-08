import React from 'react'
import ReactDOM from 'react-dom'
import { RadialGradient } from '../src'

describe('<RadialGradient />', () => {
  it('should be defined', () => {
    expect(RadialGradient).toBeDefined()
  })

  it('should render without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<RadialGradient id="radial" />, div)
  })
})
