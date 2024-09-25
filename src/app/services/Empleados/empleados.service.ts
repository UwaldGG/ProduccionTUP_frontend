import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmpleadosService {
  private apiUrl = 'http://localhost:3000/api/v1/Empleados';

  constructor(private http: HttpClient) {}

  getEmpleados(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getEmpleadosById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createEmpleados(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  updateEmpleados(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteEmpleados(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
