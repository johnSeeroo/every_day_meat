import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LocaldataService {

  constructor() { }

  currencyObj: any;
  homeInfoObj: any;

  private locationUpdate = new Subject<any>();
  private userInfoUpdate = new Subject<any>();
  updateIsPaymentScreen_ = new Subject<any>();
  triggerAssessmentFunction_ = new Subject<any>();
  triggerEligibilityPopUpClose = new Subject<any>();

  
  @Output() AfterHomeDataLoad: EventEmitter<any> = new EventEmitter();
  @Output() CourseSearch: EventEmitter<any> = new EventEmitter();

  
  afterHomeDataLoad(homeInfoObj) {
    this.setHomeInfo(homeInfoObj); 
    this.AfterHomeDataLoad.emit(homeInfoObj);
  }
  courseSearch(searchValue) {
    this.CourseSearch.emit(searchValue);
  }


  setHomeInfo(homeInfoObj) {
    this.homeInfoObj = homeInfoObj;
  }
  getHomeInfo() {
    return this.homeInfoObj;
  }

  updateLocation() {
    this.locationUpdate.next();
  }
  getUpdatedLocation(): Observable<any> {
    return this.locationUpdate.asObservable();
  }

  updateUserInfo() {
    this.userInfoUpdate.next();
  }
  getUpdatedUserInfo(): Observable<any> {
    return this.userInfoUpdate.asObservable();
  }


}
