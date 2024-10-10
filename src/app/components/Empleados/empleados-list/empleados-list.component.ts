import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpleadosService } from '../../../services/Empleados/empleados.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FilterEmpleadoPipe } from '../../../pipes/empleado/filter-empleado.pipe';



@Component({
  selector: 'app-empleados-list',
  standalone: true,
  imports: [CommonModule, FormsModule, FilterEmpleadoPipe],
  templateUrl: './empleados-list.component.html',
  styleUrl: './empleados-list.component.css'
})
export class EmpleadosListComponent implements OnInit {
  empleados: any[] = [];
  searchText: string = '';

  constructor(private empleadosService: EmpleadosService, private router: Router) {}

  ngOnInit(): void {
    //this.getEmpleados();
    this.getEmpleadosWithDistritos();
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
    this.router.navigate(['/admin-panel/empleados/edit', id]);
  }

  createEmpleado(): void {
    this.router.navigate(['/admin-panel/empleados/create']);
  }

  deleteEmpleado(id: number): void {
    this.empleadosService.deleteEmpleados(id).subscribe(
      () => {
        this.getEmpleadosWithDistritos();
      },
      (error) => {
        console.error('Error deleting empleado', error);
      }
    );
  }


  getEmpleadosWithDistritos(): void {
    this.empleadosService.getEmpleadosWithDistritos().subscribe(
      (data: any[]) => {
        this.empleados = data;  // Asignar directamente los empleados con distritos
      },
      (error) => {
        console.error('Error fetching empleados', error);
      }
    );
  } 
}