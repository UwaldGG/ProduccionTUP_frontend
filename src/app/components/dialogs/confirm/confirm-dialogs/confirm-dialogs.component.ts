import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';


@Component({
  selector: 'app-confirm-dialogs',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './confirm-dialogs.component.html',
  styleUrl: './confirm-dialogs.component.css'
})
export class ConfirmDialogsComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string }
  ) {}

  onCancel(): void {
    this.dialogRef.close(false); // Cerrar diálogo y devolver false
  }

  onConfirm(): void {
    this.dialogRef.close(true); // Cerrar diálogo y devolver true
  }
}
