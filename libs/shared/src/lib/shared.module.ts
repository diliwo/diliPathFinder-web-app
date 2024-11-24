import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { TextEllipsisComponent } from './text-ellipsis/text-ellipsis.component';
import { UniversalTooltipComponent } from './universal-tooltip/universal-tooltip.component';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { AfterDateDirective } from './dates/after-date.directive';
import { ValidatorBaseDirective } from './dates/validator-base.directive';
import { PartnerDetailsBoxComponent } from './partner-details-box/partner-details-box.component';
import { MaterialModule } from '@frontend/material';

@NgModule({
  imports: [CommonModule, MaterialModule,FormsModule,ReactiveFormsModule],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TextEllipsisComponent,
    UniversalTooltipComponent,
    CapitalizePipe,
    AfterDateDirective,
    ValidatorBaseDirective,
    PartnerDetailsBoxComponent
  ],
  declarations: [
    TextEllipsisComponent,
    UniversalTooltipComponent,
    CapitalizePipe,
    AfterDateDirective,
    ValidatorBaseDirective,
    PartnerDetailsBoxComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class SharedModule { }
