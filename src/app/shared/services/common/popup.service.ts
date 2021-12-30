import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";
import { Observable, Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { startWith, tap, delay } from 'rxjs/operators';

declare var $: any;
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class PopupService {
  visibility: BehaviorSubject<boolean>;
  private subject = new Subject<any>();
  private keepAfterNavigationChange = false;
  sucessMessage: any;
  failureMessage: any;
  infoMessage: any;
  constructor(private router: Router) {
    this.visibility = new BehaviorSubject(false);
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterNavigationChange) {
           this.keepAfterNavigationChange = false;
        } else {
           this.subject.next();
        }
      }
    });
  }
  sucesspopup() {

    Swal.fire({
      icon: 'success',
      title: this.sucessMessage,
      width: '42em',
      padding: '2.55em',
      customClass: {
        popup: 'animated tada',

      }

    })
  }
  failurepopup() {
    Swal.fire({
      icon: 'error',
      title: this.failureMessage,
      width: '42em',
      padding: '2.55em',
      customClass: {
        popup: 'animated shake'
      }
    })
  }

  infopopup() {
    Swal.fire({
      icon: 'info',
      title: this.infoMessage,
      width: '42em',
      padding: '2.55em',
      customClass: {
        popup: 'animated swing'
      }

    })
  }
  success(message: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'success', text: message });
  }

  error(message: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'error', text: message });
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }


  show() {
    this.visibility.next(true);
    console.log(this.visibility)
  }

  hide() {
    this.visibility.next(false);
  }
}

