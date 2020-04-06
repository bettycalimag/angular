import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';   
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';  
import { Tenant } from './tenant';

@Injectable({
  providedIn: 'root'
})
export class TenantService {

  url = 'https://localhost:44355/api/tenant';

  constructor(private http: HttpClient) { }

  getAllTenants(): Observable<Tenant[]> {  
    return this.http.get<Tenant[]>((this.url + '/AllTenantDetails'),{ withCredentials: true }).pipe(
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

getTenantById(tenantId: string): Observable<Tenant> {  
  return this.http.get<Tenant>(this.url + '/GetTenantDetailsById/' + tenantId).pipe(
    retry(1),
    catchError(this.handleError)
    ); 
}  

createTenant(tenant: Tenant): Observable<Tenant> {  
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
  return this.http.post<Tenant>(this.url + '/InsertTenantDetails/',  
  tenant, httpOptions);  
}
  
updateTenant(tenant: Tenant): Observable<Tenant> {  
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
  return this.http.put<Tenant>(this.url + '/UpdateTenantDetails/',  
  tenant, httpOptions);  
}  

deleteTenantById(tenantId: string): Observable<number> {  
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
  return this.http.delete<number>(this.url + '/DeleteTenantDetails?id=' + tenantId,  
httpOptions);  
} 

}
