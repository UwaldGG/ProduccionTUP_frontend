import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DistritosService } from '../../../../../services/distritos/distritos.service'; 
import { TareasService } from '../../../../../services/tareas/tareas.service'; 
import { EmpleadosService } from '../../../../../services/Empleados/empleados.service'; 

@Component({
  selector: 'app-panel',
  standalone: true,
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css'
})
export class PanelComponent implements OnInit {
  totalDistritos: number = 0;
  totalTareas: number = 0;
  totalEmpleados: number = 0;
  
  constructor(
    private distritosService: DistritosService,
    private tareasService: TareasService,
    private empleadosService: EmpleadosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.distritosService.getTotalDistritos().subscribe(
      (data: number) => {
        this.totalDistritos = data;
      },
      (error) => {
        console.error('Error fetching distritos:', error);
      }
    );

    this.tareasService.getTotalTareas().subscribe(
      (data: number) => {
        this.totalTareas = data;
      },
      (error) => {
        console.error('Error fetching tareas:', error);
      }
    );

    this.empleadosService.getTotalEmpleados().subscribe(
      (data: number) => {
        this.totalEmpleados = data;
      },
      (error) => {
        console.error('Error fetching empleados:', error);
      }
    );
  }

  // Métodos específicos para cada acción
  goToDistritosList(): void {
    this.router.navigate(['/admin-panel/distritos/list']);
  }

  goToDistritosCreate(): void {
    this.router.navigate(['/admin-panel/distritos/create']);
  }

  goToDistritosEdit(): void {
    this.router.navigate(['/admin-panel/distritos/edit']);
  }

  goToTareasList(): void {
    this.router.navigate(['/admin-panel/tareas/list']);
  }

  goToTareasCreate(): void {
    this.router.navigate(['/admin-panel/tareas/create']);
  }

  goToTareasEdit(): void {
    this.router.navigate(['/admin-panel/tareas/edit']);
  }

  goToEmpleadosList(): void {
    this.router.navigate(['/admin-panel/empleados/list']);
  }

  goToEmpleadosCreate(): void {
    this.router.navigate(['/admin-panel/empleados/create']);
  }

  goToEmpleadosEdit(): void {
    this.router.navigate(['/admin-panel/empleados/edit']);
  }
}
