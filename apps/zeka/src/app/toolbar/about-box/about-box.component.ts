import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { gitVersion } from '../../../environments/git-version';
import { VersionBeService } from 'libs/core-data/src/lib/services/version.be.service';



@Component({
  selector: 'app-about-box',
  templateUrl: './about-box.component.html',
  styleUrls: ['./about-box.component.scss']
})
export class AboutBoxComponent implements OnInit {
  public version = environment.AppVersion;
  public gitVersion = gitVersion;
  public backendVersion: string = '';
  constructor(private versionBeService: VersionBeService) { }

  ngOnInit() {
    this.getVersionFromBackend();
  }

  public getBrowserName() {
    const agent = window.navigator.userAgent.toLowerCase();
    switch (true) {
      case agent.indexOf('edge') > -1:
        return 'Edge';
      case agent.indexOf('msie') > -1:
        return 'Internet Explorer';
      case agent.indexOf('opr') > -1 && !!(window as any).opr:
        return 'Opera';
      case agent.indexOf('chrome') > -1 && !!(window as any).chrome:
        return 'Chrome';
      case agent.indexOf('trident') > -1:
        return 'Internet Explorer';
      case agent.indexOf('firefox') > -1:
        return 'Firefox';
      case agent.indexOf('safari') > -1:
        return 'Safari';
      default:
        return 'Other';
    }
  }

  public getBrowserVersion() {
    let result = '';
    const agent = window.navigator.userAgent.toLowerCase();
    let versionOffset = 0;
    switch (true) {
      case agent.indexOf('msie') > -1:
        versionOffset = agent.indexOf('msie');
        result = agent.substring(versionOffset + 5);
        break;
      case agent.indexOf('chrome') > -1 && !!(window as any).chrome:
        versionOffset = agent.indexOf('chrome');
        result = agent.substring(versionOffset + 7);
        break;
      case agent.indexOf('trident') > -1:
        versionOffset = agent.indexOf('trident');
        result = agent.substring(versionOffset + 8);
        break;
      case agent.indexOf('safari') > -1:
        versionOffset = agent.indexOf('safari');
        result = agent.substring(versionOffset + 7);
        versionOffset = agent.indexOf('Version');
        if (versionOffset !== -1) {
          result = agent.substring(versionOffset + 8);
        }
        break;
      default:
        versionOffset = agent.lastIndexOf('/');
        result = agent.substring(versionOffset + 1);
        break;
    }
    const ix = result.indexOf(';');
    if ( ix !== -1) {
      result = result.substring(0, ix);
    }

    const ix2 = result.indexOf(' ');
    if (ix2 !== -1) {
      result = result.substring(0, ix2);
    }
    return result;
  }

  getVersionFromBackend() {
    this.versionBeService.getBeVersion().subscribe({
      next: (data) => {
        this.backendVersion = data;
      },
      error: (error) => {
        console.error('Error getting backend version', error);
      }
    });
  }
}
