import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators'
import { LoginResponse } from '../interfaces/model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = 'http://200.12.42.13:3000/api/v1/distritos';
  private apiUrl2 = 'http://200.12.42.13:3000/api/v1/auth';

  private loggedIn: boolean = false;
  private isAdmin: boolean = false;

  constructor(private http: HttpClient) {}

  verifyPassword(distritoId: number, password: string): Observable<boolean> {
    return this.http.get<any>(`${this.apiUrl}/${distritoId}`).pipe(
      map(distrito => {
        if (distrito.Contrasenia === password) {
          this.loggedIn = true;
          this.isAdmin = false;
          return true;
        } else {
          return false;
        }
      }),
      catchError(() => of(false))  // Si ocurre un error, retorna false
    );
  }

// Método de autenticación de admin
login(username: string, password: string): Observable<boolean> {
  return this.http.post<LoginResponse>(`${this.apiUrl2}/login/admin`, { username, password }).pipe(
    tap((response) => {
      if (response.isAdmin) {
        this.loggedIn = true;
        this.isAdmin = true;
      }
    }),
    map((response) => response.isAdmin),
    catchError((error) => {
      if (error.status === 401) {
        // Puedes agregar más lógica aquí si necesitas manejar específicamente un error 401
        return of(false);  // Devuelves un false si las credenciales son incorrectas
      }
      return of(false);  // En otros casos también retornas false
    })
  );
}

  logout(): void {
    this.loggedIn = false;
    this.isAdmin = false;
  }

  isAuthenticated(): boolean {
    return this.loggedIn;
  }

  isAdministrator(): boolean {
    return this.loggedIn && this.isAdmin;
  }
  
  isEmpleadoAuthenticated(): boolean {
    return this.loggedIn && !this.isAdmin;
  }
  
}
