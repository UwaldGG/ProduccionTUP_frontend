import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { EmpleadosService } from '../../../../../services/Empleados/empleados.service';  // Servicio para cargar empleados
import { DistritosService } from '../../../../../services/distritos/distritos.service';  // Servicio para cargar distritos
import { TareasService } from '../../../../../services/tareas/tareas.service';  // Servicio para cargar tareas
import { AuthService } from '../../../../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-data',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './data.component.html',
  styleUrl: './data.component.css'
})

export class DataComponent implements OnInit {
  distritos: any[] = [];
  empleados: any[] = [];
  tareas: any[] = [];
  registros: any[] = [];
  meses: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    constructor(
      private empleadosService: EmpleadosService,
      private distritosService: DistritosService,
      private tareasService: TareasService,
      private authService: AuthService,
      private router: Router
    ) { }
  
    ngOnInit(): void {
      const empleado = this.authService.getEmpleado();
      if (empleado) {
        this.cargarDatosEmpleado(empleado.idEmpleado, empleado.idDistrito);
      }
    }
    
  
    cargarDistritos(): void {
      this.distritosService.getDistritos().subscribe((data: any) => {
        this.distritos = data;
      });
    }
  
    cargarEmpleados(): void {
      this.empleadosService.getEmpleados().subscribe((data: any) => {
        this.empleados = data;
      });
    }
  
    cargarTareas(): void {
      this.tareasService.getTareas().subscribe((data: any) => {
        this.tareas = data;
      });
    }
  
    cargarRegistros(): void {
        this.tareasService.getRegistros().subscribe((data: any) => {
          this.registros = data;
          // Procesar los registros si es necesario
          console.log("Registros cargados:", this.registros);
        }, error => {
          console.error("Error al cargar los registros", error);
        });
      }
        
    // Método para obtener el valor de la tarea para un empleado en un mes específico
    obtenerValorTarea(empleadoId: number, tareaId: number, mes: string): number {
      const registro = this.registros.find(reg => reg.empleadoId === empleadoId && reg.tareaId === tareaId && reg.mes === mes);
      return registro ? registro.valor : 0;  // Retorna el valor o 0 si no existe
    }


    cargarDatosEmpleado(empleadoId: number, distritoId: number): void {
      // Cargar los datos relacionados con este empleado y su distrito
      // Aquí puedes usar los servicios para obtener los registros que correspondan
    }
  }
  