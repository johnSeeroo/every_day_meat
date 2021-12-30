import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WebApiService } from 'src/app/shared/services/web/web-api.service';
import { MatDialogRef } from '@angular/material/dialog';
import {map, startWith} from 'rxjs/operators';
import { LocaldataService } from 'src/app/shared/services/web/localdata.service';

@Component({
  selector: 'app-location-popup',
  templateUrl: './location-popup.component.html',
  styleUrls: ['./location-popup.component.css']
})
export class LocationPopupComponent implements OnInit {

  locationFormGroup: FormGroup;
  issubmitted: boolean = false;
  error_msg: any = '';
  availablePincode: any = [];
  pincodeListFilter: any = [];
  pincodeControl = new FormControl();
  filteredPinCode: any = [];
  isrequestDeliveryLocation: boolean = false;
  

  constructor(
    private _formBuilder: FormBuilder,
    public WebApiService: WebApiService,
    private router: Router,
    private dialogRef: MatDialogRef<LocationPopupComponent>,
    private LocaldataService: LocaldataService,
    ) {
     this.locationFormGroup = this._formBuilder.group({
      pinCode: [''],
  }); 
}

  ngOnInit(): void {
    this.getAvailability();
    this.pincodeListFilter = this.pincodeControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    this.filteredPinCode = this.availablePincode.filter(option => option.name.toLowerCase().includes(filterValue));
      return this.availablePincode.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  getAvailability(){
    this.WebApiService.checkAvailability().subscribe((data: any) => {
      if (data.status == true && data) {
        this.availablePincode = data.piccode_items;

      }
    }, (err: HttpErrorResponse) => {
      if (err.status == 403) {
        localStorage.clear()
        this.router.navigate([''])
      }
    });

  }
  closeDialog(): void {
    this.dialogRef.close();
  }

  setSelectedLocation(value){
    localStorage.setItem('area_id',value.id);
    localStorage.setItem('delivery_charge',value.delivery_charge);
    localStorage.setItem('location_name_with_picode',value.name);
    localStorage.setItem('warehouse_id',value.warehouse_id);
    this.LocaldataService.updateLocation();
    this.closeDialog();
  }

  checkAvailability(){
    if((this.pincodeControl.value) && this.filteredPinCode.length == 0){
      console.log("No search result");
      this.isrequestDeliveryLocation = true;
    }
  }

  requestDeliveryLocation(){
    this.closeDialog();
    this.router.navigate(['web/request-location']);
  }

}
