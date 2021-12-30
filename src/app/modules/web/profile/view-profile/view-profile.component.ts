import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WebApiService } from 'src/app/shared/services/web/web-api.service';
import { phoneNumberValidator } from 'src/app/shared/models/phone-validator';
import { Validatespace } from 'src/app/shared/models/spacevalidation';
import { HttpErrorResponse } from '@angular/common/http';
import { WebAPI } from '../../../../shared/constants/api-end-points/webApi.Constants';
import { ModalService } from 'src/app/shared/services/common/modal.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
  profileForm: FormGroup;
  issubmitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router, 
    public WebApiService: WebApiService,
    private modalService: ModalService,
  ) { 
    this.profileForm = this.formBuilder.group({
      userName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', [
        Validators.required,
        Validatespace,
        phoneNumberValidator,
        Validators.minLength(10),
        Validators.maxLength(10),
      ]],
    });
  }

  ngOnInit(): void {
    this.getUserData();
      
  }

  getUserData(){
    let url = WebAPI.viewUserProfile();
    var modal = new FormData();
  modal.append('user_id', localStorage.getItem('user_id'));
   this.WebApiService.getApiData(url, modal).subscribe((data: any) => {
     if(data.body!==undefined){
      if (data.body.status == true && data.body) {
        console.log(data.body);
       this.profileForm.get('userName').setValue(data.body.name);
       this.profileForm.get('email').setValue(data.body.email);
       this.profileForm.get('phone').setValue(data.body.mobile);

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
    if(this.profileForm.status != 'VALID'){
      return
    }
    else{
      this.issubmitted = true;
    let url = WebAPI.editUserProfile();
      var modal = new FormData();
    modal.append('name', this.profileForm.value.userName);
    modal.append('email', this.profileForm.value.email);
    modal.append('user_id', localStorage.getItem('user_id'));
     this.WebApiService.getApiData(url, modal).subscribe((data: any) => {
       if(data.body!==undefined){
        if (data.body.status == true && data.body) {
          console.log(data.body);
          this.modalService.showNotification(data.body.message);
          this.getUserData();

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
