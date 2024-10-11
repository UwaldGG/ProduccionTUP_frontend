import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TareasService } from '../../../services/tareas/tareas.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tareas-create',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './tareas-create.component.html',
  styleUrl: './tareas-create.component.css'
})
export class TareasCreateComponent {
  newTarea: any = {
    Descripcion: ''
  };

  errorMessage: string = ''; // Mensaje de error
  successMessage: String = '';

  constructor(private tareasService: TareasService, private router: Router) {}

  createTarea(): void {
    if (!this.newTarea.Descripcion.trim()) {
      this.errorMessage = 'La descripción es obligatorio.'; // Mensaje de error
      setTimeout(() => {
        this.errorMessage = '';
      }, 2000);
      return; // No continuar si la descripción está vacío
    }

    this.tareasService.createTarea(this.newTarea).subscribe(
      () => {
        this.successMessage = '¡La nueva tarea ha sio creado con éxito!';
        this.newTarea = { Descripcion: '' };
        setTimeout(() => {
          this.successMessage = '';
          this.router.navigate(['/admin-panel/tareas/list'], { replaceUrl: true });
        }, 2000);
      },
      (error) => {
        this.errorMessage = 'Error al crear la nueva tarea. Inténtalo de nuevo.';
        console.error('Error creating tarea', error);
      }
    );
  }
}
