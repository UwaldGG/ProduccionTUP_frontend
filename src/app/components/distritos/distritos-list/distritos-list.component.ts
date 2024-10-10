import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DistritosService } from '../../../services/distritos/distritos.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FilterDistritoPipe } from '../../../pipes/distrito/filter-distrito.pipe';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogsComponent } from '../../../components/dialogs/confirm/confirm-dialogs/confirm-dialogs.component'; // Importar el componente de diálogo
import { MatSnackBar } from '@angular/material/snack-bar'; // Importa MatSnackBar


@Component({
  selector: 'app-distritos-list',
  templateUrl: './distritos-list.component.html',
  styleUrls: ['./distritos-list.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, FilterDistritoPipe],
})
export class DistritosListComponent implements OnInit {
  distritos: any[] = [];
  searchText: string = '';  // Añadir el texto de búsqueda
  showPasswords: { [key: number]: boolean } = {}; // Controla si la contraseña es visible para cada distrito

  constructor(
    private distritosService: DistritosService,
    private router: Router,
    private dialog: MatDialog, // Inyectar el servicio de diálogo
    private snackBar: MatSnackBar // Inyecta MatSnackBar
  
  ) {}

  ngOnInit(): void {
    this.getDistritos();
  }

  getDistritos(): void {
    this.distritosService.getDistritos().subscribe(
      (data) => {
        this.distritos = data;
      },
      (error) => {
        console.error('Error fetching distritos: ', error);
      }
    );
  }

  togglePasswordVisibility(distritoId: number): void {
    this.showPasswords[distritoId] = !this.showPasswords[distritoId];
  }

  editDistrito(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogsComponent, {
      data: {
        title: 'Confirmar Edición',
        message: `¿Está seguro de que desea editar el distrito?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.router.navigate(['/admin-panel/distritos/edit', id]);
      }
    });
  }

  createDistrito(): void {
    this.router.navigate(['/admin-panel/distritos/create']);
  }

  deleteDistrito(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogsComponent, {
      data: {
        title: 'Confirmar Eliminación',
        message: `¿Está seguro de que desea eliminar el distrito?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.distritosService.deleteDistrito(id).subscribe(
          () => {
            this.getDistritos();
            this.snackBar.open('Distrito eliminado con éxito', 'Cerrar', {
              duration: 3000,  // Duración del mensaje en milisegundos
              verticalPosition: 'bottom', // Posición vertical
              horizontalPosition: 'center', // Posición horizontal
            });
          },
          (error) => {
            console.error('Error deleting distrito: ', error);
            this.snackBar.open('Error al eliminar el distrito', 'Cerrar', {
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

