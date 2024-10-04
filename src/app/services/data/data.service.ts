import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tarea } from '../../interfaces/model';


@Injectable({
  providedIn: 'root'
})

export class DataService {
    private apiUrl = 'http://localhost:3000/api/v1/tareas';

    constructor(private http: HttpClient) { }

    getTareasConDistritosYEmpleados(): Observable<Tarea[]> {
        return this.http.get<Tarea[]>(`${this.apiUrl}/con-distritos-y-empleados`);
    }
}
