import './git-version';
import { gitVersion } from './git-version';

export const environment = {
  production: false,
  //ApiBaseUrl: 'http://localhost:5001',
  ApiBaseUrl: 'http://ispapiint',
  ApiSociabiliGatewayUrl: 'http://sociabiligwint6/api/v6/',
  GipsyUrl : 'http://gipsyint/',
  OAuth: {
    clientId: '3e8efcc4-2c25-4f8c-a235-d418117830a2',
    loginUrl: 'https://auth-dev.cpas-schaerbeek.brussels/adfs/oauth2/authorize',
    issuer: 'https://auth-dev.cpas-schaerbeek.brussels/adfs',
    blackListNTLM: ['adfs'],
    blackListAnonymous: ['sociabiligw'],
  },
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
