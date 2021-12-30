import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Validatespace } from "src/app/shared/models/spacevalidation";
import { phoneNumberValidator } from "src/app/shared/models/phone-validator";
import { WebApiService } from 'src/app/shared/services/web/web-api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { WebAPI } from '../../../../shared/constants/api-end-points/webApi.Constants'
import { ModalService } from 'src/app/shared/services/common/modal.service';
import { LocaldataService } from 'src/app/shared/services/web/localdata.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  emailLogin: boolean = false;
  phoneLogin: boolean = true;
  issubmitted: boolean = false;
  enableOTPField: boolean = false;
  isGetOTPClicked: boolean = false;
  isSubmitOTPClicked: boolean = false;
  validOTP: any;
  mobileNumber: any;
  public_id: any;
  publicUser: boolean = false;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public WebApiService: WebApiService,
    private modalService: ModalService,
    private LocaldataService: LocaldataService,
    private route: ActivatedRoute,
  ) {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: [''],
      phoneNumber: [''],
      otp: [''],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params)
      if (params.public_id) {
        this.publicUser = true;
        this.public_id = params.public_id;
      }
    });
  }


  login() {
    debugger
    this.issubmitted = true;
    this.loginForm.get('email').setValidators(Validators.compose([Validators.required, Validators.email, Validators.maxLength(80), Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]));
    this.loginForm.get('password').setValidators([Validators.required]);
    this.loginForm.get('otp').setValidators(null);
    this.loginForm.get('phoneNumber').setValidators(null);
    this.loginForm.get('email').updateValueAndValidity();
    this.loginForm.get('password').updateValueAndValidity();
    this.loginForm.get('otp').updateValueAndValidity();
    this.loginForm.get('phoneNumber').updateValueAndValidity();


    if (this.loginForm.status != "VALID") {
      return;
    }
    else {
      var url = WebAPI.userEmailLogin();
      const modal = new FormData();
      modal.append('password', this.loginForm.value.password);
      modal.append('email', this.loginForm.value.email);
      this.WebApiService.getApiData(url, modal).subscribe((data: any) => {
        if (data.body !== undefined) {
          if (data.body.status == true && data.body) {
            console.log("user is " + data.body.user_id)
            localStorage.setItem('user_id', data.body.user_id);
            this.LocaldataService.updateUserInfo();
            this.modalService.showNotification(data.body.message);
            this.router.navigate(['']);

          }
          else {
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

  loginTypeChange() {
    debugger
    this.phoneLogin = !this.phoneLogin;
    this.emailLogin = !this.emailLogin;

  }

  getOTP() {
    debugger
    this.isGetOTPClicked = true;
    this.loginForm.get('phoneNumber').setValidators([
      Validators.required,
      Validatespace,
      phoneNumberValidator,
      Validators.minLength(8),
      Validators.maxLength(12)
    ]);
    this.loginForm.get('otp').setValidators(null);
    this.loginForm.get('email').setValidators(null);
    this.loginForm.get('password').setValidators(null);
    this.loginForm.get('otp').updateValueAndValidity();
    this.loginForm.get('email').updateValueAndValidity();
    this.loginForm.get('password').updateValueAndValidity();
    this.loginForm.get('phoneNumber').updateValueAndValidity();
    if (this.loginForm.status != "VALID") {
      return;
    }
    else {
      debugger
      var url = WebAPI.getMobileUserOTP();
      var modal = new FormData();
      modal.append('mobile', this.loginForm.value.phoneNumber);
      this.WebApiService.getApiData(url, modal).subscribe((data: any) => {
        if (data.body !== undefined) {
          console.log(data.body.otp)
          if (data.body.status == true && data.body) {
            this.validOTP = data.body.valid_otp;
            this.mobileNumber = data.body.mobile;
            this.enableOTPField = true;
            this.phoneLogin = false;

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

  submitOTP() {
    this.isSubmitOTPClicked = true;
    this.loginForm.get('otp').setValidators(Validators.required);
    this.loginForm.get('phoneNumber').setValidators(null);
    this.loginForm.get('email').setValidators(null);
    this.loginForm.get('password').setValidators(null);
    this.loginForm.get('otp').updateValueAndValidity();
    this.loginForm.get('phoneNumber').updateValueAndValidity();
    this.loginForm.get('email').updateValueAndValidity();
    this.loginForm.get('password').updateValueAndValidity();
    if (this.loginForm.status != "VALID") {
      return;
    }
    else {
      var modal = new FormData();
      if (this.publicUser) {
        var url = WebAPI.publicLoginOTPVerify();
        modal.append('public_id', this.public_id);
      } else {
        var url = WebAPI.userLoginOTPVerify();
      }
      modal.append('otp', this.loginForm.value.otp);
      modal.append('mobile', this.mobileNumber);
      modal.append('valid_otp', this.validOTP);
      this.WebApiService.getApiData(url, modal).subscribe((data: any) => {
        if (data.body !== undefined) {
          console.log(data.body)
          if (data.body.status == true && data.body) {
            localStorage.setItem('user_id', data.body.user_id);
            this.LocaldataService.updateUserInfo();
            this.modalService.showNotification(data.body.message);
            this.router.navigate(['']);
          }
          else {
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
