import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/shared/services/common/modal.service';
import { WebApiService } from 'src/app/shared/services/web/web-api.service';
import { WebAPI } from '../../../../shared/constants/api-end-points/webApi.Constants';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {
  updatePasswordForm: FormGroup;
  issubmitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router, 
    public WebApiService: WebApiService,
    private modalService: ModalService,
  ) { 
    this.updatePasswordForm = this.formBuilder.group({
      password: ['', Validators.required],
    });
   }

  ngOnInit(): void {
  }

  onSubmit(){
    this.issubmitted = true;
    if(this.updatePasswordForm.status != 'VALID'){
      return;
    }else{
      let url = WebAPI.updatePassword();
    var modal = new FormData();
    modal.append('user_id', this.updatePasswordForm.value.password);
  modal.append('user_id', localStorage.getItem('user_id'));
   this.WebApiService.getApiData(url, modal).subscribe((data: any) => {
     if(data.body!==undefined){
      if (data.body.status == true && data.body) {
        console.log(data.body);
        this.modalService.showNotification(data.body.message);
        this.router.navigate(['']);

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
