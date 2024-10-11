import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from '../../../../../services/Empleados/empleados.service';
import { DistritosService } from '../../../../../services/distritos/distritos.service'
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-identificar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './identificar.component.html',
  styleUrl: './identificar.component.css'
})
export class IdentificarComponent implements OnInit {
  distritos: any[] = [];
  selectedDistrito: number | null = null;
  password: string = '';
  isInvalidPassword: boolean = false;

  constructor(
    private distritosService: DistritosService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getDistritos();
  }

  getDistritos(): void {
    this.distritosService.getDistritos().subscribe(
      (data: any[]) => {
        this.distritos = data.filter(distrito => distrito.contraseña); // Mostrar solo distritos con contraseña
      },
      (error) => {
        console.error('Error fetching distritos', error);
      }
    );
  }

  onLogin(): void {
    if (this.selectedDistrito && this.password) {
    this.authService.login(this.selectedDistrito, this.password).subscribe(
        (isValid: boolean) => {
          if (isValid) {
            // Redirigir si la autenticación es exitosa
            this.router.navigate(['data']);
          } else {
            // Mostrar error de contraseña inválida
            this.isInvalidPassword = true;
          }
        },
        (error) => {
          console.error('Error during login', error);
        }
      );
    }
  }
}
