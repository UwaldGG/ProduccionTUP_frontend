import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { MatButtonModule } from '@angular/material/button'; // Importa MatButtonModule
import { MatDialogModule } from '@angular/material/dialog'; // Importa MatDialogModule

@Component({
  selector: 'app-success-modal',
  standalone: true,
  imports: [
    CommonModule, // Asegúrate de incluir CommonModule
    MatButtonModule, // Incluye MatButtonModule aquí
    MatDialogModule, // Incluye MatDialogModule aquí
  ],
  template: `
    <h2 mat-dialog-title>Éxito</h2>
    <mat-dialog-content>
      <p>Ha iniciado sesión correctamente.</p>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="onClose()">Cerrar</button>
    </mat-dialog-actions>
  `,
})
export class SuccessModalComponent {
  constructor(private dialogRef: MatDialogRef<SuccessModalComponent>) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
