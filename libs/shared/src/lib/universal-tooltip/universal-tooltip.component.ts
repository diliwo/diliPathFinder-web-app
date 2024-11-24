import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Component,AfterViewInit,Input,ViewChild,TemplateRef, ContentChild, ElementRef, AfterContentInit, OnInit} from '@angular/core';

@Component({
  selector: 'frontend-univesal-tooltip',
  templateUrl: './universal-tooltip.component.html',
  styleUrls: ['./universal-tooltip.component.scss']
})

export class UniversalTooltipComponent implements OnInit {

  @Input() item: any;
  @Input() showsTooltip = true;
  @Input() topPosition = 100;
  @Input() leftPosition = 280;

  mailText!:string;

  ngOnInit(): void {
   console.log();
  }

  hasOnlyDigit(phones: string){
    //const splittedString = _.split(phones, '');
    let spChars = /^\d{2}.+$/;
    if(spChars.test(phones)){
      return true;
    } else {
      return false;
    }
  }

  sendMail(contactPerson: string){
    this.mailText = "mailto:"+contactPerson+"+?subject=files";
    window.location.href = this.mailText;
  }
}
