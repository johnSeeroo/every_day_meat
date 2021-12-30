import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from 'src/app/shared/services/common/modal.service';
import { WebApiService } from 'src/app/shared/services/web/web-api.service';
import { ConfirmModalData } from '../../../shared/models/confirm-modal-data.model';
import { WebAPI } from '../../../shared/constants/api-end-points/webApi.Constants';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PopupService } from 'src/app/shared/services/common/popup.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  user_id: any;
  addressData: any ;
  cartData: any;
  paymentMethod: any = [];
  selectedPaymentMethod: any = '';
  timeSlot: any = [];
  currentDate : any;
  tomorrowDate: any;
  checkOutForm: FormGroup;
  selectedDate: any;
  timeSlotSelected: boolean = false;
  publicId: any;
  giftList: any = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public WebApiService: WebApiService,
    private modalService: ModalService,
    private datePipe: DatePipe,
    private formBuilder: FormBuilder,
    private popup: PopupService,
  ) { 
    this.checkOutForm = this.formBuilder.group({
      selectedTimeSlot: ['', Validators.required],
      selectedPayment: ['', Validators.required],
    });
   }

  ngOnInit(): void {
    console.log(localStorage.getItem('user_id'));
    if(localStorage.getItem('user_id')){
      var date=new Date();
      this.currentDate = this.datePipe.transform(date, 'yyyy-MM-dd');
      this.tomorrowDate = date.setDate(date.getDate() + 1);
      this.tomorrowDate = this.datePipe.transform(this.tomorrowDate, 'yyyy-MM-dd');
      this.user_id = localStorage.getItem('user_id');
      this.getCheckOutDetails();
    }else{
      // let notLoggedInUser: ConfirmModalData = { 
      //   question: 'Please login to continue', confirmBtnText: 'Continue', cancelBtnText: 'Cancel' };
      //  this.modalService.confirm(notLoggedInUser).subscribe(result => {
      //   if(result){
      //     // this.router.navigate(['web/sign-in']);

      //   }
      // });
      this.publicId = localStorage.getItem('public_id')
      this.popup.failureMessage = "Please login to continue ";
          this.popup.failurepopup();
          this.router.navigate(['web/sign-in', `${this.publicId}`]);

    }
  }

  

  getCheckOutDetails(){
    debugger
    var modal = new FormData();
        modal.append('warehouse_id', localStorage.getItem('warehouse_id'));
          var url = WebAPI.userViewCart();
        modal.append('user_id', localStorage.getItem('user_id'));
       this.WebApiService.getApiData(url, modal).subscribe((data: any) => {
         if(data.body!==undefined){
           debugger
          console.log(data.body)
          if (data.body.status == true && data.body) {
            debugger
            console.log(data.body);
          this.cartData = data.body;
          console.log(this.cartData);
          this.addressData = data.body.addresses[0];
          console.log(this.addressData);
          this.paymentMethod = data.body.payment_method_list;
          console.log(this.paymentMethod);
          console.log("this is the total amount" +   this.cartData.amount_total)
          
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


  selectTimeSlot(date){
    console.log("This is the selected date " + date);
    var modal = new FormData();
          var url = WebAPI.addTimeSlot();
          if(date == 'today'){
          modal.append('delivery_date', this.currentDate);
          this.selectedDate = this.currentDate;
        }
        else if(date == 'tomorrow'){
          modal.append('delivery_date', this.tomorrowDate);
          this.selectedDate = this.tomorrowDate;
        }
          modal.append('warehouse_id', localStorage.getItem('warehouse_id'));
          modal.append('pincode_id', localStorage.getItem('area_id'));
       this.WebApiService.getApiData(url, modal).subscribe((data: any) => {
         if(data.body!==undefined){
          console.log(data.body)
          if (data.body.status == true && data.body) {
            console.log(data.body.time_slots);
            this.timeSlot = data.body.time_slots;
            console.log("this is the first time slot " + this.timeSlot[0].name);
          
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

  placeOrder(){
    console.log("this is the time slot " + this.checkOutForm.value.selectedTimeSlot);
    console.log("this is the payment method " + this.checkOutForm.value.selectedPayment);
    if(this.checkOutForm.value.selectedPayment == ''){
      this.modalService.showNotification("Select a payment method");
      return;
    }else if( this.checkOutForm.value.selectedTimeSlot == ''){
      this.modalService.showNotification("Select a time slot");
      return;
    }else if(this.addressData == undefined){
      this.modalService.showNotification("Add an address to proceed");
      return;
    }
    if(this.checkOutForm.value.selectedPayment == '9'){
      this.initiateRazorPayOrder();
    }else if(this.checkOutForm.value.selectedPayment == '5'){
      this.initiateCashOnDelivery();
    }
    
  }
  initiateRazorPayOrder(){
    var url = WebAPI.razorPayCheckOut();
    var modal = new FormData();
    modal.append('user_id', localStorage.getItem('user_id'));
        modal.append('order_id', localStorage.getItem('cart_id'));
        modal.append('time_slot_id', this.checkOutForm.value.selectedTimeSlot);
        modal.append('delivery_date', this.selectedDate);
        modal.append('pin_id', localStorage.getItem('area_id'));
        modal.append('warehouse_id', localStorage.getItem('warehouse_id'));
       this.WebApiService.getApiData(url, modal).subscribe((data: any) => {
         if(data.body!==undefined){
          if (data.body.status == true && data.body) {
            console.log("razor pay response data " + data.body);
          
          
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

  initiateCashOnDelivery(){
    var url = WebAPI.cashOnDeliveryCheckOut();
    var modal = new FormData();
        modal.append('use_old_address_audio', "1");
        modal.append('address_audio',"");
        modal.append('cart_id', localStorage.getItem('cart_id'));
        modal.append('flat_no', this.addressData.flat_no);
        modal.append('building_name', this.addressData.building_name);
        modal.append('street', this.addressData.street);
        modal.append('street2', this.addressData.street2);
        modal.append('city', this.addressData.city);
        modal.append('user_id', localStorage.getItem('user_id'));
        modal.append('name', this.addressData.name);
        modal.append('mobile1', this.addressData.mobile1);
        modal.append('email', this.addressData.email);
        modal.append('payment_type', '1');
        modal.append('time_slot_id', this.checkOutForm.value.selectedTimeSlot);
        modal.append('reference', '1');
        modal.append('delivery_date', this.selectedDate);
        modal.append('pin_id', localStorage.getItem('area_id'));
        modal.append('warehouse_id', localStorage.getItem('warehouse_id'));
        modal.append('area_id', localStorage.getItem('area_id'));
        modal.append('is_paid', '1');
       this.WebApiService.getApiData(url, modal).subscribe((data: any) => {
         if(data.body!==undefined){
          console.log(data.body)
          if (data.body.status == true && data.body) {
            console.log("cod pay response data " + data.body);
            this.modalService.showNotification("Order placed");
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

  viewOffers(){
    var url = WebAPI.getOfferList();
    var modal = new FormData();
    modal.append('user_id', localStorage.getItem('user_id'));
       this.WebApiService.getApiData(url, modal).subscribe((data: any) => {
         if(data.body!==undefined){
          if (data.body.status == true && data.body) {
            console.log( data.body);
          this.giftList = data.body.gift_list;
          
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

  applyOffer(offer){
    var url = WebAPI.applyOffer();
    var modal = new FormData();
    modal.append('cart_id', localStorage.getItem('cart_id'));
    modal.append('user_id', localStorage.getItem('user_id'));
    modal.append('pin_id', localStorage.getItem('area_id'));
    modal.append('promo_voucher', offer.promo_voucher);
    modal.append('warehouse_id', localStorage.getItem('warehouse_id'));
    modal.append('time_slot_id', this.checkOutForm.value.selectedTimeSlot);
       this.WebApiService.getApiData(url, modal).subscribe((data: any) => {
         if(data.body!==undefined){
          if (data.body.status == true && data.body) {
            console.log( data.body);
            this.cartData = data.body;
            this.modalService.showNotification(data.body.message);
          
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

  removeOffer(voucher){
    var url = WebAPI.removeOffer();
    var modal = new FormData();
    modal.append('cart_id', localStorage.getItem('cart_id'));
    modal.append('user_id', localStorage.getItem('user_id'));
    modal.append('pin_id', localStorage.getItem('area_id'));
    modal.append('promo_voucher', voucher);
    modal.append('warehouse_id', localStorage.getItem('warehouse_id'));
    modal.append('time_slot_id', this.checkOutForm.value.selectedTimeSlot);
       this.WebApiService.getApiData(url, modal).subscribe((data: any) => {
         if(data.body!==undefined){
          if (data.body.status == true && data.body) {
            console.log( data.body);
            this.cartData = data.body;
            this.modalService.showNotification(data.body.message);

          
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
