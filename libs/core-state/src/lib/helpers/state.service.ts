import { Injectable } from "@angular/core";
import { MatTableState } from "../helpers/mattable.state";

@Injectable({ providedIn: 'root' })
export class StateService {
    public historyState = new MatTableState('date', 'asc', 10);
    public candidacyState = new MatTableState('name', 'asc', 5);
}
