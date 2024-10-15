import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/v1/distritos';

  private loggedIn: boolean = false;

  // Simulación de credenciales
  private adminUsername = 'admin';
  private adminPassword = 'admin123';

  constructor(private http: HttpClient) {}

  verifyPassword(distritoId: number, password: string): Observable<boolean> {
    return this.http.get<any>(`${this.apiUrl}/${distritoId}`).pipe(
      map(distrito => {
        if (distrito.Contrasenia === password) {
          this.loggedIn = true;
          return true;
        } else {
          return false;
        }
      }),
      catchError(() => of(false))  // Si ocurre un error, retorna false
    );
  }
  
  

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
