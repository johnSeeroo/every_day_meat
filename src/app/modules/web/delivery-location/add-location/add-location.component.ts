import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { phoneNumberValidator } from 'src/app/shared/models/phone-validator';
import { Validatespace } from 'src/app/shared/models/spacevalidation';
import { PopupService } from 'src/app/shared/services/common/popup.service';
import { WebApiService } from 'src/app/shared/services/web/web-api.service';
import { WebAPI } from '../../../../shared/constants/api-end-points/webApi.Constants';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.css']
})
export class AddLocationComponent implements OnInit {

  addLocationForm: FormGroup;
  issubmitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router, 
    public WebApiService: WebApiService,
    private popup: PopupService,
  ) { 
    this.addLocationForm = this.formBuilder.group({
      pincode: ['', [Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6)]],
      phone: ['', [
        Validators.required,
        Validatespace,
        phoneNumberValidator,
        Validators.minLength(10),
        Validators.maxLength(10),
      ]],
      areaName: ['', Validators.required],
      areaDescription: ['', Validators.required],
    });
   }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.addLocationForm);
    this.issubmitted = true;
    if(this.addLocationForm.status != 'VALID'){
      return;
    }
    else{
      let url = WebAPI.addDeliveryLocation();
      const model = new FormData();
      model.append('pincode', this.addLocationForm.value.pincode);
      model.append('area_name', this.addLocationForm.value.areaName);
      model.append('description', this.addLocationForm.value.areaDescription);
      model.append('phone', this.addLocationForm.value.phone);
      this.WebApiService.getApiData(url, model).subscribe((data: any) => {
        debugger
        console.log(data);
        if(data.body!==undefined){
        if (data.status == true && data) {
          debugger
          this.popup.sucessMessage = data.message + "Meanwhile choose a nearby location";
          this.popup.sucesspopup();
          this.router.navigate(['']);
  
        }else{
          this.popup.failureMessage = data.message ;
          this.popup.failurepopup();
          this.router.navigate(['']);
        }
      }
      }, (err: HttpErrorResponse) => {
        if (err.status == 403) {
          localStorage.clear()
          this.router.navigate([''])
        }
      });

    }
  }
  
}
