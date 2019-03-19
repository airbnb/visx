module.exports = {
  collectCoverage: true,
  coverageReporters: ['lcov', 'text'],
  coverageDirectory: '<rootDir>coverage',
  collectCoverageFrom: ['<rootDir>packages/**/src/*.{js}', '!**/node_modules/**'],
  projects: ['<rootDir>packages/**/*.{js}'],
  moduleNameMapper: {
    '@vx/(.+)$': '<rootDir>packages/$1/src'
  },
  transform: { '^.+\\.js?$': '<rootDir>babel-jest.setup.js' },
  setupFilesAfterEnv: ['raf/polyfill', 'jest-enzyme'],
  testEnvironment: 'enzyme'
};
