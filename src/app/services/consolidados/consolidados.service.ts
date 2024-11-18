import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsolidadosService {

  private apiUrl = '/api/v1/empleados_tareas';

  constructor(private http: HttpClient) {}

  obtenerConsolidado(ID_Distrito: number, anio: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/consolidado/${ID_Distrito}?anio=${anio}`);
  }

  obtenerConsolidadoPorAnio(anio: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/consolidado/anio/${anio}`);
  }  
}


