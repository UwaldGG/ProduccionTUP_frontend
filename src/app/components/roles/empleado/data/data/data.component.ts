import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmpleadosService } from '../../../../../services/Empleados/empleados.service';
import { DistritosService } from '../../../../../services/distritos/distritos.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { TareasService } from '../../../../../services/tareas/tareas.service';
import { DataService } from '../../../../../services/data/data.service';
import { DatoActualizar, DatosTareaEmpleado, Empleado } from '../../../../../interfaces/model';

// Interfaz para definir la estructura de las tareas
interface Tarea {
  ID_Tarea: number;
  Descripcion: string;
  valoresMeses: { [key: string]: number }; // Los meses se representan como claves de string
}

@Component({
  selector: 'app-data',
  standalone: true,
  imports: [FormsModule, CommonModule, MatTableModule],
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css'],
})
export class DataComponent implements OnInit {
  empleadoSeleccionado: number = 0;
  anioSeleccionado: number | null = null;
  distrito: any;
  empleados: Empleado[] = [];
  tareas: Tarea[] = [];
  datosTareasEmpleados: DatosTareaEmpleado[] = [];
  dataSource = new MatTableDataSource<Tarea>();
  meses: string[] = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
  displayedColumns: string[] = ['numero', 'tarea', ...this.meses];
  columnasEditables: boolean[] = Array(12).fill(false);
  distritoid2: number = 0;
  empleadoid2: number = 0;


  anios: number[] = []; // Lista para almacenar los años

  constructor(
    private empleadosService: EmpleadosService,
    private distritosService: DistritosService,
    private route: ActivatedRoute,
    private tareasService: TareasService,
    private dataService: DataService,
  ) {}

  ngOnInit(): void {
    const distritoId: string = this.route.snapshot.paramMap.get('id') || '';
    const distritoIdNumber = Number(distritoId);
    this.distritoid2 = distritoIdNumber;
    console.log(distritoIdNumber);

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
    // Reiniciar las columnas editables al seleccionar un nuevo empleado
    this.columnasEditables = Array(12).fill(false);
  
    if (this.empleadoSeleccionado > 0) {
      this.tareasService.getTareas().subscribe((todasLasTareas) => {
        this.tareas = todasLasTareas;
        this.tareasService.getTareasPorEmpleado(this.empleadoSeleccionado).subscribe((datosTareasEmpleado: DatosTareaEmpleado[]) => {
          this.empleadoid2 = this.empleadoSeleccionado;
          console.log(this.empleadoSeleccionado);
          console.log('datosTareasEmpleados', datosTareasEmpleado);
          this.tareas = this.formatearTareasParaTabla(this.tareas, datosTareasEmpleado);
          console.log('Tareas después de formatear:', this.tareas);
          this.dataSource.data = this.tareas;  // Asignación correcta
          console.log('Tareas asignadas al dataSource:', this.dataSource.data);
        });
      });
    }
  }
  


  formatearTareasParaTabla(tareas: Tarea[], datosTareasEmpleado: DatosTareaEmpleado[]): Tarea[] {
    return tareas.map(tarea => {
      // Filtra los datos de la tarea correspondiente
      const datosTarea = datosTareasEmpleado.find(dato => dato.tareaId === tarea.ID_Tarea);
  
      // Crear un objeto con los valores de los meses
      const valoresMeses: { [key: string]: number } = {};
  
      if (datosTarea) {
        console.log(`Datos para la tarea ${tarea.Descripcion}:`, datosTarea);
        
        // Asegúrate de que los meses se están mapeando correctamente
        Object.keys(datosTarea.valoresMeses).forEach(mesNumero => {
          const mesNombre = this.mapearNumeroAMes(Number(mesNumero));
          valoresMeses[mesNombre] = datosTarea.valoresMeses[mesNumero]; // Asegúrate de que esta línea está correctamente asignando el valor
        });
      } else {
        console.log(`No se encontraron datos para la tarea ${tarea.Descripcion}`);
      }
  
      return {
        ...tarea,
        valoresMeses: valoresMeses // Asegúrate de que se está asignando correctamente
      };
    });
  }

  
  // Función para mapear número de mes a nombre
  private mapearNumeroAMes(mesNumero: number): string {
    const meses = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
    return meses[mesNumero - 1] || ''; // Restamos 1 porque los meses están indexados desde 0
  }
  
  
  habilitarEdicion(indiceMes: number): void {
    this.columnasEditables = this.columnasEditables.map((_, i) => i === indiceMes);
  }
  


  guardarDatosPorMes(mes: string): void {
    // Validar que todos los campos de tareas tengan un valor numérico
    const tareasSinDatos = this.dataSource.data.filter(tarea => 
      tarea.valoresMeses[mes] === null || 
      tarea.valoresMeses[mes] === undefined || 
      isNaN(tarea.valoresMeses[mes])
    );
  
    if (tareasSinDatos.length > 0) {
      alert('Por favor, completa todos los campos con datos numéricos antes de guardar.');
      return; // Detener la ejecución si hay campos vacíos
    }
  
    const datosAEnviar: DatoActualizar[] = this.dataSource.data.map((tarea: Tarea) => ({
      fk_distrito: this.distritoid2,
      fk_empleado: this.empleadoSeleccionado,
      fk_tarea: tarea.ID_Tarea,
      mes: this.meses.indexOf(mes) + 1,
      cantidad: tarea.valoresMeses[mes]
    }));
  
    this.dataService.actualizarDatos2(datosAEnviar).subscribe(
      response => {
        console.log(`Datos actualizados para ${mes}:`, response);
        alert(`Datos de ${mes} guardados exitosamente`);
      },
      error => {
        console.error(`Error al actualizar los datos para ${mes}:`, error);
        alert(`Hubo un error al guardar los datos para ${mes}. Inténtelo de nuevo.`);
      }
    );
  
    // Deshabilitar la edición después de guardar
    this.columnasEditables[this.meses.indexOf(mes)] = false;
  }
  
  
  
  
    
}
