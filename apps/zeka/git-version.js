// This script runs operations *synchronously* which is normally not the best
// approach, but it keeps things simple, readable, and for now is good enough.

const { gitDescribeSync } = require('git-describe');
const { writeFileSync } = require('fs');

const gitInfo = gitDescribeSync();
const versionInfoJson = JSON.stringify(gitInfo, null, 2);

const tsContent = "export const gitVersion = " + versionInfoJson + ";\n";
writeFileSync('src/environments/git-version.ts', tsContent);
