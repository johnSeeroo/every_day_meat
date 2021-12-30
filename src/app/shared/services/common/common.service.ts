import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  editData: any;
  tabIndex: number = 0;
  tabSubIndex: number = 0;
  @Output() ItemChange: EventEmitter<any> = new EventEmitter();

  constructor() {}

  private headerUpdate = new Subject<any>();

  setEditData(data) {
    this.editData = data;
  }

  getEditData() {
    return this.editData;
  }

  setIndex(index: number = 0, subIndex: number = 0) {
    this.tabIndex = index;
    this.tabSubIndex = subIndex;
  }
  getIndex() {
    return { index: this.tabIndex, subIndex: this.tabSubIndex };
  }

  updateHeader(): any {
    this.headerUpdate.next();
  }
  getUpdatedHeader(): Observable<any> {
    return this.headerUpdate.asObservable();
  }
}
