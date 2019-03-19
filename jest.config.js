module.exports = {
  collectCoverage: true,
  coverageReporters: ['lcov', 'text'],
  coverageDirectory: '<rootDir>coverage',
  collectCoverageFrom: ['<rootDir>packages/**/src/*.{js}', '!**/node_modules/**'],
  projects: ['<rootDir>packages/**/*.{js}'],
  testMatch: ['**/test/*.+(js)', '**/*.test.+(js)'],
  transform: { '^.+\\.js?$': '<rootDir>babel-jest.setup.js' },
  setupFilesAfterEnv: ['raf/polyfill', 'jest-enzyme'],
  testEnvironment: 'enzyme'
};
