import { Injectable } from '@angular/core';
import { CommunicationService } from 'src/app/core/services/communication.service';
import { Observable, of, throwError } from 'rxjs';
import { LoginAPI } from 'src/app/shared/constants/api-end-points/login.Constant';
import { ApiResponse } from 'src/app/shared/models/api-response.model';
import { catchError, switchMap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonService } from 'src/app/shared/services/common/common.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _authenticated: boolean = false;

  set accessToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  get accessToken(): string {
    return localStorage.getItem('accessToken') ?? '';
  }

  set userId(id: string) {
    localStorage.setItem('userId', id);
  }

  get userId(): string {
    return localStorage.getItem('userId') ?? '';
  }

  set userName(name: string) {
    localStorage.setItem('userName', name);
  }

  get userName(): string {
    return localStorage.getItem('userName') ?? '';
  }

  set tenantId(tenantId: string) {
    localStorage.setItem('tenantId', tenantId);
  }

  get tenantId(): string {
    return localStorage.getItem('tenantId') ?? '';
  }

  constructor(
    private _httpClient: HttpClient,
    private communicationService: CommunicationService,
    private commonListService: CommonService
  ) {}

  signIn(credentials: {
    userName: string;
    password: string;
    tenantName: string;
  }): Observable<any> {
    // Throw error, if the user is already logged in
    if (this._authenticated) {
      return throwError('User is already logged in.');
    }
    return this._httpClient
      .post<any>(LoginAPI.login(), credentials, { observe: 'response' })
      .pipe(
        switchMap((response: any) => {
          if (response.body.statusCode != 200) {
            return throwError(response.message);
          }
          // Store the access token in the local storage
          this.accessToken = response.headers.get('authorization');

          if (!!!this.accessToken) {
            return;
          }

          this.userId = response.body.data.userId;
          this.userName = response.body.data.userName;
          this.tenantId = response.body.data.tenantId;

          // Set the authenticated flag to true
          this._authenticated = true;

          this.updateHeader();

          // Return a new observable with the response
          return of(response);
        })
      );
  }

  signOut(): Observable<any> {
    // Remove the access token from the local storage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');

    // Set the authenticated flag to false
    this._authenticated = false;

    this.updateHeader();

    // Return the observable
    return of(true);
  }

  check(): Observable<boolean> {
    // Check if the user is logged in
    if (this._authenticated) {
      return of(true);
    }

    // Check the access token availability
    if (!this.accessToken) {
      return of(false);
    } else {
      return of(true);
    }
  }

  updateHeader(): void {
    return this.commonListService.updateHeader();
  }
}
