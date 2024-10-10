import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn: boolean = false;

  // Simulación de credenciales
  private adminUsername = 'admin';
  private adminPassword = 'admin123';

  constructor() {}

  // Método de autenticación
  login(username: string, password: string): boolean {
    if (username === this.adminUsername && password === this.adminPassword) {
      this.loggedIn = true;
      return true;
    }
    this.loggedIn = false;
    return false;
  }

  logout(): void {
    this.loggedIn = false;
  }

  isAuthenticated(): boolean {
    return this.loggedIn;
  }
}
