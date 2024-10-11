import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpleadosService } from '../../../services/Empleados/empleados.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FilterEmpleadoPipe } from '../../../pipes/empleado/filter-empleado.pipe';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogsComponent } from '../../dialogs/confirm/confirm-dialogs/confirm-dialogs.component';



@Component({
  selector: 'app-empleados-list',
  standalone: true,
  imports: [CommonModule, FormsModule, FilterEmpleadoPipe],
  templateUrl: './empleados-list.component.html',
  styleUrl: './empleados-list.component.css'
})
export class EmpleadosListComponent implements OnInit {
  empleados: any[] = [];
  searchText: string = '';

  constructor(
    private empleadosService: EmpleadosService, 
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    //this.getEmpleados();
    this.getEmpleadosWithDistritos();
  }

  getEmpleados(): void {
    this.empleadosService.getEmpleados().subscribe(
      (data) => {
        this.empleados = data;
      },
      (error) => {
        console.error('Error fetching empleados', error);
      }
    )
  }

  editEmpleado(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogsComponent, {
      data: {
        title: 'Confirmar Edición',
        message: `¿Está seguro de que desea editar el empleado?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.router.navigate(['/admin-panel/empleados/edit', id]);
      }
    });
  }

  createEmpleado(): void {
    this.router.navigate(['/admin-panel/empleados/create']);
  }

  deleteEmpleado(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogsComponent, {
      data: {
        title: 'Confirmar Eliminación',
        message: `¿Está seguro de que desea eliminar el distrito?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.empleadosService.deleteEmpleados(id).subscribe(
          () => {
            this.getEmpleadosWithDistritos();
            this.snackBar.open('Empleado eliminado con éxito', 'Cerrar', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'center',
            });
          },
          (error) => {
            console.error('Error deleting empleado', error);
            this.snackBar.open('Error al eliminar el empleado', 'Cerrar', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'center',
            });
          }
        );
      }
    });
  }

  getEmpleadosWithDistritos(): void {
    this.empleadosService.getEmpleadosWithDistritos().subscribe(
      (data: any[]) => {
        this.empleados = data;  // Asignar directamente los empleados con distritos
      },
      (error) => {
        console.error('Error fetching empleados', error);
      }
    );
  }
  
  goToMainPanel(): void {
    this.router.navigate(['/admin-panel'], {replaceUrl: true}); // Ajusta la ruta según tu estructura de rutas
  }
  
}