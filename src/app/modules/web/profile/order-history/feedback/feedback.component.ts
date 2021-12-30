import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from 'src/app/shared/services/common/modal.service';
import { WebApiService } from 'src/app/shared/services/web/web-api.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  order_id: any;
  ratingVal: any = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public WebApiService: WebApiService,
    private modalService: ModalService,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params)
      if (params.order_id) {
        this.order_id = params.order_id;
        console.log(this.order_id);
        
      }
    });
  }

  ratingValue(val) {
    this.ratingVal = val;
    
    this.cdr.detectChanges();

  }

}
