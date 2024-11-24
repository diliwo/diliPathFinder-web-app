import { Directive, Input, SimpleChanges } from "@angular/core";
import { Validator, AbstractControl, NG_VALIDATORS } from "@angular/forms";

import { ValidatorBaseDirective } from './validator-base.directive';

@Directive({
  selector: "[afterDate]",
  providers: [
    { provide: NG_VALIDATORS, useExisting: AfterDateDirective, multi: true }
  ]
})
export class AfterDateDirective extends ValidatorBaseDirective implements Validator {
  @Input() afterDate!: Date;

  constructor() {
    super('afterDate');
  }

  validate(c: AbstractControl): { [key: string]: any} | null {
    const enDated = new Date(c.value);
    const startDate = new Date(this.afterDate);
    if (c.value && this.afterDate && enDated < startDate) {
      return {
        afterDate: true
      };
    }
    return null;
  }
}
