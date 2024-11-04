import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DatosTareaEmpleado, Distrito } from '../../../interfaces/model';
import { ConsolidadosService } from '../../../services/consolidados/consolidados.service';
import { DistritosService } from '../../../services/distritos/distritos.service';
import { TareasService } from '../../../services/tareas/tareas.service';

interface Tarea {
  ID_Tarea: number;
  Descripcion: string;
  valoresMeses: { [key: string]: number }; // Los meses se representan como claves de string
}


@Component({
  selector: 'app-year',
  standalone: true,
  imports: [FormsModule, CommonModule, MatTableModule],
  templateUrl: './year.component.html',
  styleUrl: './year.component.css'
})
export class YearComponent implements OnInit {
  anios: number[] = [2024, 2025];
  anioSeleccionado: number | null = null;
  tareas: Tarea[] = [];
  meses: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  displayedColumns: string[] = ['numero', 'tarea', ...this.meses, 'Total'];
  dataSource = new MatTableDataSource<Tarea>();

  constructor(
    private consolidadosService: ConsolidadosService,
    private tareasService: TareasService
  ) {}

  ngOnInit() {
    // Cargar cualquier configuración inicial aquí
  }

  onAnioSeleccionado() {
    console.log('Año seleccionado:', this.anioSeleccionado);
    if (this.anioSeleccionado) {
      this.obtenerConsolidadoPorAnio(this.anioSeleccionado);
    }
  }

  private obtenerConsolidadoPorAnio(anio: number): void {
    this.tareasService.getTareas().subscribe((todasLasTareas: Tarea[]) => {
      this.tareas = todasLasTareas;
      this.consolidadosService.obtenerConsolidadoPorAnio(anio).subscribe((datosTareasEmpleado: DatosTareaEmpleado[]) => {
        console.log('Datos de tareas por año:', datosTareasEmpleado);
        this.tareas = this.formatearTareasParaTabla(this.tareas, datosTareasEmpleado);
        this.dataSource.data = this.tareas;
        console.log('Datos asignados al dataSource:', this.dataSource.data);
      });
    });
  }

  formatearTareasParaTabla(tareas: Tarea[], datosDistritos: DatosTareaEmpleado[]): Tarea[] {
    return tareas.map(tarea => {
      const datosTarea = datosDistritos.filter(dato => dato.fk_tarea === tarea.ID_Tarea);
      const valoresMeses: { [key: string]: number } = {};

      datosTarea.forEach(dato => {
        const mesNombre = this.mapearNumeroAMes(dato.mes);
        valoresMeses[mesNombre] = dato.total;
      });

      return {
        ...tarea,
        valoresMeses: valoresMeses
      };
    });
  }

  private mapearNumeroAMes(mesNumero: number): string {
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return meses[mesNumero - 1] || '';
  }

  calcularTotal(valoresMeses: { [key: string]: number }): number {
    return this.meses.reduce((total, mes) => total + (Number(valoresMeses[mes]) || 0), 0);
  }  
}
