import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ModalService } from 'src/app/shared/services/common/modal.service';
import { WebApiService } from 'src/app/shared/services/web/web-api.service';
import { WebAPI } from '../../../../shared/constants/api-end-points/webApi.Constants';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit {
  productQuantity = new FormControl('');
  product_id: any;
  quantityForm: FormGroup;
  isUser: boolean = false;
  relatedProductOptions: OwlOptions = {
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
  productDetails: any;
  relatedProducts: any = [{
    "en_lang": "Basa Fillet (1Kg)",
    "ml_lang": "",
    "product_id": 92,
    "image_url": "http://45.79.56.23:8888/web/image/product.product/92/image",
    "price": 399.0,
    "unit": "Unit(s)",
    "categ_name": "Seafood",
    "qty_available": 5,
    "virtual_available": 5.0,
    "out_of_stock": false,
    "limit_number": 100,
    "mrp_price": 0,
    "multi_uom": [],
    "description": "",
    "product_url": "http://45.79.56.23:8888/shop/product/92",
    "rating": "0",
    "short_description": "",
    "pieces": "3",
    "gross_weight": "1Kg",
    "cut_size_details": "Filet"
  },
  {

    "en_lang": "Basa Fillet (1Kg)",
    "ml_lang": "",
    "product_id": 92,
    "image_url": "http://45.79.56.23:8888/web/image/product.product/92/image",
    "price": 399.0,
    "unit": "Unit(s)",
    "categ_name": "Seafood",
    "qty_available": 5,
    "virtual_available": 5.0,
    "out_of_stock": false,
    "limit_number": 100,
    "mrp_price": 0,
    "multi_uom": [],
    "description": "",
    "product_url": "http://45.79.56.23:8888/shop/product/92",
    "rating": "0",
    "short_description": "",
    "pieces": "3",
    "gross_weight": "1Kg",
    "cut_size_details": "Filet"

  },
  {

    "en_lang": "Basa Fillet (1Kg)",
    "ml_lang": "",
    "product_id": 92,
    "image_url": "http://45.79.56.23:8888/web/image/product.product/92/image",
    "price": 399.0,
    "unit": "Unit(s)",
    "categ_name": "Seafood",
    "qty_available": 5,
    "virtual_available": 5.0,
    "out_of_stock": false,
    "limit_number": 100,
    "mrp_price": 0,
    "multi_uom": [],
    "description": "",
    "product_url": "http://45.79.56.23:8888/shop/product/92",
    "rating": "0",
    "short_description": "",
    "pieces": "3",
    "gross_weight": "1Kg",
    "cut_size_details": "Filet"

  },
  {

    "en_lang": "Basa Fillet (1Kg)",
    "ml_lang": "",
    "product_id": 92,
    "image_url": "http://45.79.56.23:8888/web/image/product.product/92/image",
    "price": 399.0,
    "unit": "Unit(s)",
    "categ_name": "Seafood",
    "qty_available": 5,
    "virtual_available": 5.0,
    "out_of_stock": false,
    "limit_number": 100,
    "mrp_price": 0,
    "multi_uom": [],
    "description": "",
    "product_url": "http://45.79.56.23:8888/shop/product/92",
    "rating": "0",
    "short_description": "",
    "pieces": "3",
    "gross_weight": "1Kg",
    "cut_size_details": "Filet"

  },
  {

    "en_lang": "Basa Fillet (1Kg)",
    "ml_lang": "",
    "product_id": 92,
    "image_url": "http://45.79.56.23:8888/web/image/product.product/92/image",
    "price": 399.0,
    "unit": "Unit(s)",
    "categ_name": "Seafood",
    "qty_available": 5,
    "virtual_available": 5.0,
    "out_of_stock": false,
    "limit_number": 100,
    "mrp_price": 0,
    "multi_uom": [],
    "description": "",
    "product_url": "http://45.79.56.23:8888/shop/product/92",
    "rating": "0",
    "short_description": "",
    "pieces": "3",
    "gross_weight": "1Kg",
    "cut_size_details": "Filet"

  }]

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public WebApiService: WebApiService,
    private formBuilder: FormBuilder,
    private modalService: ModalService,
  ) {
    this.quantityForm = this.formBuilder.group({
      quantity: ['1', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params)
      if (params.product_id) {

        this.product_id = params.product_id;
        if (localStorage.getItem('user_id')) {
          this.isUser = true;
        }
        let url = WebAPI.getProductDetailsById();
        var modal = new FormData();
        modal.append('product_id', this.product_id);
        modal.append('warehouse_id', localStorage.getItem('warehouse_id'));
        this.WebApiService.getApiData(url, modal).subscribe((data: any) => {
          if (data.body !== undefined) {
            if (data.body.status == true && data.body) {
              console.log(data.body.product);
              console.log(data.body.product.en_lang)
              this.productDetails = data.body.product;


            }
          }

        }, (err: HttpErrorResponse) => {
          if (err.status == 403) {
            localStorage.clear()
            this.router.navigate([''])
          }
        });
      }
    });
  }

  addProductToCart() {
    if (this.quantityForm.status != "VALID" || this.quantityForm.value.quantity <= 0) {
      this.modalService.showNotification("Enter valid quantity");
    } else {
      if (!(this.quantityForm.value.quantity <= parseInt(this.productDetails.qty_available))) {
        this.modalService.showNotification("Out of Stock, Only " + this.productDetails.qty_available + " quantity of product is available");
      } else {

        var modal = new FormData();
        if (this.isUser) {
          var url = WebAPI.userAddProductToCart();
          modal.append('user_id', localStorage.getItem('user_id'));
          if (this.productDetails.multi_uom) {
            modal.append('multi_uom_id', this.productDetails.multi_uom);
          }
        } else {
          var url = WebAPI.publicAddProductToCart();
          if (localStorage.getItem('public_id')) {
            modal.append('public_id', localStorage.getItem('public_id'));
          }
        }
        modal.append('product_id', this.productDetails.product_id);
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
              }

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

  notifyOnAvailability() {
    if (!this.isUser) {
      this.modalService.showNotification("Please login to get notification");

    }else{
    var modal = new FormData();
    var url = WebAPI.notifyOnAvailability();
    modal.append('product_id', this.productDetails.product_id);
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


}
