import { Component, OnInit, Output, EventEmitter } from '@angular/core'; 
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'; 
import { Observable } from 'rxjs';  
import { CustomerService } from '../customer.service';  
import { Customer } from '../customer'; 
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';;
import * as _moment from 'moment';


const moment =  _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  providers: [

    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class CustomerComponent implements OnInit {

  public customers: Customer[];
  question: any = {};
  dataSaved = false;     
  customerIdUpdate = null;  
  massage = null;  

  @Output() date2: EventEmitter<any> = new EventEmitter<any>();
  
  customerForm = new FormGroup({
    customerName: new FormControl(),
    customerAddress: new FormControl(),
    totalPrice: new FormControl(),
    brokerName: new FormControl(),
    brokerAddress: new FormControl(),
    contractStartDate: new FormControl(moment()), 
    contractEndDate: new FormControl(moment())     
    })
    
    
  constructor(private formbuilder: FormBuilder, private customerService: CustomerService) { }

  ngOnInit() {
    this.customerForm = this.formbuilder.group({  
      customerName: ['', [Validators.required]],  
      customerAddress: ['', [Validators.required]],  
      totalPrice: ['', [Validators.required]],  
      brokerName: ['', [Validators.required]],  
      brokerAddress: ['', [Validators.required]],  
      contractStartDate: ['', [Validators.required]],  
      contractEndDate: ['', [Validators.required]],      
    });  

    this.loadAllCustomers();
  }

  change(dateEvent) {
    this.date2.emit(dateEvent.value)
  }

  loadAllCustomers() {  
    this.customerService.getAllCustomercontract().subscribe(res => {
      this.customers = res;
    });
  }
    
  onFormSubmit() {  
    this.dataSaved = false;    
    const customer = this.customerForm.value;  
    this.CreateCustomer(customer);  
    this.customerForm.reset();  
  }  

  loadCustomerToEdit(customerId: string) {  
      this.customerService.getCustomerById(customerId).subscribe((customer: any) =>  {
      this.massage = null; 
      this.dataSaved = false;  
      console.log(customer.customerName);
      this.customerIdUpdate = customer.id;      
      this.customerForm.controls['customerName'].setValue(customer.customerName);  
      this.customerForm.controls['customerAddress'].setValue(customer.customerAddress);  
       this.customerForm.controls['totalPrice'].setValue(customer.totalPrice);  
       this.customerForm.controls['brokerName'].setValue(customer.brokerName);  
       this.customerForm.controls['brokerAddress'].setValue(customer.brokerAddress);  
       this.customerForm.controls['contractStartDate'].setValue(customer.contractStartDate);  
       this.customerForm.controls['contractEndDate'].setValue(customer.contractEndDate);    
    });    
  }  

  CreateCustomer(customer: Customer) {  
    if (this.customerIdUpdate == null) {  
      this.customerService.createCustomercontract(customer).subscribe(  
        () => {  
          this.dataSaved = true;  
          this.massage = 'Record saved Successfully';  
          this.loadAllCustomers();  
          this.customerIdUpdate = null;  
          this.customerForm.reset();  
        }  
      );  
    } else {  
      customer.id = this.customerIdUpdate;  
      this.customerService.updateCustomercontract(customer).subscribe(() => {  
        this.dataSaved = true;  
        this.massage = 'Record Updated Successfully';  
        this.loadAllCustomers();  
        this.customerIdUpdate = null;  
        this.customerForm.reset();  
      });  
    }  
  }   
  deleteCustomer(customerId: string) {  
    if (confirm("Are you sure you want to delete this ?")) {   
    this.customerService.deleteCustomercontractById(customerId).subscribe(() => {  
      this.dataSaved = true;  
      this.massage = 'Record Deleted Succefully';  
      this.loadAllCustomers();  
      this.customerIdUpdate = null;  
      this.customerForm.reset();  
  
    });  
  }  
}  
  resetForm() {  
    this.customerForm.reset();  
    this.massage = null;  
    this.dataSaved = false;  
  } 

}
