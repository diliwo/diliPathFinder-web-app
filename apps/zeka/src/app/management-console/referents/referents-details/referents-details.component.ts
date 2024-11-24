import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Referent, UpsertReferenceCommand, User, Users} from '@frontend/api-interface';
//import { ServicesIspFacadeService } from '@frontend/core-state';
import * as _ from 'lodash-es';
import { debounceTime, distinctUntilChanged, Observable, of, startWith,filter } from 'rxjs';
import { ReferentFacadeService, UsersFacadeService } from '@frontend/core-state';
import { Console } from 'console';

@Component({
  selector: 'frontend-referents-details',
  templateUrl: './referents-details.component.html',
  styleUrls: ['./referents-details.component.scss']
})
export class ReferentsDetailsComponent implements OnInit {
  users$: Observable<Users> = this.referentFacadeService.users$;
  isDisabled: boolean;
  public frm: FormGroup;
  public ctlFirstname: FormControl;
  public ctlLastname: FormControl;
  public ctlServiceId: FormControl;
  public ctlUser: FormControl;
  public isNew: boolean;
  public listServices: any[];
  public usersLoading = false;
  filteredOptions: Observable<User[]>;
  options : User[];

  constructor(
    public dialogRef: MatDialogRef<ReferentsDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { upsertReferenceCommand: UpsertReferenceCommand; isNew: boolean; services: any[], listReferents: any[]},
    private fb: FormBuilder,
    private referentFacadeService : ReferentFacadeService,
    //private servicesIspFacadeService: ServicesIspFacadeService
  ) {

    this.ctlFirstname = this.fb.control('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)]);
    this.ctlLastname = this.fb.control('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50)]);

    this.ctlServiceId = this.fb.control('',[]);
    this.ctlUser = this.fb.control({value: '', disabled: false},[]);

    this.frm = this.fb.group({
      referentId: this.data.upsertReferenceCommand.referentId,
      firstname: this.ctlFirstname,
      lastname: this.ctlLastname,
      serviceId: this.ctlServiceId,
      userName: this.data.upsertReferenceCommand.username,
      user: this.ctlUser
    });

    this.isNew = data.isNew;
    //this.frm.patchValue(data.upsertReferenceCommand);
    this.frm.get("firstname").patchValue(data.upsertReferenceCommand.firstname);
    this.frm.get("lastname").patchValue(data.upsertReferenceCommand.lastname);
    this.frm.get("serviceId").patchValue(data.upsertReferenceCommand.serviceId);
    //this.frm.get("userName").patchValue(data.upsertReferenceCommand.username);
    this.listServices = data.listReferents;
    this.isDisabled = true;

    if(!this.isNew){
      this.frm.controls['user'].disable();
    }

  }
  ngOnInit(): void {
    this.referentFacadeService.spinner$.subscribe((_) => {
      this.usersLoading = false;
    });

    this.frm.get("user").valueChanges
    .pipe (
       startWith(''),
       debounceTime(300),
       distinctUntilChanged(),
       filter ((value) => value.length > 2)
       //map(name => (name ? this._filter(name) : []))
    ).subscribe((value) => {
      this.usersLoading = true;
      this.referentFacadeService.referentBySearch(value);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  update() {
    this.dialogRef.close(this.frm.value);
  }

  cancel() {
    this.dialogRef.close();
  }

  displayUserFn(user: User): string {
    return user ? user.lastname + ' ' + user.firstname : '';
  }

  onUserSelect(value: User) {
    if(value != null){
      this.frm.get("firstname").setValue(value.firstname);
      this.frm.get("lastname").setValue(value.lastname);
      this.frm.get("userName").setValue(value.userName);
      this.ctlUser.setValue('');
      this.frm.markAsDirty();
    }
  }
}
