import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/shared/services/common/modal.service';
import { WebApiService } from 'src/app/shared/services/web/web-api.service';
import { WebAPI } from '../../../../../shared/constants/api-end-points/webApi.Constants';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.css']
})
export class ListOrderComponent implements OnInit {
  orderList: any = [];
  totalPages: any;
  numberpages: any = [];
  selectedPage: any = 1;

  constructor(
    private router: Router,
    public WebApiService: WebApiService,
    private modalService: ModalService,
  ) { }

  ngOnInit(): void {
    this.getOrderData()
  }

  getOrderData() {
    let url = WebAPI.viewOrderHistory();
    var modal = new FormData();
    modal.append('user_id', localStorage.getItem('user_id'));
    modal.append('page', this.selectedPage);
    this.WebApiService.getApiData(url, modal).subscribe((data: any) => {
      if (data.body !== undefined) {
        console.log(data.body)
        if (data.body.status == true && data.body) {
          this.orderList = data.body.history;
          this.totalPages = parseInt(data.body.pages);
          this.generatePageNumber();

        } else {
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


  orderDetailPage(item) {
    this.router.navigate(['web/profile/orders/view/', `${item.id}`]);
  }
  previousPageSelect() {
    if (this.selectedPage > 1) {
      document.getElementById("pages" + this.selectedPage).classList.remove("selected_page");
      this.selectedPage = this.selectedPage - 1;
      document.getElementById("pages" + this.selectedPage).className = "selected_page";
      this.getOrderData();
    }
  }

  nextPageSelect() {
    if (this.selectedPage < this.totalPages) {
      document.getElementById("pages" + this.selectedPage).classList.remove("selected_page");
      this.selectedPage = this.selectedPage + 1;
      document.getElementById("pages" + this.selectedPage).className = "selected_page";
      console.log(this.selectedPage);
      this.getOrderData();
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
    this.getOrderData();
  }

  }

}



