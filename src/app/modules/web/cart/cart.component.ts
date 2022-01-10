import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from 'src/app/shared/services/common/modal.service';
import { WebApiService } from 'src/app/shared/services/web/web-api.service';
import { WebAPI } from '../../../shared/constants/api-end-points/webApi.Constants';
import { ConfirmModalData } from '../../../shared/models/confirm-modal-data.model'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartData: any;
  cartProducts: any = [];
  quantityForm: FormGroup;
  confirmationValue: any;
  isUser: boolean = false;
  publicId: any;
  

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public WebApiService: WebApiService,
    private formBuilder: FormBuilder,
    private modalService: ModalService,
  ) { 
    this.quantityForm = this.formBuilder.group({
      quantity: ['']
    });
  }

  ngOnInit(): void {
    if(localStorage.getItem('user_id')){
      this.isUser =  true;
      }
   this.getCartDetails();
        
  }

  getCartDetails(){
    var modal = new FormData();
        modal.append('warehouse_id', localStorage.getItem('warehouse_id'));
        if(this.isUser){
          var url = WebAPI.userViewCart();
        modal.append('user_id', localStorage.getItem('user_id'));
        }else{
          var url = WebAPI.publicViewCart();
          modal.append('public_id', localStorage.getItem('public_id'));
        }
       this.WebApiService.getApiData(url, modal).subscribe((data: any) => {
         if(data.body!==undefined){
          console.log(data.body)
          if (data.body.status == true && data.body) {
            console.log(data.body.cart_data);
          this.cartData = data.body;
          this.cartProducts = data.body.cart_data;
          
          // for(let i = 0; i<this.cartProducts.length; i++)
          // {
          //   this.quantityForm.get('quantity').setValue(this.cartProducts.product_uom_qty);
          // }
  
        }
      }
      
      }, (err: HttpErrorResponse) => {
        if (err.status == 403) {
          localStorage.clear()
          this.router.navigate([''])
        }
      });
  }

  removeItem(product){
    let childQuestionNew: ConfirmModalData = { 
      question: 'Are you sure to remove this product from cart', confirmBtnText: 'Ok', cancelBtnText: 'Cancel' };
     this.modalService.confirm(childQuestionNew).subscribe(result => {
      if(result){
        var modal = new FormData();
        if(this.isUser){
          var url = WebAPI.userRemoveItemFromCart();
        modal.append('user_id', localStorage.getItem('user_id'));
        }else{
          var url = WebAPI.publicRemoveItemFromCart();
          modal.append('public_id', localStorage.getItem('public_id'));
        }
        modal.append('line_id', product.line_id);
        modal.append('cart_id', localStorage.getItem('cart_id'));
        modal.append('product_id', product.product_id);
        modal.append('warehouse_id', localStorage.getItem('warehouse_id'));
       this.WebApiService.getApiData(url, modal).subscribe((data: any) => {
         if(data.body!==undefined){
          console.log(data.body)
          if (data.body.status == true && data.body) {
            console.log(data.body.cart_data);
            this.cartProducts = data.body.cart_data;
    
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
      
        
      
    });
   
  }

  updateProduct(product,quantity,currentQuantity){
    // if ( currentQuantity <= 0) {
    //   this.modalService.showNotification("Enter valid quantity");
    // } else {
      if (!(quantity <= parseInt(product.qty_available))) {
        this.modalService.showNotification("Out of Stock, Only " + product.qty_available + " quantity of product is available");
      } else {

        var modal = new FormData();
        if (this.isUser) {
          var url = WebAPI.userUpdateProductCart();
          modal.append('user_id', localStorage.getItem('user_id'));
          if (product.multi_uom) {
            modal.append('multi_uom_id', product.multi_uom);
          }
        } else {
          var url = WebAPI.publicUpdateProductCart();
            modal.append('public_id', localStorage.getItem('public_id'));
        }
        modal.append('product_id', product.product_id);
        modal.append('qty', quantity);
        modal.append('warehouse_id', localStorage.getItem('warehouse_id'));

        this.WebApiService.getApiData(url, modal).subscribe((data: any) => {
          if (data.body !== undefined) {
            console.log(data.body)
            if (data.body.status == true && data.body) {
              this.modalService.showNotification(data.body.message);
              this.cartProducts = data.body.cart_data;
              this.cartData = data.body;
            }
            else {
              this.modalService.showNotification(data.body.message);
              this.cartProducts = data.body.cart_data;
              this.cartData = data.body;
            }
          }

        }, (err: HttpErrorResponse) => {
          if (err.status == 403) {
            localStorage.clear()
            this.router.navigate([''])
          }
        });
      }

    // }

  }

  onClickCheckout(){
    if(localStorage.getItem('user_id')){
      this.router.navigate(['web/checkout'])
    }else{
    let notLoggedInUser: ConfirmModalData = { 
      question: 'Please login to continue', confirmBtnText: 'Continue', cancelBtnText: 'Cancel' };
     this.modalService.confirm(notLoggedInUser).subscribe(result => {
      if(result){
        this.publicId = localStorage.getItem('public_id')
        this.router.navigate(['web/sign-in', `${this.publicId}`]);

      }else{
        return;
      }
    });
  }
  }

}
