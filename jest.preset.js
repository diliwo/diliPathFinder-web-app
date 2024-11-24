const nxPreset = require('@nrwl/jest/preset').default;


module.exports = {
  ...nxPreset,
  testMatch: ["**/+(*.)+(spec|test).+(ts|js)?(x)"],
  transform: {
      "^.+\\.(ts|js|html)$": "ts-jest",
  },
  resolver: "@nrwl/jest/plugins/resolver",
  moduleFileExtensions: ["ts", "js", "html","mjs"],
  coverageReporters: ["html"],
  // transformIgnorePatterns: [
  //   "<rootDir>/node_modules/(?!lodash-es)"
  //   //"/!node_modules\\/lodash-es/"
  // ],
  // transform: {
  //   '^.+\\.ts?$': 'ts-jest',
  //   "^.+\\.(js|jsx|mjs)$": "babel-jest"
  // },
  moduleNameMapper: {
    "lodash-es": "lodash",
  }
};
