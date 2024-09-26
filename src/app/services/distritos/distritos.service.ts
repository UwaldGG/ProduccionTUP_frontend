import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DistritosService {
  private apiUrl = 'http://localhost:3000/api/v1/Distritos';

  constructor(private http: HttpClient) {}

  getDistritos(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getDistritoById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createDistrito(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  updateDistrito(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteDistrito(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getTotalDistritos(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/total`); // Llama al endpoint que devuelve el total
  }
}
