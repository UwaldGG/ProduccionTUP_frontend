import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmpleadosService } from '../../../../../services/Empleados/empleados.service';
import { DistritosService } from '../../../../../services/distritos/distritos.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-data',
  standalone: true,
  imports: [FormsModule, CommonModule, MatTableModule],
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css'],
})

export class DataComponent implements OnInit {
  empleadoSeleccionado: number = 0; // Inicialización
  distrito: any;
  empleados: any[] = [];
  tareas: any[] = []; // Lista de tareas
  dataSource = new MatTableDataSource<any>();
  meses: string[] = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
  displayedColumns: string[] = ['numero', 'tarea', ...this.meses];

  constructor(
    private empleadosService: EmpleadosService,
    private distritosService: DistritosService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const distritoId: string = this.route.snapshot.paramMap.get('id') || '';
    const distritoIdNumber = Number(distritoId);
  
    if (!isNaN(distritoIdNumber)) {
      this.distritosService.getDistrito(distritoId).subscribe((distritoData) => {
        this.distrito = distritoData;
      });
  
      this.empleadosService.getEmpleadosPorDistrito2(distritoIdNumber).subscribe((empleados) => {
        this.empleados = empleados;
      });
    }
  }

  onEmpleadoSeleccionado(): void {
    if (this.empleadoSeleccionado > 0) {
      // Obtener las tareas para el empleado seleccionado
      this.empleadosService.getTareasPorEmpleado(this.empleadoSeleccionado).subscribe((tareas) => {
        this.tareas = tareas;
        this.dataSource.data = this.formatearTareasParaTabla(tareas);
      });
    }
  }

  formatearTareasParaTabla(tareas: any[]): any[] {
    // Formatear las tareas para que se ajusten a la tabla, incluyendo los valores de cada mes
    return tareas.map((tarea: any) => {
      return {
        tareaNumero: tarea.numero,
        tareaNombre: tarea.nombre,
        valoresMeses: {
          ENE: tarea.ENE,
          FEB: tarea.FEB,
          MAR: tarea.MAR,
          ABR: tarea.ABR,
          MAY: tarea.MAY,
          JUN: tarea.JUN,
          JUL: tarea.JUL,
          AGO: tarea.AGO,
          SEP: tarea.SEP,
          OCT: tarea.OCT,
          NOV: tarea.NOV,
          DIC: tarea.DIC,
        },
      };
    });
  }
}
