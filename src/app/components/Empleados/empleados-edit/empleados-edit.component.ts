import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadosService } from '../../../services/Empleados/empleados.service';


@Component({
  selector: 'app-empleados-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './empleados-edit.component.html',
  styleUrl: './empleados-edit.component.css'
})
export class EmpleadosEditComponent implements OnInit{
  empleado: any;

  constructor(
    private empleadosService: EmpleadosService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.empleado = {
      ID_Persona_responsable: null,
      Nombre: '',
      Apellido: '',
      Distrito: ''
    };
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.getEmpleado(id);
  }

  getEmpleado(id: number): void {
    this.empleadosService.getEmpleadosById(id).subscribe(
      (data) => {
        this.empleado = data;
      },
      (error) => {
        console.error('Error fetching empleado: ',error);
      }
    )
  }

  updateEmpleado(): void {
    this.empleadosService.updateEmpleados(this.empleado.ID_Persona_responsable, this.empleado).subscribe(
      () => {
        this.router.navigate(['/empleados/list']); // Refresh the list after deletion
      },
      (error) => {
        console.error('Error updating empleado:', error);
      }
    );
  }
}
