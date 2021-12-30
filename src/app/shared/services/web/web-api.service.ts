import { Injectable } from '@angular/core';
import { CommunicationService } from 'src/app/core/services/communication.service';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/api-response.model';
import { WebAPI } from '../../constants/api-end-points/webApi.Constants';

@Injectable({
  providedIn: 'root'
})
export class WebApiService {

  constructor(private communicationService: CommunicationService) { }


  getCategoryList(): Observable<ApiResponse<any>> {
    return this.communicationService.post<ApiResponse<any>>(
      WebAPI.getCategoryList(),
      {},'Loading...',{headers :{
      'Content-Type': 'multipart/form-data;',
      'X-Auth-Client': 'v8mcgiqt9uqsbmnalr45w8tn1go4p8j',
      'X-Auth-Token': 'u5f0538yexus8xivffafhmq63jk8ccu' }}
    );
  }

  checkAvailability(): Observable<ApiResponse<any>> {
    return this.communicationService.post<ApiResponse<any>>(
      WebAPI.checkAvailability(),
      {},'Loading...',{headers :{
        'Content-Type': 'none;',
      'X-Auth-Client': 'v8mcgiqt9uqsbmnalr45w8tn1go4p8j',
      'X-Auth-Token': 'u5f0538yexus8xivffafhmq63jk8ccu' }}
    );
  }

  aboutUs(): Observable<ApiResponse<any>> {
    return this.communicationService.post<ApiResponse<any>>(
      WebAPI.aboutUs(),
      {},'Loading...',{headers :{
        'Content-Type': 'none;',
      'X-Auth-Client': 'v8mcgiqt9uqsbmnalr45w8tn1go4p8j',
      'X-Auth-Token': 'u5f0538yexus8xivffafhmq63jk8ccu' }}
    );
  }

  contactDetails(): Observable<ApiResponse<any>> {
    return this.communicationService.post<ApiResponse<any>>(
      WebAPI.contactDetails(),
      {},'Loading...',{headers :{
        'Content-Type': 'none;',
      'X-Auth-Client': 'v8mcgiqt9uqsbmnalr45w8tn1go4p8j',
      'X-Auth-Token': 'u5f0538yexus8xivffafhmq63jk8ccu' }}
    );
  }

  getApiData(url, modal) {
    return this.communicationService.postData(
     url,modal,'Loading...'
    );
  }

}
