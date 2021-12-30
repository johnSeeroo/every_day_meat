import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WebAPI } from '../../../../shared/constants/api-end-points/webApi.Constants';
import { WebApiService } from 'src/app/shared/services/web/web-api.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'src/app/shared/services/common/modal.service';

@Component({
  selector: 'app-listing-product',
  templateUrl: './listing-product.component.html',
  styleUrls: ['./listing-product.component.css']
})
export class ListingProductComponent implements OnInit {
  category_id: any;
  sort_value: any = '0';
  page_limit: any = '10';
  productList: any = [];
  quantityForm: FormGroup;
  isUser: boolean = false;
  totalPages: any = 1;
  numberpages: any = [];
  selectedPage: any = 0;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public WebApiService: WebApiService,
    private formBuilder: FormBuilder,
    private modalService: ModalService,
  ) {
    this.quantityForm = this.formBuilder.group({
      quantity: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params.category_id) {
        this.category_id = params.category_id;
        if (localStorage.getItem('user_id')) {
          this.isUser = true;
        }
        this.getProductData();
        
      }
    });
  }

  getProductData(){
    let url = WebAPI.getProductsByCategory();
        var modal = new FormData();
        modal.append('categ_id', this.category_id);
        modal.append('sort_value', this.sort_value);
        modal.append('limit', this.page_limit);
        modal.append('page_number', this.selectedPage);
        modal.append('warehouse_id', localStorage.getItem('warehouse_id'));
        this.WebApiService.getApiData(url, modal).subscribe((data: any) => {
          if (data.body !== undefined) {
            console.log(data.body)
            if (data.body.status == true && data.body) {
              debugger
              this.productList = data.body.product_list;
              if(data.body.pages != 'undefined' || data.body.pages != '0'){
                this.totalPages = parseInt(data.body.pages);
              }

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

  productViewPage(item) {
    this.router.navigate(['web/product/detail/', `${item.product_id}`]);

  }

  addProductToCart(item, quantity) {
    if (this.quantityForm.status != "VALID" || quantity <= 0) {
      this.modalService.showNotification("Enter valid quantity");
    } else {
      if (!(quantity <= parseInt(item.qty_available))) {
        this.modalService.showNotification("Out of Stock, Only " + item.qty_available + " quantity of product is available");
      } else {

        var modal = new FormData();
        if (this.isUser) {
          var url = WebAPI.userAddProductToCart();
          modal.append('user_id', localStorage.getItem('user_id'));
          if (item.multi_uom) {
            modal.append('multi_uom_id', item.multi_uom);
          }
        } else {
          var url = WebAPI.publicAddProductToCart();
          if (localStorage.getItem('public_id')) {
            modal.append('public_id', localStorage.getItem('public_id'));
          }
        }
        modal.append('product_id', item.product_id);
        modal.append('qty', this.quantityForm.value.quantity);
        modal.append('warehouse_id', localStorage.getItem('warehouse_id'));

        this.WebApiService.getApiData(url, modal).subscribe((data: any) => {
          if (data.body !== undefined) {
            console.log(data.body)
            if (data.body.status == true && data.body) {
              this.modalService.showNotification(data.body.message);
              localStorage.setItem('cart_id', data.body.cart_id);
              if (!(this.isUser || localStorage.getItem('public_id'))) {
                localStorage.setItem('public_id', data.body.public_id);
                this.quantityForm.reset();
              }

            }
            else {
              this.modalService.showNotification(data.body.message);
              this.quantityForm.reset();
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

  notifyOnAvailability(product) {
    if (!this.isUser) {
      this.modalService.showNotification("Please login to get notification");

    }else{
    var modal = new FormData();
    var url = WebAPI.notifyOnAvailability();
    modal.append('product_id', product.product_id);
    modal.append('warehouse_id', localStorage.getItem('warehouse_id'));
    modal.append('user_id', localStorage.getItem('user_id'));
    this.WebApiService.getApiData(url, modal).subscribe((data: any) => {
      if (data.body !== undefined) {
        console.log(data.body)
        if (data.body.status == true && data.body) {
          this.modalService.showNotification(data.body.message);

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

previousPageSelect() {
  if (this.selectedPage > 1) {
    document.getElementById("pages" + this.selectedPage).classList.remove("selected_page");
    this.selectedPage = this.selectedPage - 1;
    document.getElementById("pages" + this.selectedPage).className = "selected_page";
    this.getProductData();
  }
}

nextPageSelect() {
  if (this.selectedPage < this.totalPages) {
    document.getElementById("pages" + this.selectedPage).classList.remove("selected_page");
    this.selectedPage = this.selectedPage + 1;
    document.getElementById("pages" + this.selectedPage).className = "selected_page";
    console.log(this.selectedPage);
    this.getProductData();
  }
}

generatePageNumber() {
  this.numberpages = [];
  if (this.totalPages != 0) {
    for (let i = 1; i <= this.totalPages; i++) {
      this.numberpages.push(i);
    }
  }
  setTimeout(() => {
    if (document.getElementById("pages" + this.selectedPage)) {
      document.getElementById("pages" + this.selectedPage).className = "selected_page";
    }
  }, 5);
}

pageselect(number) {
  if(number != this.selectedPage){
  document.getElementById("pages" + this.selectedPage).classList.remove("selected_page");
  this.selectedPage = number;
  console.log(this.selectedPage);
  document.getElementById("pages" + this.selectedPage).className = "selected_page";
  this.getProductData();
}

}

}
