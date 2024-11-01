import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ConsolidadosService } from '../../../services/consolidados/consolidados.service';
import { DatosTareaEmpleado, Distrito } from '../../../interfaces/model';
import { TareasService } from '../../../services/tareas/tareas.service';
import { ActivatedRoute } from '@angular/router';
import { DistritosService } from '../../../services/distritos/distritos.service';

interface Tarea {
  ID_Tarea: number;
  Descripcion: string;
  valoresMeses: { [key: string]: number }; // Los meses se representan como claves de string
}

@Component({
  selector: 'app-por-distrito',
  standalone: true,
  imports: [FormsModule, CommonModule, MatTableModule],
  templateUrl: './por-distrito.component.html',
  styleUrl: './por-distrito.component.css'
})
export class PorDistritoComponent implements OnInit {
  anios: number[] = [2024, 2025];
  distritos: Distrito[] = [];
  datosDistritos: DatosTareaEmpleado[] = [];
  anioSeleccionado: number | null = null;
  distritoSeleccionado: number = 0;
  tareas: Tarea[] = [];
  meses: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  displayedColumns: string[] = ['numero', 'tarea', ...this.meses, 'Total'];
  dataSource = new MatTableDataSource<Tarea>();

  constructor(
    private consolidadosService: ConsolidadosService,
    private tareasService: TareasService,
    private distritosService: DistritosService
  ) {}

  ngOnInit() {
    this.cargarDistritos();
  }

  cargarDistritos(): void {
    this.distritosService.getDistritos().subscribe(
      (response: Distrito[]) => {
        this.distritos = response;
        console.log('Distritos cargados:', this.distritos);
      },
      (error) => {
        console.error('Error al cargar distritos:', error);
      }
    );
  }

  onAnioSeleccionado() {
    console.log('Año seleccionado: ', this.anioSeleccionado);
    this.distritoSeleccionado = 0;
    this.tareas = [];
    this.dataSource.data = [];
    if (this.anioSeleccionado && this.distritoSeleccionado) {
      this.obtenerConsolidadoPorDistrito(this.distritoSeleccionado, this.anioSeleccionado);
    }
  }

  onDistritoSeleccionado() {
    console.log("Distrito seleccionado", this.distritoSeleccionado);
    if (this.distritoSeleccionado > 0 && this.anioSeleccionado) {
      this.obtenerConsolidadoPorDistrito(this.distritoSeleccionado, this.anioSeleccionado);
    }
  }

  private obtenerConsolidadoPorDistrito(distritoId: number, anio: number): void {
    this.tareasService.getTareas().subscribe((todasLasTareas: Tarea[]) => {
      this.tareas = todasLasTareas;
      this.consolidadosService.obtenerConsolidado(distritoId, anio).subscribe((datosTareasEmpleado: DatosTareaEmpleado[]) => {
        console.log('Datos de tareas por distrito', datosTareasEmpleado);
        this.tareas = this.formatearTareasParaTabla(this.tareas, datosTareasEmpleado);
        this.dataSource.data = this.tareas;
        console.log('Datos asignados al dataSource', this.dataSource.data);
      });
    });
  }

  formatearTareasParaTabla(tareas: Tarea[], datosDistritos: DatosTareaEmpleado[]): Tarea[] {
    return tareas.map(tarea => {
      const datosTarea = datosDistritos.filter(dato => dato.fk_tarea === tarea.ID_Tarea);
      const valoresMeses: { [key: string]: number } = {};

      if (datosTarea.length > 0) {
        console.log(`Datos para la tarea ${tarea.Descripcion}:`, datosTarea);
        datosTarea.forEach(dato => {
          const mesNombre = this.mapearNumeroAMes(dato.mes);
          valoresMeses[mesNombre] = dato.total;
        });
      } else {
        console.log(`No se encontraron datos para la tarea ${tarea.Descripcion}`);
      }

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

