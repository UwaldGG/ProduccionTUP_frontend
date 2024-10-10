import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { EmpleadosService } from '../../../../../services/Empleados/empleados.service';  // Servicio para cargar empleados
import { DistritosService } from '../../../../../services/distritos/distritos.service';  // Servicio para cargar distritos
import { TareasService } from '../../../../../services/tareas/tareas.service';  // Servicio para cargar tareas
import { AuthService } from '../../../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';



@Component({
  selector: 'app-data',
  standalone: true,
  imports: [FormsModule, 
            CommonModule,
            MatTableModule,
            MatPaginatorModule,
            MatSortModule,
            MatIconModule,
            MatButtonModule],
  templateUrl: './data.component.html',
  styleUrl: './data.component.css',
})

export class DataComponent implements OnInit {
  empleado: any; // Datos del empleado
  distrito: any; // Datos del distrito
  dataSource = new MatTableDataSource<any>(); // Datos para la tabla
  meses: string[] = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  displayedColumns: string[] = ['numero', 'tarea', ...this.meses]; // Columnas para mostrar

  constructor(
    private empleadosService: EmpleadosService,
    private distritosService: DistritosService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    const empleadoId: string = this.route.snapshot.paramMap.get('ID_Empleado') || '';
    this.empleadosService.getEmpleado(empleadoId).subscribe(empleado => {
    this.empleado = empleado;
    });


    const distritoId: string = this.route.snapshot.paramMap.get('ID_Distrito') || '';
    this.distritosService.getDistrito(distritoId).subscribe(distrito => {
    this.distrito = distrito;
    });


    // Obtener datos del empleado y del distrito
    this.empleadosService.getEmpleado(empleadoId).subscribe((empleadoData) => {
      this.empleado = empleadoData;
    });

    this.distritosService.getDistrito(distritoId).subscribe((distritoData) => {
      this.distrito = distritoData;
    });

    // Obtener valores de las tareas del empleado para la tabla
    this.empleadosService.getTareasEmpleado(empleadoId).subscribe((tareas) => {
      const tareasConValores = tareas.map((tarea: any) => ({
        tareaNombre: tarea.Descripcion,
        tareaNumero: tarea.ID_Tarea,
        valoresMeses: {
          enero: tarea.enero,
          febrero: tarea.febrero,
          // Repite para todos los meses
        },
      }));
      this.dataSource.data = tareasConValores;
    });
  }
}
