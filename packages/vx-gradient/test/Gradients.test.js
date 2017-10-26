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
    ReactDOM.render(<svg><GradientDarkgreenGreen id="gradient" /></svg>, div)
  })
})

describe('<GradientLightgreenGreen />', () => {
  test('it should be defined', () => {
    expect(GradientLightgreenGreen).toBeDefined()
  })

  test('it should render without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<svg><GradientLightgreenGreen id="gradient" /></svg>, div)
  })
})

describe('<GradientOrangeRed />', () => {
  test('it should be defined', () => {
    expect(GradientOrangeRed).toBeDefined()
  })

  test('it should render without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<svg><GradientOrangeRed id="gradient" /></svg>, div)
  })
})

describe('<GradientPinkBlue />', () => {
  test('it should be defined', () => {
    expect(GradientPinkBlue).toBeDefined()
  })

  test('it should render without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<svg><GradientPinkBlue id="gradient" /></svg>, div)
  })
})

describe('<GradientPinkRed />', () => {
  test('it should be defined', () => {
    expect(GradientPinkRed).toBeDefined()
  })

  test('it should render without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<svg><GradientPinkRed id="gradient" /></svg>, div)
  })
})

describe('<GradientPurpleOrange />', () => {
  test('it should be defined', () => {
    expect(GradientPurpleOrange).toBeDefined()
  })

  test('it should render without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<svg><GradientPurpleOrange id="gradient" /></svg>, div)
  })
})

describe('<GradientPurpleRed />', () => {
  test('it should be defined', () => {
    expect(GradientPurpleRed).toBeDefined()
  })

  test('it should render without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<svg><GradientPurpleRed id="gradient" /></svg>, div)
  })
})

describe('<GradientPurpleTeal />', () => {
  test('it should be defined', () => {
    expect(GradientPurpleTeal).toBeDefined()
  })

  test('it should render without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<svg><GradientPurpleTeal id="gradient" /></svg>, div)
  })
})

describe('<GradientSteelPurple />', () => {
  test('it should be defined', () => {
    expect(GradientSteelPurple).toBeDefined()
  })

  test('it should render without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<svg><GradientSteelPurple id="gradient" /></svg>, div)
  })
})

describe('<GradientTealBlue />', () => {
  test('it should be defined', () => {
    expect(GradientTealBlue).toBeDefined()
  })

  test('it should render without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<svg><GradientTealBlue id="gradient" /></svg>, div)
  })
})
