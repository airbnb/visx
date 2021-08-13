import React from 'react';
import { render } from '@testing-library/react';

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
  GradientTealBlue,
} from '../src';

describe('<GradientDarkgreenGreen />', () => {
  test('it should be defined', () => {
    expect(GradientDarkgreenGreen).toBeDefined();
  });

  test('it should render without crashing', () => {
    expect(() =>
      render(
        <svg>
          <GradientDarkgreenGreen id="gradient" />
        </svg>,
      ),
    ).not.toThrow();
  });
});

describe('<GradientLightgreenGreen />', () => {
  test('it should be defined', () => {
    expect(GradientLightgreenGreen).toBeDefined();
  });

  test('it should render without crashing', () => {
    expect(() =>
      render(
        <svg>
          <GradientLightgreenGreen id="gradient" />
        </svg>,
      ),
    ).not.toThrow();
  });
});

describe('<GradientOrangeRed />', () => {
  test('it should be defined', () => {
    expect(GradientOrangeRed).toBeDefined();
  });

  test('it should render without crashing', () => {
    expect(() =>
      render(
        <svg>
          <GradientOrangeRed id="gradient" />
        </svg>,
      ),
    ).not.toThrow();
  });
});

describe('<GradientPinkBlue />', () => {
  test('it should be defined', () => {
    expect(GradientPinkBlue).toBeDefined();
  });

  test('it should render without crashing', () => {
    expect(() =>
      render(
        <svg>
          <GradientPinkBlue id="gradient" />
        </svg>,
      ),
    ).not.toThrow();
  });
});

describe('<GradientPinkRed />', () => {
  test('it should be defined', () => {
    expect(GradientPinkRed).toBeDefined();
  });

  test('it should render without crashing', () => {
    expect(() =>
      render(
        <svg>
          <GradientPinkRed id="gradient" />
        </svg>,
      ),
    ).not.toThrow();
  });
});

describe('<GradientPurpleOrange />', () => {
  test('it should be defined', () => {
    expect(GradientPurpleOrange).toBeDefined();
  });

  test('it should render without crashing', () => {
    expect(() =>
      render(
        <svg>
          <GradientPurpleOrange id="gradient" />
        </svg>,
      ),
    ).not.toThrow();
  });
});

describe('<GradientPurpleRed />', () => {
  test('it should be defined', () => {
    expect(GradientPurpleRed).toBeDefined();
  });

  test('it should render without crashing', () => {
    expect(() =>
      render(
        <svg>
          <GradientPurpleRed id="gradient" />
        </svg>,
      ),
    ).not.toThrow();
  });
});

describe('<GradientPurpleTeal />', () => {
  test('it should be defined', () => {
    expect(GradientPurpleTeal).toBeDefined();
  });

  test('it should render without crashing', () => {
    expect(() =>
      render(
        <svg>
          <GradientPurpleTeal id="gradient" />
        </svg>,
      ),
    ).not.toThrow();
  });
});

describe('<GradientSteelPurple />', () => {
  test('it should be defined', () => {
    expect(GradientSteelPurple).toBeDefined();
  });

  test('it should render without crashing', () => {
    expect(() =>
      render(
        <svg>
          <GradientSteelPurple id="gradient" />
        </svg>,
      ),
    ).not.toThrow();
  });
});

describe('<GradientTealBlue />', () => {
  test('it should be defined', () => {
    expect(GradientTealBlue).toBeDefined();
  });

  test('it should render without crashing', () => {
    expect(() =>
      render(
        <svg>
          <GradientTealBlue id="gradient" />
        </svg>,
      ),
    ).not.toThrow();
  });
});
