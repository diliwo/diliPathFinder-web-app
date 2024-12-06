import './git-version';
import { gitVersion } from './git-version';

export const environment = {
  production: false,
  ApiBaseUrl: 'http://localhost:9010',
  AppVersion:
    'develop (build ' + gitVersion.hash + (gitVersion.dirty ? '*' : '') + ')',
  ShowVersion: true
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
