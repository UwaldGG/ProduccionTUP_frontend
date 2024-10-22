import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DatoActualizar, Tarea } from '../../interfaces/model';
import { DatosTareaEmpleado} from '../../interfaces/model'


@Injectable({
  providedIn: 'root'
})

export class DataService {
    private apiUrl = 'http://localhost:3000/api/v1/tareas';
    private apiUrl2 = 'http://localhost:3000/api/v1/empleados_tareas'

    constructor(private http: HttpClient) { }

    getTareasConDistritosYEmpleados(): Observable<Tarea[]> {
        return this.http.get<Tarea[]>(`${this.apiUrl}/con-distritos-y-empleados`);
    }

    actualizarDatos(datos: any[]): Observable<any> {
      const url = `${this.apiUrl2}/actualizar`; // Cambia la ruta según tu API
      return this.http.put(url, datos); // Utilizamos PUT para actualizar
    }

    actualizarDatos2(datos: DatoActualizar): Observable<any> {
      return this.http.post(`${this.apiUrl2}/actualizar-datos`, datos);
    }
   
}
