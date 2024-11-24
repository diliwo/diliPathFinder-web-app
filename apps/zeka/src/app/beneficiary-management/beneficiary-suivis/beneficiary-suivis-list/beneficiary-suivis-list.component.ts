import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { BeneficiarySuivisService, MonitoringActionsService, ReferentService, SupportsService } from '@frontend/core-data';
import { BeneficiarySuivisFacadeService, BenefSuiviDataSource, } from '@frontend/core-state';
import { tap } from 'rxjs/operators';
import { QuarterlyMonitoringDto, MonitoringActionDto, Referent, ReferentListVm, SupportListVm, UpdateQuarterlyMonitoringCommand, CreateQuarterlyMonitoringCommand, SupportDetail } from '@frontend/api-interface';
import { BeneficiarySuiviDetailsComponent } from '../beneficiary-suivi-details/beneficiary-suivi-details.component';
import { ConfirmationBoxComponent } from '@frontend/shared';
@Component({
  selector: 'frontend-beneficiary-suivis-list',
  templateUrl: './beneficiary-suivis-list.component.html',
  styleUrls: ['./beneficiary-suivis-list.component.scss']
})
export class BeneficiarySuivisListComponent implements OnInit {

  dataSource : BenefSuiviDataSource;
  displayedColumns = ["monitoringActionLabel", "referentName","actionDate","actionComment", "actions"];
  nbOfSuivis:number;
  actionList : MonitoringActionDto[] = [];
  referentList: Referent[] = [];
  myReferentId : number = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  //@ViewChild(MatSort) sort: MatSort;
  private paginatorContent: ElementRef;
  @ViewChild('paginatorContent') set content(content: ElementRef){
    if(content){
      this.paginatorContent = content;
    }
  }
  @ViewChild('input') input: ElementRef;
  @Output() updateEvent: EventEmitter<any> = new EventEmitter();
  @Output() createEvent: EventEmitter<any> = new EventEmitter();
  @Output() deleteEvent: EventEmitter<any> = new EventEmitter();
  @Input() beneficiaryId;
  filter : string = '';
  suivis: QuarterlyMonitoringDto[] = [];
  constructor(private benefSuiviService : BeneficiarySuivisService,
    private actionsService : MonitoringActionsService,
    private beneficiarySuivisFacadeService: BeneficiarySuivisFacadeService,
    private referentService : ReferentService,
    private supportsService: SupportsService,
    public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.dataSource = new BenefSuiviDataSource(this.benefSuiviService, this.actionsService);
    this.dataSource.loadSuivis(1, 25, this.beneficiaryId, this.filter);
    this.getNumberOfSuivis();
    this.loadActions();
    this.loadReferents();
    this.getBenefeciaryReferentId();
  }

  ngAfterViewInit(): void {
    // on paginate events, load a new page
    this.paginator.page
    .pipe(
        tap(() => {
          this.loadBeneficiarySuivisPage()
        })
    )
    .subscribe();

    // on create or update, load new page
    this.beneficiarySuivisFacadeService.mutation$.subscribe((_) => {
      console.log(_);
      console.log('Notification received !');
      this.loadBeneficiarySuivisPage();
      this.getNumberOfSuivis();
    });

    this.beneficiarySuivisFacadeService.mutation$.subscribe((_) => {
      this.loadActions();
    });
}

loadBeneficiarySuivisPage() {
    this.dataSource.loadSuivis(
      this.paginator.pageIndex+1,
      this.paginator.pageSize,
      this.beneficiaryId,
      this.filter
    );
}


loadActions(){
  this.actionList = [];
  this.beneficiarySuivisFacadeService.getActionsList();
  this.beneficiarySuivisFacadeService.actions$.subscribe((actionList) => {
    this.actionList = actionList;
    console.log(this.actionList);
  });
}

loadReferents(){
  this.referentService.getAll(1,1000,'','lastname asc').subscribe((referentsApi :ReferentListVm) => {
    this.referentList = referentsApi.referents;
    console.log(this.referentList);
  });
}

//peut être deplacé
getBenefeciaryReferentId(){
  let supports :SupportDetail[] = [];
  this.supportsService.getAll(1,1000,this.beneficiaryId).subscribe((supportsPL :SupportListVm) => {
    supports = supportsPL.supports;
    if(supports.length > 0){
      this.myReferentId = supports.filter(s => s.isActif)[0]?.referentId;
    }
  });

}

view(benefSuivi: QuarterlyMonitoringDto) {
  this.dialog.open(BeneficiarySuiviDetailsComponent,
    { height: '550px',
    width: '50%',
    data: { benefSuivi : benefSuivi, benefReferentId: this.myReferentId, actions: this.actionList,referents : this.referentList, isNew: false, isReadonly: true } });
}

edit(benefSuivi: QuarterlyMonitoringDto) {
  benefSuivi.beneficiaryId = this.beneficiaryId;
  const dlg = this.dialog.open(BeneficiarySuiviDetailsComponent,
    { height: '550px',
    width: '50%',
    data: { benefSuivi : benefSuivi, benefReferentId: this.myReferentId, actions: this.actionList,referents : this.referentList, isNew: false } });
  dlg.beforeClosed().subscribe(res => {
      if (res) {
          let updateCommand : UpdateQuarterlyMonitoringCommand = new UpdateQuarterlyMonitoringCommand(res);
          console.log(updateCommand);
          this.beneficiarySuivisFacadeService.update(updateCommand);
      }
  });
}

create(){
  const benefSuivi = new QuarterlyMonitoringDto();
  benefSuivi.beneficiaryId = this.beneficiaryId;
  benefSuivi.referentId = this.myReferentId;
  const dlg = this.dialog.open(BeneficiarySuiviDetailsComponent,
    { height: '550px',
    width: '50%',
    data: { benefSuivi: benefSuivi, benefReferentId:this.myReferentId, actions: this.actionList, referents : this.referentList, isNew : true } });
  dlg.beforeClosed().subscribe(res => {
      if (res) {
        let createCommand : CreateQuarterlyMonitoringCommand = new CreateQuarterlyMonitoringCommand(res);
        console.log(createCommand);
        this.beneficiarySuivisFacadeService.create(createCommand);
      }
  });
}

delete(benefSuivi: QuarterlyMonitoringDto){
  const confirmDialog = this.dialog.open(ConfirmationBoxComponent, {
    data: {
      title: 'Confirmer la suppression !',
      message: 'Etes-vous certain de vouloir supprimer ce suivi trimistriel ?',
      object : (benefSuivi.beneficiaryName + ' (' + benefSuivi.monitoringActionLabel + ' Le ' + this.datetoString(benefSuivi.actionDate)+ ')')
    }
  });

  confirmDialog.afterClosed().subscribe(result => {
    if(result == true){
      this.beneficiarySuivisFacadeService.delete(benefSuivi.qMonitoringId);
    }
  });
}

getNumberOfSuivis(){
  this.dataSource.nbrOfSuivis$.subscribe((nb:number) => {
    this.nbOfSuivis = nb;
  })
}
datetoString(date: any){
  if (Object.prototype.toString.call(date) === '[object Date]') {
    // it is a date
    if (isNaN(date)) {
      return '';
    } else {
      var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;

      return [day, month, year].join('/');
    }
  } else {
    return '';
  }
}

textSummery(text: string, maxLength: number) {
    if(text){
      text =  extractContent(text, true)
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
}
  return text;
}

}
/* export function findVal(obj, key) {
  var seen = new Set, active = [obj];
  while (active.length) {
      var new_active = [], found = [];
      for (var i=0; i<active.length; i++) {
          Object.keys(active[i]).forEach(function(k){
              var x = active[i][k];
              if (k === key) {
                  found.push(x);
              } else if (x && typeof x === "object" &&
                         !seen.has(x)) {
                  seen.add(x);
                  new_active.push(x);
              }
          });
      }
      if (found.length) return found;
      active = new_active;
  }
  return null;
} */
export function extractContent(s, space) {
  var span= document.createElement('span');
  span.innerHTML= s;
  if(space) {
    var children= span.querySelectorAll('*');
    for(var i = 0 ; i < children.length ; i++) {
      if(children[i].textContent)
        children[i].textContent+= ' ';
      else
        children[i].innerHTML+= ' ';
    }
  }
  return [span.textContent || span.innerText].toString().replace(/ +/g,' ');
};
