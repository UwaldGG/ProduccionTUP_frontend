import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from '../../../../../services/Empleados/empleados.service';
import { DistritosService } from '../../../../../services/distritos/distritos.service'
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-identificar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './identificar.component.html',
  styleUrl: './identificar.component.css'
})
export class IdentificarComponent implements OnInit{

  distritos: any[] = [];
  empleados: any[] = [];
  selectedDistrito: number | null = null;
  selectedEmpleadoId: number | null = null;  // Variable para almacenar el empleado seleccionado


  constructor(private empleadosService: EmpleadosService,
              private distritosService: DistritosService,
              private authService: AuthService,
              private router: Router
  ) {}

  ngOnInit(): void {
    this.getDistritos();
  }

  getDistritos(): void {
    // Obtener la lista de distritos desde el servicio
    this.distritosService.getDistritos().subscribe(
      (data: any[]) => {
        this.distritos = data;
      },
      (error) => {
        console.error('Error fetching distritos', error);
      }
    );
  }

  onDistritoChange(event: any): void {
    const distritoId = event.target.value;
    this.selectedDistrito = distritoId;
  
    if (distritoId) {
      this.empleadosService.getEmpleadosByDistrito(distritoId).subscribe(
        (data: any) => {
          console.log("Respuesta de empleados por distrito:", data);
  
          // Elige el distrito en la respuesta (debería coincidir con el distritoId)
          const distritoNombre = Object.keys(data)[0]; // Asumiendo que siempre hay 1 distrito en la respuesta
          this.empleados = data[distritoNombre] || []; // Obtener el array de empleados bajo el distrito
  
          console.log("Empleados en distrito seleccionado:", this.empleados);
          console.log(this.selectedDistrito);
          console.log(this.selectedEmpleadoId);
        },
        (error) => {
          console.error('Error fetching empleados', error);
        }
      );
    } else {
      this.empleados = [];
    }
  }

  onEmpleadoChange(event: any): void {
    const empleadoId = event.target.value;
    this.selectedEmpleadoId = empleadoId ? Number(empleadoId): null;  // Convertir el valor a número o null si está vacío
    console.log('Empleado seleccionado (ID):', this.selectedEmpleadoId);
  }
  
  

  onLogin(): void {
    const empleadoSeleccionado = this.empleados.find(empleado => empleado.ID_Empleado === this.selectedEmpleadoId);
    console.log('Empleado seleccionado:', empleadoSeleccionado);
    
    if (empleadoSeleccionado) {
//      this.authService.setEmpleado({
//        idEmpleado: empleadoSeleccionado.ID_Empleado,
//        nombreEmpleado: `${empleadoSeleccionado.Nombre} ${empleadoSeleccionado.Apellido}`,
//        idDistrito: this.selectedDistrito
//      });
//      // Verificar que el empleado se haya guardado correctamente
//      console.log('Empleado guardado en AuthService:', this.authService.getEmpleado());
      
      // Redirige a la página con la tabla de datos
      console.log('Redirigiendo a /identificar/data...');
      this.router.navigate(['data']);
    } else {
      console.log('No se pudo seleccionar el empleado.');
    }
    
  }
}  