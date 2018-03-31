const path = require('path')
const glob = require('glob')

const pkgs = glob.sync('./packages/*').map(p => p.replace(/^\./, '<rootDir>'))
const distDirs = pkgs.map(p => path.join(p, 'dist'))

module.exports = {
  cacheDirectory: '.cache/jest',
  bail: true,
  notify: true,
  verbose: true,
  useStderr: true,
  roots: pkgs,
  modulePathIgnorePatterns: distDirs,
  coveragePathIgnorePatterns: distDirs,
  setupFiles: ['raf/polyfill.js'],
  setupTestFrameworkScriptFile: './__tests__/setupTests.js',
  testMatch: ['**/?(*.)(spec|test).{js,jsx}'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '__tests__/fixtures'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    '^.+\\.css$': '<rootDir>/config/src/jest/cssTransform.js',
    '^(?!.*\\.(js|jsx|mjs|css|json)$)': '<rootDir>/config/src/jest/fileTransform.js',
  },
  collectCoverageFrom: ['**/packages/**/src/**/*.{js,jsx}', '!**/dist/**'],
  coverageReporters: ['html', 'clover'],
  coverageDirectory: './coverage/',
}
