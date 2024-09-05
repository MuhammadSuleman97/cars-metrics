import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car } from '../components/home/home.component';  // Import the Car interface

@Injectable({
  providedIn: 'root'
})

export class CarService {
  private baseURL = 'http://localhost:3000/api';  // Use the correct endpoint URL

  constructor(private http: HttpClient) { }

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.baseURL}/cars`);
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

