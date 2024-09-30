import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpleadosService } from '../../../services/Empleados/empleados.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
//import { Empleado } from '../../../interfaces/empleados';



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
    this.getEmpleadosConDistritos();
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
    this.router.navigate(['/empleados/edit', id]);
  }

  createEmpleado(): void {
    this.router.navigate(['./empleados/create']);
  }

  deleteEmpleado(id: number): void {
    this.empleadosService.deleteEmpleados(id).subscribe(
      () => {
        this.getEmpleadosConDistritos();
      },
      (error) => {
        console.error('Error deleting empleado', error);
      }
    );
  }


  getEmpleadosConDistritos(): void {
    this.empleadosService.getEmpleadosConDistritos().subscribe(
      (data: any[]) => {
        this.empleados = this.empleados.map(empleado => ({
          ...empleado,
          Distrito: data.find((distrito: any) => distrito.ID_Distrito === empleado.fk_distrito) // Especifica el tipo aquí
        }));
      },
      (error) => {
        console.error('Error fetching empleados', error);
      }
    );
  }
}
