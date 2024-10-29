import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from '../../../../../services/Empleados/empleados.service';
import { DistritosService } from '../../../../../services/distritos/distritos.service'
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SuccessModalComponent } from '../../../../SuccessModal/success-modal/success-modal.component';
import { MatDialog } from '@angular/material/dialog';

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
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getDistritos();
  }

  getDistritos(): void {
    this.distritosService.getDistritos().subscribe(
      (data: any[]) => {
        this.distritos = data.filter(distrito => distrito.Contrasenia); // Mostrar solo distritos con contraseña
      },
      (error) => {
        console.error('Error fetching distritos', error);
      }
    );
  }

  onLogin(): void {
    if (this.selectedDistrito && this.password) {
      console.log(this.selectedDistrito);
      this.authService.verifyPassword(this.selectedDistrito, this.password).subscribe(
        (isAuthenticated) => {
          if (isAuthenticated) {
            this.dialog.open(SuccessModalComponent);
            // Redirigir a la página con la tabla de datos y pasar el distritoId
            this.router.navigate(['data', this.selectedDistrito]);
          } else {
            console.log('Contraseña incorrecta.');
          }
        }
      );
    } else {
      console.log('Debe seleccionar un distrito y proporcionar la contraseña.');
    }
  }
  
}



