import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PositionFacadeService {
  private position = new Subject<string>();
  private benefId = new Subject<number>();

  position$ = this.position.asObservable();
  benefId$ = this.benefId.asObservable();

  constructor() { }

  getPosition(pos: string){
    setTimeout(() => {
      this.position.next(pos);
    }, 0);
  }

  getBeneficiaryId(id:number){
    setTimeout(() => {
      this.benefId.next(id);
    }, 0);
  }
}
