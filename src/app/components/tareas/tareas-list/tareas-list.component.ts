import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TareasService } from '../../../services/tareas/tareas.service';
import { Router } from '@angular/router';
import { FiltroTareaPipe } from '../../../pipes/tarea/filter-tarea.pipe';  // Importar el pipe
import { ConfirmDialogsComponent } from '../../dialogs/confirm/confirm-dialogs/confirm-dialogs.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-tareas-list',
  standalone: true,
  imports: [CommonModule, FormsModule, FiltroTareaPipe],
  templateUrl: './tareas-list.component.html',
  styleUrl: './tareas-list.component.css'
})
export class TareasListComponent implements OnInit {
  tareas: any[] = [];
  searchTerm: string = '';  // Agregar la variable de búsqueda
  
  constructor(
    private tareasService: TareasService, 
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  
  ) {}

  ngOnInit(): void {
    this.getTareas();
  }

  getTareas(): void {
    this.tareasService.getTareas().subscribe(
      (data) => {
        this.tareas = data;
      },
      (error) => {
        console.error('Error fetching tareas: ', error);
      }
    );
  }

  editTarea(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogsComponent, {
      data: {
        title: 'Confirmar Edición',
        message: `¿Está seguro de que desea editar la tarea?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.router.navigate(['/admin-panel/tareas/edit', id]);
      }
    });
  }

  createTarea(): void {
    this.router.navigate(['/admin-panel/tareas/create']);
  }

  deleteTarea(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogsComponent, {
      data: {
        title: 'Confirmar Eliminación',
        message: `¿Está seguro de que desea eliminar la tarea?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.tareasService.deleteTarea(id).subscribe(
          () => {
            this.getTareas();
            this.snackBar.open('Tarea eliminado con éxito', 'Cerrar', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'center',
            });
          },
          (error) => {
            console.error('Error deleting tarea: ', error);
            this.snackBar.open('Error al eliminar la tarea', 'Cerrar', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'center',
            });
          }
        );
      }
    });
  }
}