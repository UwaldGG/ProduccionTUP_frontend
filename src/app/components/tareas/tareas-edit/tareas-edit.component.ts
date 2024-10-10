import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TareasService } from '../../../services/tareas/tareas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-tareas-edit',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './tareas-edit.component.html',
  styleUrl: './tareas-edit.component.css'
})
export class TareasEditComponent implements OnInit {
  tarea: any;

  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private tareasService: TareasService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.tarea = {
      ID_Tarea: null,
      Descripcion: ''
    };
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.getTarea(id);
  }

  getTarea(id: number): void {
    this.tareasService.getTareaById(id).subscribe(
      (data) => {
        this.tarea = data;
      },
      (error) => {
        console.error('Error fetching tarea:', error);
      }
    );
  }

  updateTarea(): void {
    if (!this.tarea.Descripcion.trim()) {
      this.errorMessage = 'La descripción es obligatorio.'; // Mensaje de error
      return; // No continuar si la descripción está vacío
    }

    this.tareasService.updateTarea(this.tarea.ID_Tarea, this.tarea).subscribe(
      () => {
        this.successMessage = '¡La tarea ha sido actualizado con éxito!';
        setTimeout(() => {
          this.successMessage = '';
          this.router.navigate(['/admin-panel/tareas/list'], { replaceUrl: true }); // Redirigir a la lista de tareas
        }, 2000);
      },
      (error) => {
        console.error('Error updating tarea:', error);
        this.errorMessage = 'Error al actualizar la tarea. Inténtalo de nuevo.';
      }
    );
  }
}
