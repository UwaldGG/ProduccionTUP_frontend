import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Distrito {
  ID_Distrito: number; // Asegúrate de que el nombre coincida con el de tu API
  NombreDistrito: string;
}


@Injectable({
  providedIn: 'root',
})
export class EmpleadosService {
  private apiUrl = 'http://localhost:3000/api/v1/empleados';
  private apiUrl2 = 'http://localhost:3000/api/v1/distritos';

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

  getTotalEmpleados(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/total`);
  }

  getEmpleadosConDistritos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/list`); // Asegúrate de que esta ruta esté bien configurada
  }

  getDistritos(): Observable<Distrito[]> {
    return this.http.get<Distrito[]>(`${this.apiUrl2}/list`); // Ajusta la URL según sea necesario
  }

}
