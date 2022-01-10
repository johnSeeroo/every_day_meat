import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalService } from '../../services/common/modal.service';
import { LocationPopupComponent } from '../../../modules/web/delivery-location/location-popup/location-popup.component';
import { Subscription } from 'rxjs';
import { LocaldataService } from '../../services/web/localdata.service';
import { FormControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { WebApiService } from '../../services/web/web-api.service';
import { WebAPI } from '../../../shared/constants/api-end-points/webApi.Constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  deliveryLocation: any = '';
  user_id: any = ''
  clickEventsubscription: Subscription;
  clickEventsubscriptionUserId: Subscription;
  formProductSearch = new FormControl('');
  categoryList: any = [];
  // quantityForm: FormGroup;

  constructor(
    private modalService: ModalService,
    private dialog: MatDialog,
    private LocaldataService: LocaldataService,
    public WebApiService: WebApiService,
    private router: Router
  ) { 
    // this.quantityForm = this.formBuilder.group({
    //   quantity: ['1', [Validators.required]]
    // });
  }

  ngOnInit(): void {
    this.getCategories();
    if(localStorage.getItem('location_name_with_picode'))
    {
      this.deliveryLocation = localStorage.getItem('location_name_with_picode')
    }
    if(localStorage.getItem('user_id'))
    {
      this.user_id = localStorage.getItem('user_id')
    }
    this.clickEventsubscription = this.LocaldataService.getUpdatedLocation().subscribe(() => {
      this.getLocation();
    })
    this.clickEventsubscriptionUserId = this.LocaldataService.getUpdatedUserInfo().subscribe(() => {
      this.getUserId();
    })
  }

  getLocation(){
    this.deliveryLocation = localStorage.getItem('location_name_with_picode');
  }

  getUserId(){
    this.user_id = localStorage.getItem('user_id');
  }

  locationPopUp(){
    this.openAddLocationDialog();

  }

  openAddLocationDialog(): void {
    debugger
    const dialogConfig = this.modalService.setDialogConfig(true, true, '40%', '50%',);
    this.dialog.open(LocationPopupComponent, dialogConfig)
  
  }

  getCategories() {
    debugger

    this.WebApiService.getCategoryList().subscribe((data: any) => {
      if (data.status == true && data) {
        this.categoryList = data.categories;

      }
      else {
        
      }
    }, (err: HttpErrorResponse) => {
      if (err.status == 403) {
        localStorage.clear()
        this.router.navigate([''])
      }
    }
    );
  }

  logout(){
    localStorage.setItem('user_id','');
    window.location.reload();
  }

  productSearch(){
    debugger

    if (this.formProductSearch.value) {
      this.router.navigate(['web/product/searchProduct/',  `${this.formProductSearch.value}` ]);
      this.formProductSearch.reset();
    }else{
      this.modalService.showNotification("Enter some keyword and search");
    }
   
  }

  getItemByCategory(item){
    this.router.navigate(['web/product/list/',  `${item.categ_id}`, `${item.en_lang}` ]);
  }


}
