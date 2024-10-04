import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private empleado: any = null;

  setEmpleado(empleadoData: any) {
    this.empleado = empleadoData;
  }

  getEmpleado() {
    return this.empleado;
  }

  isAuthenticated() {
    return this.empleado !== null;
  }
}
