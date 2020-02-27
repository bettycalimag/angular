import { Component, OnInit } from '@angular/core'; 
import { Observable } from 'rxjs';  
import { CustomerService } from '../customer.service';  
import { Customer } from '../customer'; 

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  public customers: Customer[]; 

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.customerService.getAllCustomercontract().subscribe(res => {
      this.customers = res;
    });
  }

}
