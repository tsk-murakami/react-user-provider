const pkg = require('./package.json');

module.exports = {
  clearMocks: true,
  coveragePathIgnorePatterns: ['/__tests__/'],
  //coverageReporters: ['lcov', 'text', 'text-summary'],
  preset: 'ts-jest',
  /*
  reporters: [
    'default',
    ['jest-junit', { outputDirectory: 'test-results/jest' }],
  ],
  */
  testRegex: '/__tests__/.+test.tsx?$',
  globals: {
    'ts-jest': {
      tsconfig: "tsconfig.test.json"
    },
    __VERSION__: pkg.version,
  },
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};