import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TareasService {
  private apiUrl = 'http://localhost:3000/api/v1/tareas';
  private apiUrl2 = 'http://localhost:3000/api/v1/empleados_tareas';

  constructor(private http: HttpClient) {}

  getTareas(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getTareaById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  createTarea(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  updateTarea(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteTarea(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getTotalTareas(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/total`);
  }
  // Obtener registros de tareas mensuales para empleados
  getRegistros(): Observable<any> {
    return this.http.get(`${this.apiUrl}/registros`);  // Supone que existe el endpoint '/registros'
  }

  getTareasPorEmpleado(idEmpleado: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/empleado/${idEmpleado}`);
  }  

  actualizarValorTarea(idDato: number, mes: number, cantidad: number) {
    return this.http.put(`${this.apiUrl2}/empleados-tareas/${idDato}`, { mes, cantidad });
  }
}
