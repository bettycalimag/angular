import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';   
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';  
import { Customer } from './customer'; 

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  url = 'https://localhost:44355/api/customercontract';  
  constructor(private http: HttpClient) { }  
  getAllCustomercontract(): Observable<Customer[]> {  
    return this.http.get<Customer[]>((this.url + '/AllContractDetails'),{ withCredentials: true }).pipe(
      retry(1),
      catchError(this.handleError)
  ); 
  
}

 handleError(error) {
   let errorMessage = '';
   if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
   } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
   }
   console.log(errorMessage);
   return throwError(errorMessage);
}

getCustomerById(customerId: string): Observable<Customer> {  
  return this.http.get<Customer>(this.url + '/GetContractDetailsById/' + customerId).pipe(
    retry(1),
    catchError(this.handleError)
    ); 
}  

createCustomercontract(customer: Customer): Observable<Customer> {  
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
  return this.http.post<Customer>(this.url + '/InsertContractDetails/',  
  customer, httpOptions);  
}
  
updateCustomercontract(customer: Customer): Observable<Customer> {  
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
  return this.http.put<Customer>(this.url + '/UpdateContractDetails/',  
  customer, httpOptions);  
}  

deleteCustomercontractById(customerid: string): Observable<number> {  
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
  return this.http.delete<number>(this.url + '/DeleteContractDetails?id=' +customerid,  
httpOptions);  
} 


}
