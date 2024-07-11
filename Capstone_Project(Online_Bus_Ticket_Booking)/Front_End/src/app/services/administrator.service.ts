import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BusOperator } from '../bus-operator.model'; // Ensure you have defined your BusOperator model
import { Administrator } from '../adminitrator.model';

@Injectable({
  providedIn: 'root'
})
export class AdministratorService {

  private apiUrl = 'http://localhost:8080/api/administrator'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  registerAdmin(administrator : Administrator): Observable<any> {
    const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Set the Authorization header
    return this.http.post<Administrator>(`${this.apiUrl}/registerAdmin`, administrator, { headers });
  }


  addBusOperator(busOperator: BusOperator): Observable<BusOperator> {
    const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Set the Authorization header
    });

    return this.http.post<BusOperator>(`${this.apiUrl}/addBusOperators`, busOperator, { headers })
    
}
}
