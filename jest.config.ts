const { getJestProjects } = require('@nrwl/jest');

//module.exports = { projects: getJestProjects() };

export default {
  transformIgnorePatterns: [
    //"<rootDir>/node_modules/(?!lodash-es)"
    '/!node_modules\\/lodash-es/',
  ],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
    '^.+\\.(js|jsx|mjs)$': '<rootDir>/node_modules/babel-jest',
  },
  projects: [
    ...getJestProjects(),
    '<rootDir>/apps/zeka',
    '<rootDir>/libs/core-data',
    '<rootDir>/libs/core-state',
    '<rootDir>/libs/material',
    '<rootDir>/libs/api-interface',
  ],
};
