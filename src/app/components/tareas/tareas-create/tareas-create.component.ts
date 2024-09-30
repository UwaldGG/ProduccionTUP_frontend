import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TareasService } from '../../../services/tareas/tareas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tareas-create',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './tareas-create.component.html',
  styleUrl: './tareas-create.component.css'
})
export class TareasCreateComponent {
  newTarea: any = {
    Numero: '',
    Nombre: ''
  };

  constructor(private tareasService: TareasService, private router: Router) {}

  createTarea(): void {
    this.tareasService.createTarea(this.newTarea).subscribe(
      () => {
        this.router.navigate(['/tareas/list']);
      },
      (error) => {
        console.error('Error creating tarea', error);
      }
    );
  }
}
