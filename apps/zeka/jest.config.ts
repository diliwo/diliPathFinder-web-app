/* eslint-disable */
// export default {
//   displayName: 'isp',
//   preset: '../../jest.preset.js',
//   setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
//   globals: {
//     'ts-jest': {
//       stringifyContentPathRegex: '\\.(html|svg)$',

//       tsconfig: '<rootDir>/tsconfig.spec.json',
//     },
//   },
//   coverageDirectory: '../../coverage/apps/isp',
//   snapshotSerializers: [
//     'jest-preset-angular/build/serializers/no-ng-attributes',
//     'jest-preset-angular/build/serializers/ng-snapshot',
//     'jest-preset-angular/build/serializers/html-comment',
//   ],
//   transform: {
//     '^.+.(ts|mjs|js|html)$': 'jest-preset-angular',
//   },
//   transformIgnorePatterns: ['node_modules/(?!.*.mjs$)'],
// };

// jest.config.js

// const esModules = ['@angular', '@ngrx', 'd3'];
// export default {
//   // [...],
//   extensionsToTreatAsEsm: ['.ts'],
//   globals: {
//     'ts-jest': {
//       useESM: true,
//       tsconfig: '<rootDir>/tsconfig.spec.json',
//       stringifyContentPathRegex: '\\.html$',
//     },
//   },
//   moduleFileExtensions: ['ts', 'html', 'js', 'json', 'mjs'],
//   moduleNameMapper: {
//     '^(\\.{1,2}/.*)\\.js$': '$1',
//   },
//   transform: {
//     '^.+\\.(ts|js|mjs|html|svg)$': 'jest-preset-angular',
//   },
//   transformIgnorePatterns: [
//     `<rootDir>/node_modules/(?!.*\\.mjs$|${esModules.join('|')})`,
//   ]
// };

export default {
  displayName: 'App.i',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  testEnvironment: "jsdom",
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
      stringifyContentPathRegex: '\\.(html|svg)$',
    },
  },
  coverageDirectory: '../../coverage/apps/zeka',
  reporters: [
    "default",
    [ "jest-junit", { 
      outputDirectory: './coverage/apps/zeka'
    }]
  ],
  coverageReporters: [
    "text",
    "lcov",
    "json",
    "clover",
    "cobertura"
  ],
  transform: {
    '^.+\\.(ts|mjs|js|html)$': 'jest-preset-angular',
  },
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
