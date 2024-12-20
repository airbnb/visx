/** @type {import('jest').Config} */
module.exports = {
  bail: false,
  collectCoverageFrom: [
    '**/src/**/*.{ts,tsx,js,jsx}',
    '**/test/**/*.{ts,tsx,js,jsx}',
    'packages/src/**/*.{ts,tsx}',
    '!node_modules/**',
    '!packages/**/esm/**',
    '!packages/**/lib/**',
    '!packages/**/node_modules/**',
    '!packages/visx-demo/**',
    '!packages/visx-visx/**',
  ],
  coverageDirectory: './coverage',
  coveragePathIgnorePatterns: [
    'coverage/',
    'node_modules/',
    'public/',
    'esm/',
    'lib/',
    'tmp/',
    'dist/',
  ],
  coverageReporters: ['lcov', 'json-summary', 'html', 'json'],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0,
    },
  },
  moduleFileExtensions: ['mock.js', 'ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^.+\\.(ttf|eot|otf|svg|woff|woff2|mp3|png|jpg|jpeg|gif|ico)$':
      '<rootDir>/config-jest/mocks/file.js',
  },
  roots: ['<rootDir>/packages'],
  setupFiles: ['<rootDir>/config-jest/setup/shims.js', '<rootDir>/config-jest/setup/console.js'],
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    url: 'http://localhost',
  },
  verbose: true,
  testPathIgnorePatterns: ['<rootDir>/packages/visx-demo'],
  transformIgnorePatterns: [
    'node_modules/(?!(d3-(array|color|format|geo|interpolate|scale|time|time-format)|delaunator|internmap|robust-predicates)/)',
  ],
};
