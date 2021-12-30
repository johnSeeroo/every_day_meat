import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiLoaderService {

  private loaderVisibility = new Subject<boolean>();
  loaderVisibility$ = this.loaderVisibility.asObservable();
  loaderText: string;

  constructor() { }

  start(text: string = 'loading...'): void {
    this.loaderText = text;
    this.loaderVisibility.next(true);
  }

  stop(): void {
    this.loaderVisibility.next(false);
  }
}
