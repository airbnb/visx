module.exports = {
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: ['<rootDir>/packages/**/src/*.{js}', '!**/node_modules/**', '!**/dist/**'],
  projects: ['<rootDir>/packages/**/*.{js}'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/build/', '/docs/'],
  transform: {
    '^.+\\.js?$': '<rootDir>/babel-jest.setup.js'
  },
  setupFilesAfterEnv: ['raf/polyfill', 'jest-enzyme'],
  testEnvironment: 'enzyme'
};
