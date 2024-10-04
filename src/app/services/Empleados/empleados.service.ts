import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empleado, Tarea, Distrito } from '../../interfaces/model';

@Injectable({
  providedIn: 'root',
})
export class EmpleadosService {
  private apiUrl = 'http://localhost:3000/api/v1/empleados';

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

  getEmpleadosWithDistritos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/list`); // Asegúrate de que esta ruta esté bien configurada
  }

  //guardarTareas(data: any): Observable<any> {
    //return this.http.post(`${this.apiUrl}/guardar-tareas`, data);
  //}

  //getEmpleadosWithDistrito(): Observable<Empleado[]> {
  //  return this.http.get<Empleado[]>(`${this.apiUrl}/with-distrito`);
  //}

  obtenerTareasPorEmpleadoYDistrito(nombre: string, apellido: string, distrito: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/empleados-tareas`, {
      params: { nombre, apellido, distrito },
    });
  }

  obtenerResumenTareasPorDistrito(nombreDistrito: string, mes: number, año: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/resumen-tareas`, {
      params: { nombreDistrito, mes, año },
    });
  }

  obtenerTotalTareasPorDistrito(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/total-tareas`);
  }

  obtenerTareasPorEmpleadoYFecha(nombre: string, apellido: string, año: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/tareas-por-fecha`, {
      params: { nombre, apellido, año },
    });
  }

  obtenerPromedioTareasPorDistrito(nombreDistrito: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/promedio-tareas-distrito`, {
      params: { nombreDistrito },
    });
  }

  obtenerDetalleTareasPorMes(mes: number, año: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/detalle-tareas`, {
      params: { mes, año },
    });
  }

  obtenerEmpleadosSinTareasPorMes(mes: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/empleados-sin-tareas`, {
      params: { mes },
    });
  }

  obtenerTotalActividadesPorDistrito(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/total-actividades-distrito`);
  }

  obtenerEmpleadosPorDistrito(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/empleados-por-distrito`);
  }

  getEmpleadosByDistrito(distritoId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/por-distrito/${distritoId}`); // Asegúrate de que esta ruta esté bien configurada
  }

}
