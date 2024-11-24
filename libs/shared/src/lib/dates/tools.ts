import { AbstractControl, FormControl, ValidationErrors } from "@angular/forms";

export function formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }


  export function  Europatools(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [day, month, year].join('/');
  }

  export function dateValidator(control: AbstractControl): ValidationErrors | null
  {
    const date = new Date(control.value);

    function isDateValid(date: any){
      if (Object.prototype.toString.call(date) === '[object Date]') {
        // it is a date
        if (isNaN(date)) {
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    }

    const isDateValieResult = isDateValid(date);

    return isDateValieResult ? null : { invalidDate: control.value };
  }



  export function isEndDateConsistent(formItem: string): any {
    return (ctl: FormControl) => {
        const formGp = ctl.parent;
        if(formGp){
          const enDated = new Date(ctl.value);
          const startDate = new Date(formGp.get(formItem).value);
          if (enDated.getTime() < startDate.getTime()){
            return { isEndDateConsistent: true }
          }
        }else {
          return null;
        }
    };
  }
