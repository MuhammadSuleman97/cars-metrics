import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from '../components/home/home.component';  // Import the Car interface

@Injectable({
  providedIn: 'root'
})

export class CarService {
  private baseURL = 'https://cars-metrics-backend.onrender.com/api';  
  // private baseURL = 'http://localhost:3000/api';  

  constructor(private http: HttpClient) { }

  getCars(): Observable<Car[]> {
    // Append timestamp to prevent caching
    const params = new HttpParams().set('timestamp', new Date().getTime().toString());
    return this.http.get<Car[]>(`${this.baseURL}/cars`, { params });
  }

  downloadCsv(): Observable<Blob> {
    return this.http.get(`${this.baseURL}/cars/download`, { responseType: 'blob' });
  }

  createCar(car: Car): Observable<Car> {
    return this.http.post<Car>(`${this.baseURL}/cars`, car);
  }

  uploadCarCSV(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.baseURL}/cars/upload`, formData);
  }
}

