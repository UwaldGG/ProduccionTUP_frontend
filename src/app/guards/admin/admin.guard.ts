import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';  // Asegúrate de tener este servicio

@Injectable({
  providedIn: 'root',
})

export class AdminGuard implements CanActivate{
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true; // Permitir acceso si el usuario está autenticado
    } else {
      // Redirigir al login si no está autenticado
      this.router.navigate(['/login-admin']);
      return false;
    }
  }
};

