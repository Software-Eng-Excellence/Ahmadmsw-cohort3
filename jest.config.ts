import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  preset: 'ts-jest',                    // Specifies that we are using ts-jest for TypeScript
  testEnvironment: 'node',              // Specifies the test environment (e.g., jsdom or node)
  roots: ['<rootDir>/tests'],                 // Specifies the root directory for Jest to look for test files
  testMatch: ['**/*.test.ts'],
  testPathIgnorePatterns: ["/node_modules/"],
  verbose: true,                        // Enables verbose output during testing
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'], // Specifies the files to collect coverage from
  collectCoverage: true,                // Enables code coverage collection
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {

      functions: 85,// Minimum percentage of functions that must be covered by tests

      statements: 75// Minimum percentage of statements that must be covered by tests
    }
  }
}

export default config;
// hey copilot how can i set good format to my vs code code what i can press ?
//it does not work why ?
//when i press it he go to search
// i already download eslint how can i use it ?
//answer to the up question please
//you can use ESLint in VS Code by installing the ESLint extension from the marketplace. Once installed, you can configure it by creating an .eslintrc.js file in your project root and adding your desired rules.