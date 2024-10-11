import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EmpleadosService } from '../../../services/Empleados/empleados.service';
import { DistritosService } from '../../../services/distritos/distritos.service'; // Importar el servicio de distritos
import { CommonModule } from '@angular/common';
import { Distrito } from '../../../interfaces/model'

@Component({
  selector: 'app-empleados-create',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './empleados-create.component.html',
  styleUrl: './empleados-create.component.css'
})
export class EmpleadosCreateComponent implements OnInit {
  newEmpleado: any = {
    Nombre: '',
    Apellido: '',
    fk_distrito: null
  };

  distritos: Distrito[] = [];

  errorMessage: string = ''; // Mensaje de error
  successMessage: String = '';

  constructor(
    private empleadosService: EmpleadosService, 
    private distritosService: DistritosService, // Inyectar el servicio de distritos
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDistritos(); // Cargar distritos al iniciar el componente
  }

  loadDistritos(): void {
    this.distritosService.getDistritos().subscribe(
      (data: Distrito[]) => {
        this.distritos = data;
      },
      (error) => {
        console.error('Error fetching distritos: ', error);
      }
    );
  }

  createEmpleado(): void {
    if (!this.newEmpleado.Nombre.trim() && !this.newEmpleado.Apellido.trim()) {
      this.errorMessage = 'El nombre, apellido y distrito son obligatorios'; // Mensaje de error
      setTimeout(() => {
        this.errorMessage = '';
      }, 2000);
      return; // No continuar si el nombre está vacío
    }

    this.empleadosService.createEmpleados(this.newEmpleado).subscribe(
      () => {
        this.successMessage = '¡El empleado ha sido creado con éxito!';
        this.newEmpleado = { Nombre: '', Apellido: '', fk_distrito: '' };
        setTimeout(() => {
          this.successMessage = '';
          this.router.navigate(['/admin-panel/empleados/list'], { replaceUrl: true });
        }, 2000);
      },
      (error) => {
        this.errorMessage = 'Error al crear el empleado. Inténtalo de nuevo.';
        console.error('Error creating empleado: ', error);
      }
    );
  }
}

