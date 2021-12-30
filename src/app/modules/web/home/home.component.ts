import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OwlOptions } from "ngx-owl-carousel-o";
import { Subscription } from 'rxjs';
import { ModalService } from 'src/app/shared/services/common/modal.service';
import { LocaldataService } from 'src/app/shared/services/web/localdata.service';
import { WebApiService } from 'src/app/shared/services/web/web-api.service';
import { LocationPopupComponent } from '../delivery-location/location-popup/location-popup.component';
import { WebAPI } from '../../../shared/constants/api-end-points/webApi.Constants'
import { PopupService } from 'src/app/shared/services/common/popup.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  clickEventsubscription: Subscription;
  homePageData: any = [];
  homePageBanners: any = [];
  popular: any = [];
  topRated: any = [];
  categoryList: any = [];

  constructor( 
    public WebApiService: WebApiService,
    private router: Router,
    private modalService: ModalService,
    private dialog: MatDialog,
    private LocaldataService: LocaldataService,
    private popup: PopupService,
    ) { }

  customOptions: OwlOptions = {
    autoplay: true,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 2000,
    // navText: [
    //   '<i class="fa-chevron-left"></i>',
    //   '<i class="fa-chevron-right></i>"',
    // ],
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  };
  popularOptions: OwlOptions = {
    autoplay: true,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 2000,
    // navText: [
    //   '<i class="fa-chevron-left"></i>',
    //   '<i class="fa-chevron-right></i>"',
    // ],
    responsive: {
      0: {
        items: 4,
      },
      600: {
        items: 4,
      },
      1000: {
        items: 4,
      },
    },
  };
  topRatedOptions: OwlOptions = {
    autoplay: true,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 2000,
    // navText: [
    //   '<i class="fa-chevron-left"></i>',
    //   '<i class="fa-chevron-right></i>"',
    // ],
    responsive: {
      0: {
        items: 4,
      },
      600: {
        items: 4,
      },
      1000: {
        items: 4,
      },
    },
  };
  bannerOptions: OwlOptions = {
    autoplay: true,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 2000,
    // navText: [
    //   '<i class="fa-chevron-left"></i>',
    //   '<i class="fa-chevron-right></i>"',
    // ],
    responsive: {
      0: {
        items: 4,
      },
      600: {
        items: 4,
      },
      1000: {
        items: 4,
      },
    },
  };

  categoryOptions: OwlOptions = {
    autoplay: true,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 2000,
    // navText: [
    //   '<i class="fa-chevron-left"></i>',
    //   '<i class="fa-chevron-right></i>"',
    // ],
    responsive: {
      0: {
        items: 4,
      },
      600: {
        items: 4,
      },
      1000: {
        items: 4,
      },
    },
  };

  
  ngOnInit(): void {
    this.getCategories();
    this.setHomepage();
    debugger
    if(!(localStorage.getItem('area_id'))){
      debugger
      this.openAddLocationDialog();
    }
    this.clickEventsubscription = this.LocaldataService.getUpdatedLocation().subscribe(() => {
      this.setHomepage();
    })

  }

  getCategories() {
    debugger

    this.WebApiService.getCategoryList().subscribe((data: any) => {
      debugger
      console.log(data);
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

  openAddLocationDialog(): void {
    debugger
    const dialogConfig = this.modalService.setDialogConfig(true, true, '40%', '50%',);
    this.dialog.open(LocationPopupComponent, dialogConfig)
  
  }

  setHomepage(){
    let url = WebAPI.setHomePage();
    const modal = new FormData();
    modal.append('area_id',localStorage.getItem('area_id'));
    if(localStorage.getItem('user_id') ){
      modal.append('user_id',localStorage.getItem('user_id'));
   
    }else if(localStorage.getItem('public_id') ){
      modal.append('public_id',localStorage.getItem('public_id'));

    }
    modal.append('warehouse_id',localStorage.getItem('warehouse_id'))
    this.WebApiService.getApiData(url,modal).subscribe((data: any) => {
      debugger
      console.log(data);
      if(data.body!==undefined){
      if (data.body.status == true && data.body) {
        this.homePageData = data.body.result;
        this.homePageBanners = this.homePageData[0].items;
        console.log("home page banners")
        console.log(this.homePageBanners)
        this.popular = this.homePageData[1].items;
        console.log("home page popular")
        console.log(this.popular)
        this.topRated = this.homePageData[3].items;
        console.log("home page top rated")
        console.log(this.topRated)


      }
      else {
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
    }
    );
  }

  categoryDetailPage(item){
    this.router.navigate(['web/product/list/',  `${item.categ_id}` ]);
  }

  productViewPage(item) {
    this.router.navigate(['web/product/detail/', `${item.product_id}`]);

  }


}
