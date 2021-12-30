import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/shared/services/common/modal.service';
import { LocaldataService } from 'src/app/shared/services/web/localdata.service';
import { WebApiService } from 'src/app/shared/services/web/web-api.service';
import { WebAPI } from '../../../../shared/constants/api-end-points/webApi.Constants'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  registerForm: FormGroup;
  issubmitted: boolean = false;
  validationOTPData: any;
  isUserOTPVerify: boolean = false;
  isUserOTPVerifyPressed: boolean =false;

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router, 
    public WebApiService: WebApiService,
    private modalService: ModalService,
    private LocaldataService: LocaldataService,
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email:  ['', Validators.compose([Validators.required, Validators.email, Validators.maxLength(80), Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])],
      mobile: ['', [
        Validators.required,
        // Validatespace,
        // phoneNumberValidator,
        // Validators.minLength(10),
        // Validators.maxLength(10),
      ]],
      password: ['', [ Validators.required]],
      otp: [''],
    });
   }

  ngOnInit(): void {
  }

  onSubmit(){
    this.issubmitted = true;
    if(this.registerForm.status != "VALID"){
      return;
    }
    else{
    var url = WebAPI.userRegister();
      var modal = new FormData();
      modal.append('mobile', this.registerForm.value.mobile);
      modal.append('name', this.registerForm.value.name);
      modal.append('email', this.registerForm.value.email);
      modal.append('password', this.registerForm.value.password);
       this.WebApiService.getApiData(url, modal).subscribe((data: any) => {
         if(data.body!==undefined){
          console.log(data.body)  
          if (data.body.status == true && data.body) {
            // localStorage.setItem('user_id',data.body.user_id);
            // this.LocaldataService.updateUserInfo();
            // this.modalService.showNotification(data.body.message);
            // this.router.navigate(['']);
            this.validationOTPData = data.body;
            this.isUserOTPVerify = true;
        }
        else{
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

userOTPVerify(){
  this.isUserOTPVerifyPressed = true;
  this.registerForm.get('otp').setValidators( Validators.required );
  this.registerForm.get('otp').updateValueAndValidity();
  if(this.registerForm.status != "VALID"){
    return;
  }
  else{
  var url = WebAPI.userLoginOTPVerify();
    var modal = new FormData();
    modal.append('mobile', this.registerForm.value.mobile);
    modal.append('name', this.registerForm.value.name);
    modal.append('email', this.registerForm.value.email);
    modal.append('password', this.registerForm.value.password);
    modal.append('otp', this.registerForm.value.otp);
    modal.append('valid_otp', this.registerForm.value.password);
     this.WebApiService.getApiData(url, modal).subscribe((data: any) => {
       if(data.body!==undefined){
        console.log(data.body)  
        if (data.body.status == true && data.body) {
          // localStorage.setItem('user_id',data.body.user_id);
          // this.LocaldataService.updateUserInfo();
          // this.modalService.showNotification(data.body.message);
          // this.router.navigate(['']);
          this.validationOTPData = data.body;
          console.log("verify data "+ this.validationOTPData)
      }
      else{
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

editData(){
  this.isUserOTPVerify = false;
}

}
