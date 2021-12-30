import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebApiService } from 'src/app/shared/services/web/web-api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent implements OnInit {
  categoryList: any= [];

  constructor(
    public WebApiService: WebApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
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

  viewProductList(item){
    this.router.navigate(['web/product/list/',  `${item.categ_id}` ]);
  }
  }


