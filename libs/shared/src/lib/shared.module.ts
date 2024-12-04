import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { UniversalTooltipComponent } from './universal-tooltip/universal-tooltip.component';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { AfterDateDirective } from './dates/after-date.directive';
import { ValidatorBaseDirective } from './dates/validator-base.directive';
import { PartnerDetailsBoxComponent } from './partner-details-box/partner-details-box.component';
import { MaterialModule } from '@frontend/material';
import { TextEllipsisComponent } from './text-ellipsis/text-ellipsis.component';
import { ConfirmationBoxComponent } from './confirmation-box/confirmation-box.component';

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
    PartnerDetailsBoxComponent,
    ConfirmationBoxComponent
  ],
  declarations: [
    TextEllipsisComponent,
    UniversalTooltipComponent,
    CapitalizePipe,
    AfterDateDirective,
    ValidatorBaseDirective,
    PartnerDetailsBoxComponent,
    ConfirmationBoxComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class SharedModule { }
