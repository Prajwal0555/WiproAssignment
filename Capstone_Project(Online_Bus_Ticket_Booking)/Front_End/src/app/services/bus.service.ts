import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BusSchedule } from '../schedule.model';

@Injectable({
  providedIn: 'root'
})
export class BusScheduleService {

  private baseUrl = 'http://localhost:8080/api'; // Replace with your backend base URL

  constructor(private http: HttpClient) { }

  loginBusOperator(email: string, password: string): Observable<string> {
    const loginModel = { email, password };
    const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Set the Authorization header
    return this.http.post<any>(`${this.baseUrl}/busOperator/loginBusOperator`, loginModel, { headers } )
    .pipe(
      map(response => {
        // Assuming the response contains a token
        if (response && response.token) {
          return response.token;
        } else {
          throw new Error('Token not found in the response');
        }
      })
    );

  }

  createBusSchedule(busSchedule: BusSchedule): Observable<any> {
    const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Set the Authorization header

    return this.http.post<any>(`${this.baseUrl}/busOperator/createBusSchedule`, busSchedule, { headers })
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
export { BusSchedule };

