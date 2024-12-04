import { Component } from '@angular/core';
import { ToolbarComponent } from "./toolbar/toolbar.component";

@Component({
  selector: 'frontend-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ZeKa';
}
