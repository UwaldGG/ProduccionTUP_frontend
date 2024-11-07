import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ConsolidadosService } from '../../../services/consolidados/consolidados.service';
import { DatosTareaEmpleado, Distrito } from '../../../interfaces/model';
import { TareasService } from '../../../services/tareas/tareas.service';
import { ActivatedRoute } from '@angular/router';
import { DistritosService } from '../../../services/distritos/distritos.service';
import { ConfigService } from '../../../services/config/config.service';
import * as ExcelJS from 'exceljs';
import { ConfirmDialogsComponent } from '../../dialogs/confirm/confirm-dialogs/confirm-dialogs.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router'

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
  anios: number[] = [];
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
    private distritosService: DistritosService,
    private configService: ConfigService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.anios = this.configService.anios;
    this.cargarDistritos();
  }

  cargarDistritos(): void {
    this.distritosService.getDistritos().subscribe(
      (response: Distrito[]) => {
        this.distritos = response;
      },
      (error) => {
        console.error('Error al cargar distritos:', error);
      }
    );
  }

  onAnioSeleccionado() {
    this.distritoSeleccionado = 0;
    this.tareas = [];
    this.dataSource.data = [];
    if (this.anioSeleccionado && this.distritoSeleccionado) {
      this.obtenerConsolidadoPorDistrito(this.distritoSeleccionado, this.anioSeleccionado);
    }
  }

  onDistritoSeleccionado() {
    if (this.distritoSeleccionado > 0 && this.anioSeleccionado) {
      this.obtenerConsolidadoPorDistrito(this.distritoSeleccionado, this.anioSeleccionado);
    }
  }

  private obtenerConsolidadoPorDistrito(distritoId: number, anio: number): void {
    this.tareasService.getTareas().subscribe((todasLasTareas: Tarea[]) => {
      this.tareas = todasLasTareas;
      this.consolidadosService.obtenerConsolidado(distritoId, anio).subscribe((datosTareasEmpleado: DatosTareaEmpleado[]) => {
        this.tareas = this.formatearTareasParaTabla(this.tareas, datosTareasEmpleado);
        this.dataSource.data = this.tareas;
      });
    });
  }

  formatearTareasParaTabla(tareas: Tarea[], datosDistritos: DatosTareaEmpleado[]): Tarea[] {
    return tareas.map(tarea => {
      const datosTarea = datosDistritos.filter(dato => dato.fk_tarea === tarea.ID_Tarea);
      const valoresMeses: { [key: string]: number } = {};

      if (datosTarea.length > 0) {
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

  exportarAExcel() {
    // Obtener el nombre del distrito seleccionado
    const distrito = this.distritos.find(d => d.ID_Distrito.toString() === this.distritoSeleccionado.toString());
    const nombreDistrito = distrito ? distrito.NombreDistrito : 'Distrito no encontrado';    

    const dialogRef = this.dialog.open(ConfirmDialogsComponent, {
      data: {
        title: 'Confirmar Exportación',
        message: `¿Desea exportar el consolidado a Excel para el distrito ${nombreDistrito} en el año ${this.anioSeleccionado}?`,
      },
    });
    
    dialogRef.afterClosed().subscribe((result) => {
      if(result) {
        // Crear un nuevo libro de trabajo
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Consolidado');
  
        // Definir el título y la información del período
        const titulo = 'CONSOLIDADO GENERAL TUP POR DISTRITO';
        const periodo = `Producción de Enero a Diciembre del ${this.anioSeleccionado}`;
  
        // Agregar el título y la información del período
        worksheet.addRow([titulo]).font = { bold: true, size: 16 }; // Título en negrita y tamaño 16
        worksheet.mergeCells('A1:O1'); // Combinar celdas del título
        worksheet.getCell('A1').alignment = { horizontal: 'center' };
  
        worksheet.addRow([periodo]).font = { italic: true }; // Información del período en cursiva
        worksheet.mergeCells('A2:O2'); // Combinar celdas del periodo
        worksheet.getCell('A2').alignment = { horizontal: 'center' };
  
        // Agregar una fila vacía para separar los encabezados
        worksheet.addRow([]);
  

        // Agregar la fila del nombre del distrito
        worksheet.addRow([`Distrito: ${nombreDistrito}`]).font = { bold: true };
        worksheet.mergeCells('A4:O4'); // Combinar celdas para el nombre del distrito
        worksheet.getCell('A4').alignment = { horizontal: 'center' };
  
        // Agregar los encabezados de la tabla
        worksheet.addRow([]);
        worksheet.addRow(['No.', 'Actividades Realizadas', ...this.meses, 'Total']);
    
        // Estilo para los encabezados
        const headerRow = worksheet.getRow(6); // Asumiendo que los encabezados están en la fila 6
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
        a.download = `Consolidado_${this.anioSeleccionado}_${nombreDistrito}.xlsx`;
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

