import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/shared/services/common/modal.service';
import { WebApiService } from 'src/app/shared/services/web/web-api.service';
import { phoneNumberValidator } from 'src/app/shared/models/phone-validator';
import { Validatespace } from 'src/app/shared/models/spacevalidation';
import { WebAPI } from '../../../../shared/constants/api-end-points/webApi.Constants';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-view-address',
  templateUrl: './view-address.component.html',
  styleUrls: ['./view-address.component.css']
})
export class ViewAddressComponent implements OnInit {
  addressForm: FormGroup;
  issubmitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router, 
    public WebApiService: WebApiService,
    private modalService: ModalService,
  ) { 
    this.addressForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      mobileNumber: ['', [
        Validators.required,
        // Validatespace,
        // phoneNumberValidator,
        // Validators.minLength(10),
        // Validators.maxLength(10),
      ]],
      phoneNumber: ['', [
        Validators.required,
        // Validatespace,
        // phoneNumberValidator,
        // Validators.minLength(10),
        // Validators.maxLength(10),
      ]],
      buildingName: ['', Validators.required],
      flatNumber: [''],
      street: ['', Validators.required],
      street2: ['', Validators.required],
      pincode: ['', Validators.required],
      city: ['', Validators.required],
      addressAudio: [''],
      zip: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getAddressData();
  }

  getAddressData(){
    let url = WebAPI.viewAddress();
    var modal = new FormData();
  modal.append('user_id', localStorage.getItem('user_id'));
   this.WebApiService.getApiData(url, modal).subscribe((data: any) => {
     if(data.body!==undefined){
      if (data.body.status == true && data.body) {
        console.log(data.body);
        this.addressForm.get('name').setValue(data.body.name);
    this.addressForm.get('email').setValue(data.body.email);
    this.addressForm.get('mobileNumber').setValue(data.body.mobile1);
    this.addressForm.get('phoneNumber').setValue(data.body.phone);
    this.addressForm.get('buildingName').setValue(data.body.building_name);
    this.addressForm.get('flatNumber').setValue(data.body.flat_no);
    this.addressForm.get('street').setValue(data.body.street);
    this.addressForm.get('street2').setValue(data.body.street2);
    this.addressForm.get('pincode').setValue(data.body.pin_code);
    this.addressForm.get('city').setValue(data.body.city);
    this.addressForm.get('addressAudio').setValue(data.body.address_audio);
    this.addressForm.get('zip').setValue(data.body.zip);
      


    }else{
      this.modalService.showNotification(data.body.message);
    }
  }
  
  }, (err: HttpErrorResponse) => {
    if (err.status == 403) {
      localStorage.clear()
      this.router.navigate([''])
    }
  });
  }


  onSubmit(){
    console.log(this.addressForm)
    if(this.addressForm.status != 'VALID'){
      return
    }
    else{
      this.issubmitted = true;
    let url = WebAPI.updateAddress();
      var modal = new FormData();
    modal.append('use_old_address_audio', this.addressForm.value.userName);
    modal.append('address_audio', this.addressForm.value.addressAudio);
    modal.append('flat_no', this.addressForm.value.flatNumber);
    modal.append('building_name', this.addressForm.value.buildingName);
    modal.append('street', this.addressForm.value.street);
    modal.append('street2', this.addressForm.value.street2);
    modal.append('city', this.addressForm.value.city);
    modal.append('name', this.addressForm.value.name);
    modal.append('mobile1', this.addressForm.value.mobileNumber);
    modal.append('email', this.addressForm.value.email);
    modal.append('zip', this.addressForm.value.zip);
    modal.append('user_id', localStorage.getItem('user_id'));
     this.WebApiService.getApiData(url, modal).subscribe((data: any) => {
       if(data.body!==undefined){
        if (data.body.status == true && data.body) {
          console.log(data.body);
          this.modalService.showNotification(data.body.message);
          this.getAddressData();
          

      }else{
        this.modalService.showNotification(data.body.message);
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
