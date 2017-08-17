import React from 'react'
import ReactDOM from 'react-dom'
import {
  GradientDarkgreenGreen,
  GradientLightgreenGreen,
  GradientOrangeRed,
  GradientPinkBlue,
  GradientPinkRed,
  GradientPurpleOrange,
  GradientPurpleRed,
  GradientPurpleTeal,
  GradientSteelPurple,
  GradientTealBlue
} from '../src'

describe('<GradientDarkgreenGreen />', () => {
  test('it should be defined', () => {
    expect(GradientDarkgreenGreen).toBeDefined()
  })

  test('it should render without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<GradientDarkgreenGreen id="gradient" />, div)
  })
})

describe('<GradientLightgreenGreen />', () => {
  test('it should be defined', () => {
    expect(GradientLightgreenGreen).toBeDefined()
  })

  test('it should render without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<GradientLightgreenGreen id="gradient" />, div)
  })
})

describe('<GradientOrangeRed />', () => {
  test('it should be defined', () => {
    expect(GradientOrangeRed).toBeDefined()
  })

  test('it should render without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<GradientOrangeRed id="gradient" />, div)
  })
})

describe('<GradientPinkBlue />', () => {
  test('it should be defined', () => {
    expect(GradientPinkBlue).toBeDefined()
  })

  test('it should render without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<GradientPinkBlue id="gradient" />, div)
  })
})

describe('<GradientPinkRed />', () => {
  test('it should be defined', () => {
    expect(GradientPinkRed).toBeDefined()
  })

  test('it should render without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<GradientPinkRed id="gradient" />, div)
  })
})

describe('<GradientPurpleOrange />', () => {
  test('it should be defined', () => {
    expect(GradientPurpleOrange).toBeDefined()
  })

  test('it should render without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<GradientPurpleOrange id="gradient" />, div)
  })
})

describe('<GradientPurpleRed />', () => {
  test('it should be defined', () => {
    expect(GradientPurpleRed).toBeDefined()
  })

  test('it should render without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<GradientPurpleRed id="gradient" />, div)
  })
})

describe('<GradientPurpleTeal />', () => {
  test('it should be defined', () => {
    expect(GradientPurpleTeal).toBeDefined()
  })

  test('it should render without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<GradientPurpleTeal id="gradient" />, div)
  })
})

describe('<GradientSteelPurple />', () => {
  test('it should be defined', () => {
    expect(GradientSteelPurple).toBeDefined()
  })

  test('it should render without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<GradientSteelPurple id="gradient" />, div)
  })
})

describe('<GradientTealBlue />', () => {
  test('it should be defined', () => {
    expect(GradientTealBlue).toBeDefined()
  })

  test('it should render without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<GradientTealBlue id="gradient" />, div)
  })
})
