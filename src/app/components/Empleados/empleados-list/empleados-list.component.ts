import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpleadosService } from '../../../services/Empleados/empleados.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-empleados-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './empleados-list.component.html',
  styleUrl: './empleados-list.component.css'
})
export class EmpleadosListComponent implements OnInit {
  empleados: any[] = [];

  constructor(private empleadosService: EmpleadosService, private router: Router) {}

  ngOnInit(): void {
    this.getEmpleados();
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
    this.router.navigate(['/empleado/edit', id]);
  }

  createEmpleado(): void {
    this.router.navigate(['./empleados/create']);
  }

  deleteEmpleado(id: number): void {
    this.empleadosService.deleteEmpleados(id).subscribe(
      () => {
        this.getEmpleados();
      },
      (error) => {
        console.error('Error deleting empleado', error);
      }
    );
  }
}
