import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TareasService } from '../../../services/tareas/tareas.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tareas-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tareas-list.component.html',
  styleUrl: './tareas-list.component.css'
})
export class TareasListComponent implements OnInit {
  tareas: any[] = [];
  
  constructor(private tareasService: TareasService, private router: Router) {}

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
    this.router.navigate(['/tareas/edit', id]);
  }

  createTarea(): void {
    this.router.navigate(['/tareas/create']);
  }

  deleteTarea(id: number): void {
    this.tareasService.deleteTarea(id).subscribe(
      () => {
        this.getTareas();
      },
      (error) => {
        console.error.apply('Error deleting tarea: ', error);
      }
    )
  }
  
}
