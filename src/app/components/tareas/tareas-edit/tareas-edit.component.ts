import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TareasService } from '../../../services/tareas/tareas.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-tareas-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './tareas-edit.component.html',
  styleUrl: './tareas-edit.component.css'
})
export class TareasEditComponent implements OnInit {
  tarea: any;

  constructor(
    private tareasService: TareasService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.tarea = {
      ID_Tareas: null,
      Nombre: ''
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
    this.tareasService.updateTarea(this.tarea.ID_Tareas, this.tarea).subscribe(
      () => {
        this.router.navigate(['/tareas/list']); // Redirigir a la lista de distritos
      },
      (error) => {
        console.error('Error updating tarea:', error);
      }
    );
  }


}
