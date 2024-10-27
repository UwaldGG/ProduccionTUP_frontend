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
  distrito: any;
  empleados: Empleado[] = [];
  tareas: Tarea[] = [];
  datosTareasEmpleados: DatosTareaEmpleado[] = [];
  dataSource = new MatTableDataSource<Tarea>();
  meses: string[] = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
  displayedColumns: string[] = ['numero', 'tarea', ...this.meses];
  columnasEditables: boolean[] = Array(12).fill(false);

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
    if (this.empleadoSeleccionado > 0) {
      this.tareasService.getTareas().subscribe((todasLasTareas) => {
        this.tareas = todasLasTareas;
        this.tareasService.getTareasPorEmpleado(this.empleadoSeleccionado).subscribe((datosTareasEmpleado: DatosTareaEmpleado[]) => {
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
  
  guardarDato(fk_tarea: number, mes: string): void {
    const cantidad = this.tareas.find(tarea => tarea.ID_Tarea === fk_tarea)?.valoresMeses[mes];
  
    if (cantidad !== undefined) {
      const datosAEnviar: DatoActualizar = {
        fk_tarea,
        mes: +mes,  // Asegúrate de convertir `mes` a número
        cantidad,
      };
  
      this.dataService.actualizarDatos2(datosAEnviar).subscribe(
        response => {
          console.log('Datos actualizados:', response);
          // Deshabilitar la edición después de guardar
          this.columnasEditables = Array(12).fill(false); // Deshabilitar todas las columnas
          alert('Datos guardados exitosamente');
        },
        error => {
          console.error('Error al actualizar el dato:', error);
        }
      );
    }
  }

  guardarDatosPorMes(mes: string): void {
    // Accede a los datos del dataSource
    const tareas = this.dataSource.data; // Aquí obtienes el array de datos
  
    tareas.forEach((tarea: any) => { // Asegúrate de definir el tipo adecuado
      const cantidad = tarea.valoresMeses[mes];
      
      const datosAEnviar = {
        fk_tarea: tarea.ID_Tarea,
        mes: +mes,  // Asegúrate de que 'mes' sea un número
        cantidad,
      };
  
      this.dataService.actualizarDatos2(datosAEnviar).subscribe(
        response => {
          console.log('Datos actualizados:', response);
        },
        error => {
          console.error('Error al actualizar el dato:', error);
          alert('Hubo un error al guardar los datos. Inténtelo de nuevo.');
        }
      );
    });
    
    // Deshabilitar la edición después de guardar
    this.columnasEditables[this.meses.indexOf(mes)] = false;
  }

  
    
}
