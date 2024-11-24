import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { BeneficiaryFormation, FormationResult, Formation, courseLevel, ProfessionMv,BilanProfessionVm} from '@frontend/api-interface';
import * as _ from 'lodash-es';
import { tools } from '@frontend/shared';
import { debounceTime, distinctUntilChanged, filter, Observable, startWith } from 'rxjs';
import { ProfessionsFacadeService } from '@frontend/core-state';
import { MatAutocomplete } from '@angular/material/autocomplete';

@Component({
  selector: 'frontend-bilan-profession-details',
  templateUrl: './bilan-profession-details.component.html',
  styleUrls: ['./bilan-profession-details.component.scss']
})
export class BilanProfessionDetailsComponent implements OnInit{
  @ViewChild('input') input!: ElementRef;

  allProfessions$: Observable<ProfessionMv.ProfessionList> = this.professionsFacadeService.allProfessions$;
  filteredOptions$: Observable<ProfessionMv.ProfessionList[]>;


  @Input()
	public childForm: FormGroup;

	@Input()
	public arrayIndex: number;

	@Input()
	public totalBilanProfessions: number;

  @Input()
  public professionTitleValue: string;

	@Output()
	public deleteContactEvent: EventEmitter<number> = new EventEmitter<number>();


  selectedProfessionName : string[] = [];

	get professionIdField (): FormControl {
		return this.childForm?.get( 'professionId' ) as FormControl;
	}
  get professionTitleField (): FormControl {
		return this.childForm?.get( 'professionTitle' ) as FormControl;
	}
	get acquiredKnowledgeField (): FormControl {
		return this.childForm?.get( 'acquiredKnowledge' ) as FormControl;
	}
  get acquiredBehaviouralKnowledgeField (): FormControl {
		return this.childForm?.get( 'acquiredBehaviouralKnowledge' ) as FormControl;
	}
	get acquiredKnowHowField (): FormControl {
		return this.childForm?.get( 'acquiredKnowHow' ) as FormControl;
	}
  get knowledgeToDevelopField (): FormControl {
		return this.childForm?.get( 'knowledgeToDevelop' ) as FormControl;
	}
	get knowHowToDevelopField (): FormControl {
		return this.childForm?.get( 'knowHowToDevelop' ) as FormControl;
	}
  get behaviouralKnowledgeToDevelopField (): FormControl {
		return this.childForm?.get( 'behaviouralKnowledgeToDevelop' ) as FormControl;
	}

  static addBilanProfessionItem ( profesion?: BilanProfessionVm.BilanProfession ): FormGroup {
		return new FormGroup({
      bilanProfessionId: new FormControl((profesion == null) ? '' : profesion.bilanProfessionId,{validators: []}),
			professionId: new FormControl((profesion == null) ? '' : profesion.professionId ,{validators: []}),
      professionTitle: new FormControl((profesion == null) ? '' : profesion.professionTitle,{validators: []}),
      acquiredKnowledge: new FormControl((profesion == null) ? '' : profesion.acquiredKnowledge,{validators: []}),
      acquiredBehaviouralKnowledge: new FormControl((profesion == null) ? '' : profesion.acquiredBehaviouralKnowledge,{validators: []}),
      acquiredKnowHow: new FormControl((profesion == null) ? '' : profesion.acquiredKnowHow,{validators: []}),
      knowledgeToDevelop: new FormControl((profesion == null) ? '' : profesion.knowledgeToDevelop,{validators: []}),
      knowHowToDevelop: new FormControl((profesion == null) ? '' : profesion.knowHowToDevelop,{validators: []}),
      behaviouralKnowledgeToDevelop: new FormControl((profesion == null) ? '' : profesion.behaviouralKnowledgeToDevelop,{validators: []})
		});
	}

	constructor(
    private professionsFacadeService : ProfessionsFacadeService,
  ) {}

  displayFn(profession: ProfessionMv.Profession): string {
    return profession && profession.name ? profession.name : '';
  }
  onSelectProfessionOne() {
    if(this.selectedProfessionName?.length == 0){
      const Profession = this.childForm?.get('professionTitle').value;
      this.selectedProfessionName.push(Profession.name);
      this.childForm?.get('professionId').setValue(Profession.professionId);
      this.childForm?.get('professionTitle').setValue(Profession.name);
    }
    this.input.nativeElement.value = '';
  }

  remove(profession: string): void {
    //professionCtl.enable();
    const index = this.selectedProfessionName.indexOf(profession);
    if (index >= 0) {
      this.selectedProfessionName.splice(index, 1);
      this.childForm?.get('professionTitle').setValue('');
    }
  }

  professionalNameInit(data: any,profession: string[]){
    if((data && data.bilan.proExpectationJobTitleOne != '') && profession?.length == 0){
      profession.push(data.bilan.proExpectationJobTitleOne);
    }
  }
  ngOnInit(): void {
    this.childForm?.get('professionTitle')?.valueChanges
    .pipe (
       startWith(''),
       debounceTime(300),
       distinctUntilChanged(),
       //filter ((value) => value.length > 2)
    ).subscribe((value) => {
      console.log(value);
      this.professionsFacadeService.load(1,1000,value);
    });

    if(this.professionTitleValue != undefined && this.professionTitleValue != ''){
      this.selectedProfessionName.push(this.professionTitleValue);
    }
  }

	public deleteContact ( index: number ): void {
		this.deleteContactEvent.next( index );
	}
}

