export const environment = {
  production: true,
  ApiBaseUrl: '__PARAM_Applications.IspApiUrl__',
  ApiSociabiliGatewayUrl: '__PARAM_Applications.SociabiliGatewayApi6Url__',
  GipsyUrl : '__PARAM_Applications.GipsyUrl__',
  OAuth: {
    clientId: '__PARAM_Adfs.ClientId__',
    loginUrl: '__PARAM_Adfs.AuthorizationUrl__',
    issuer: '__PARAM_Adfs.Issuer__',
    blackListNTLM: ['adfs'],
    blackListAnonymous: ['sociabiligw'],
  },
  AppVersion: '__PARAM_Version__',
  ShowVersion: '__PARAM_ShowVersion__'
};
