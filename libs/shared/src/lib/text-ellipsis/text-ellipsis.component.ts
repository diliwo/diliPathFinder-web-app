import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Component,AfterViewInit,Input,ViewChild,TemplateRef, ContentChild, ElementRef, AfterContentInit} from '@angular/core';

@Component({
  selector: 'frontend-text-ellipsis',
  templateUrl: './text-ellipsis.component.html',
  styleUrls: ['./text-ellipsis.component.scss']
})

export class TextEllipsisComponent {

  @ViewChild('text') textElement!: ElementRef;
  textStr!: string;

  ngOnInit() {
    this.textStr = this.textElement?.nativeElement.innerText;
  }
}
