import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DatosTareaEmpleado, Distrito } from '../../../interfaces/model';
import { ConsolidadosService } from '../../../services/consolidados/consolidados.service';
import { DistritosService } from '../../../services/distritos/distritos.service';
import { TareasService } from '../../../services/tareas/tareas.service';
import { ConfigService } from '../../../services/config/config.service';
import * as ExcelJS from 'exceljs';
import { ConfirmDialogsComponent } from '../../dialogs/confirm/confirm-dialogs/confirm-dialogs.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';


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
  anios: number[] = [];
  anioSeleccionado: number | null = null;
  tareas: Tarea[] = [];
  meses: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  displayedColumns: string[] = ['numero', 'tarea', ...this.meses, 'Total'];
  dataSource = new MatTableDataSource<Tarea>();

  constructor(
    private consolidadosService: ConsolidadosService,
    private tareasService: TareasService,
    private configService: ConfigService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.anios = this.configService.anios;
  }

  onAnioSeleccionado() {
    if (this.anioSeleccionado) {
      this.obtenerConsolidadoPorAnio(this.anioSeleccionado);
    }
  }

  private obtenerConsolidadoPorAnio(anio: number): void {
    this.tareasService.getTareas().subscribe((todasLasTareas: Tarea[]) => {
      this.tareas = todasLasTareas;
      this.consolidadosService.obtenerConsolidadoPorAnio(anio).subscribe((datosTareasEmpleado: DatosTareaEmpleado[]) => {
        this.tareas = this.formatearTareasParaTabla(this.tareas, datosTareasEmpleado);
        this.dataSource.data = this.tareas;
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
  
  exportarAExcel() {
    const dialogRef = this.dialog.open(ConfirmDialogsComponent, {
      data: {
        title: 'Confirmar Exportación',
        message: `¿Desea exportar el consolidado general a Excel del año ${this.anioSeleccionado}?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result) {
        // Crear un nuevo libro de trabajo
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Consolidado');
  
        // Definir el título y la información del período
        const titulo = 'CONSOLIDADO GENERAL DE LOS DMS DONDE HAY TUP';
        const periodo = `Producción de Enero a Diciembre ${this.anioSeleccionado}`;
  
        // Agregar el título y la información del período
        worksheet.addRow([titulo]).font = { bold: true, size: 16 }; // Título en negrita y tamaño 16
        worksheet.mergeCells('A1:O1'); // Combinar celdas del título
        worksheet.getCell('A1').alignment = { horizontal: 'center' };
  
        worksheet.addRow([periodo]).font = { italic: true }; // Información del período en cursiva
        worksheet.mergeCells('A2:O2'); // Combinar celdas del periodo
        worksheet.getCell('A2').alignment = { horizontal: 'center' };
  
        // Agregar una fila vacía para separar los encabezados
        worksheet.addRow([]);
  
        // Agregar los encabezados de la tabla
        worksheet.addRow(['No.', 'Actividades Realizadas', ...this.meses, 'Total']);
    
        // Estilo para los encabezados
        const headerRow = worksheet.getRow(4); // Asumiendo que los encabezados están en la fila 4
        headerRow.font = { bold: true };
        headerRow.eachCell((cell) => {
          cell.alignment = { vertical: 'middle', horizontal: 'center' };
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFDCE6F1' } // Color de fondo
          };
        });
  
        // Ajuste de ancho de columnas
        worksheet.columns = [
          { width: 4 }, // No.
          { width: 50 }, // Actividades Realizadas
          ...this.meses.map(() => ({ width: 10 })), // Meses
          { width: 10 } // Total
        ];
  
        // Agregar los datos de las tareas
        this.tareas.forEach((tarea, index) => {
          const row = [
            index + 1,
            tarea.Descripcion,
            ...this.meses.map(mes => {
              const valor = tarea.valoresMeses?.[mes];
              // Validar si el valor es cero, un número o no existe
              if (valor === 0) {
                return 0; // Es un número, por lo que TypeScript debería permitirlo
              } else if (valor == null) {
                return '-'; // Es un string
              } else {
                return !isNaN(Number(valor)) ? Number(valor) : '-'; // Convertir a número si es posible
              }
            }),
            this.calcularTotal(tarea.valoresMeses),
          ];
          worksheet.addRow(row);
        });
    
        // Guardar el archivo como un archivo Excel
        workbook.xlsx.writeBuffer().then((data) => {
          const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `Consolidado_General_TUP_${this.anioSeleccionado}.xlsx`;
          a.click();
          window.URL.revokeObjectURL(url);
        });
        }
      });
    }

  regresarAlPanelPrincipal() {
    this.router.navigate(['/admin-panel']);
  }

}
