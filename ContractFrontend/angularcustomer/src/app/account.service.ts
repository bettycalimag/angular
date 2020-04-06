import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';   
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators'; 
import { Account } from './account'; 

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  url = 'https://localhost:44355/api/account';

  constructor(private http: HttpClient) { }

  getAllAccounts(): Observable<Account[]> {  
    return this.http.get<Account[]>((this.url + '/AllAccountDetails'),{ withCredentials: true }).pipe(
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

  getAccountById(accountId: string): Observable<Account> {  
    return this.http.get<Account>(this.url + '/GetAccountDetailsById/' + accountId).pipe(
      retry(1),
      catchError(this.handleError)
      ); 
  } 
  
  getMonthlyReport(monthId: string): Observable<number> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.get<number>(this.url + '/GetExport/' + monthId,  
  httpOptions);  
  } 
  
  
  createAccount(account: Account): Observable<Account> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.post<Account>(this.url + '/InsertAccountDetails/',  
    account, httpOptions);  
  }
    
  updateAccount(account: Account): Observable<Account> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.put<Account>(this.url + '/UpdateAccountDetails/',  
    account, httpOptions);  
  }  
  
  deleteAccountById(accountId: string): Observable<number> {  
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
    return this.http.delete<number>(this.url + '/DeleteAccountDetails?id=' + accountId,  
  httpOptions);  
  } 
  
}
