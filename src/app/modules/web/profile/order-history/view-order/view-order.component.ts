import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from 'src/app/shared/services/common/modal.service';
import { WebApiService } from 'src/app/shared/services/web/web-api.service';
import { WebAPI } from '../../../../../shared/constants/api-end-points/webApi.Constants';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent implements OnInit {
  order_id: any;
  orderDetails: any = '';
  orderProductList: any = [];
  cancelDropdownShow: boolean = false;
  cancellationReasons: any = []; 
  cancellationForm: FormGroup;
  ratingVal: any = 0;
  paymentData: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public WebApiService: WebApiService,
    private modalService: ModalService,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef
  ) { 
    this.cancellationForm = this.formBuilder.group({
      cancelReason: [''],
    });

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params)
      if (params.order_id) {
        this.order_id = params.order_id;
        console.log(this.order_id);
        this.getOrderDetails();
        
        
      }
    });
  }

  getOrderDetails(){
    let url = WebAPI.viewIndividualOrderHistory();
        var modal = new FormData();
        modal.append('order_id', this.order_id);
        modal.append('user_id', localStorage.getItem('user_id'));
        this.WebApiService.getApiData(url, modal).subscribe((data: any) => {
          if (data.body !== undefined) {
            if (data.body.status == true && data.body) {
              debugger
              console.log(data.body);
              this.orderDetails = data.body;
              this.orderProductList = data.body.products;
              this.cancellationReasons = data.body.reason_ids;
              console.log(this.cancellationReasons);
             if(this.orderDetails.payment_method != 'Cash On Delivery'){
              this.getPaymentStatus();
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

  cancelOrder(){
    console.log(this.cancellationForm.value.cancelReason);
    let url = WebAPI.cancelOrder();
    var modal = new FormData();
    modal.append('order_id', this.order_id);
    modal.append('reason_id', this.cancellationForm.value.cancelReason);
    modal.append('user_id', localStorage.getItem('user_id'));
    this.WebApiService.getApiData(url, modal).subscribe((data: any) => {
      if (data.body !== undefined) {
        if (data.body.status == true && data.body) {
          console.log(data.body);
          this.getOrderDetails();
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

  trackOrder(){
    let url = WebAPI.cancelOrder();
    var modal = new FormData();
    modal.append('order_id', this.order_id);
    modal.append('reason_id', this.order_id);
    modal.append('user_id', localStorage.getItem('user_id'));
    this.WebApiService.getApiData(url, modal).subscribe((data: any) => {
      if (data.body !== undefined) {
        if (data.body.status == true && data.body) {
          console.log(data.body);
          this.orderDetails = data.body;
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

  redirectFeedbackPage(){
    this.router.navigate(['web/profile/orders/feedback/', `${this.order_id}`]);
  }

  ratingValue(val) {
    this.ratingVal = val;
    this.cdr.detectChanges();

  }

  rateProduct(productId){
    if(this.ratingVal == '0'){
      this.modalService.showNotification("Give a valid rating");
      return;
    }
    let url = WebAPI.rateProduct();
    var modal = new FormData();
    modal.append('user_id', localStorage.getItem('user_id'));
    modal.append('order_id', this.order_id);
    modal.append('rating', this.ratingVal);
    modal.append('product_id', productId);
    this.WebApiService.getApiData(url, modal).subscribe((data: any) => {
      if (data.body !== undefined) {
        if (data.body.status == true && data.body) {
          console.log(data.body);
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

  getPaymentStatus(){
    let url = WebAPI.paymentStatus();
    var modal = new FormData();
    modal.append('user_id', localStorage.getItem('user_id'));
    modal.append('order_id', this.order_id);
    this.WebApiService.getApiData(url, modal).subscribe((data: any) => {
      if (data.body !== undefined) {
        if (data.body.status == true && data.body) {
          console.log(data.body);
          this.paymentData = data.body.payment_status;
        }
        else {
          // this.modalService.showNotification(data.body.message);
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
