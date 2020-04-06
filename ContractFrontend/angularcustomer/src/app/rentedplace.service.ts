import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';   
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';  
import { RentedPlace } from './rentedplace'; 


@Injectable({
  providedIn: 'root'
})
export class RentedPlaceService {

  url = 'https://localhost:44355/api/rentedplace';

  constructor(private http: HttpClient) { }  

  getAllRentedPlaces(): Observable<RentedPlace[]> {  
    return this.http.get<RentedPlace[]>((this.url + '/AllRentedPlaceDetails'),{ withCredentials: true }).pipe(
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

getRentedPlaceById(rentedPlaceId: string): Observable<RentedPlace> {  
  return this.http.get<RentedPlace>(this.url + '/GetRentedPlaceDetailsById/' + rentedPlaceId).pipe(
    retry(1),
    catchError(this.handleError)
    ); 
}  

createRentedPlace(rentedPlace: RentedPlace): Observable<RentedPlace> {  
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
  return this.http.post<RentedPlace>(this.url + '/InsertRentedPlaceDetails/',  
  rentedPlace, httpOptions);  
}
  
updateRentedPlace(rentedPlace: RentedPlace): Observable<RentedPlace> {  
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
  return this.http.put<RentedPlace>(this.url + '/UpdateRentedPlaceDetails/',  
  rentedPlace, httpOptions);  
}  

deleteRentedplaceById(rentedPlaceId: string): Observable<number> {  
  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };  
  return this.http.delete<number>(this.url + '/DeleteRentedPlaceDetails?id=' + rentedPlaceId,  
httpOptions);  
} 

}
