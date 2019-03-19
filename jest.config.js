module.exports = {
  collectCoverage: true,
  coverageReporters: ['lcov', 'text'],
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: ['<rootDir>/packages/**/src/*.{js}', '!**/node_modules/**'],
  projects: ['<rootDir>/packages/**/*.{js}'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/build/', '/docs/'],
  transform: { '^.+\\.js?$': '<rootDir>/babel-jest.setup.js' },
  transformIgnorePatterns: ['/node_modules/', '/dist/', '/build/', '/docs/'],
  setupFilesAfterEnv: ['raf/polyfill', 'jest-enzyme'],
  testEnvironment: 'enzyme'
};
