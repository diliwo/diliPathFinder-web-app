import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs";

// class OAuth {
//   static clientId: string;
//   static loginUrl: string;
//   static issuer: string;
// }
// export class AppConfigs {
//   static env:string|null;
//   static production: boolean;
//   static ApiBaseUrl: string;
//   static ApiSociabiliGatewayUrl:string;
//   static GipsyUrl: string;
//   static OAuth: OAuth;
// }

export const AppConfigs = {
  production: false,
  Env: '',
  ApiBaseUrl: '',
  ApiSociabiliGatewayUrl: '',
  GipsyUrl : '',
  OAuth: {
    clientId: '',
    loginUrl: '',
    issuer: ''
  }
};

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private http:HttpClient) { }

  private config: any;

  public loadConfig(): Promise<void> {
    return new Promise((resolve, reject) => {
      const xmlHttp = new XMLHttpRequest();
      xmlHttp.open('GET', 'assets/config/config.json', true);
      xmlHttp.onload = () => {
        if (xmlHttp.status === 200 || xmlHttp.status === 304) {
          this.config = JSON.parse(xmlHttp.responseText);

          if(this.config !== null || this.config !== undefined){
            console.log('Config loaded');
            AppConfigs.ApiBaseUrl = this.config.ApiBaseUrl;
            AppConfigs.ApiSociabiliGatewayUrl = this.config.ApiSociabiliGatewayUrl;
            AppConfigs.GipsyUrl = this.config.GipsyUrl;
            AppConfigs.OAuth.clientId = this.config.OAuth.clientId;
            AppConfigs.OAuth.loginUrl = this.config.OAuth.loginUrl;
            AppConfigs.OAuth.issuer = this.config.OAuth.issuer;
            AppConfigs.production = this.config.production;
          }

          resolve();
        } else {
          console.error('Could not load config');
          reject(new Error('Could not load config'));
        }
      };
      xmlHttp.send();
    });
  }

  get apiBaseUrl(): string {
    if (!this.config) {
      throw new Error('Attempted to access configuration before it was loaded.');
    }
    return this.config.ApiBaseUrl;
  }

  get oauthConfig() {
    return this.config?.OAuthConfig;
  }

  get apiSociabiliGatewayUrl() {
    return this.config?.ApiSociabiliGatewayUrl;
  }

}
