import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { WebApiService } from 'src/app/shared/services/web/web-api.service';


@Component({
  selector: 'app-cms-page',
  templateUrl: './cms-page.component.html',
  styleUrls: ['./cms-page.component.css']
})
export class CmsPageComponent implements OnInit {
  slugTitle: any;
  slugData: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public WebApiService: WebApiService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.route.params.subscribe(params => {
      console.log(params)
      if (params.cms_slug) {
        
        if(params.cms_slug == "about_us"){
          console.log("About Us")
          this.getAboutUsData();
        }
        else if(params.cms_slug == "contact_us"){
          console.log("Contact Us")
          this.getContactData();
        }
        else{
          this.router.navigate([''])
        }
        
      }
    });
  }

  getAboutUsData(){
    this.slugTitle = "About Us"
    this.WebApiService.aboutUs().subscribe((data: any) => {  
      if (data.status == true && data) {
        this.slugData = data.about_us;
        this.spinner.hide();
      }
    
  }, (err: HttpErrorResponse) => {
    if (err.status == 403) {
      this.spinner.hide();
      this.router.navigate([''])
      
    }
  });
  }

  getContactData(){
    this.slugTitle = "Contact Details"
    this.WebApiService.contactDetails().subscribe((data: any) => {   
      if (data.status == true && data) {
        console.log(data);
        this.slugData = data;
        this.spinner.hide();
      }
    
  }, (err: HttpErrorResponse) => {
    if (err.status == 403) {
      this.spinner.hide();
      this.router.navigate([''])
    }
  });
  }

}
