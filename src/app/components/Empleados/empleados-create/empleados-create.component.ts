import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EmpleadosService } from '../../../services/Empleados/empleados.service';



@Component({
  selector: 'app-empleados-create',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './empleados-create.component.html',
  styleUrl: './empleados-create.component.css'
})
export class EmpleadosCreateComponent {
  newEmpleado: any = {
    Nombre: '',
    Apellido: '',
    Distrito: ''
  };

  constructor(private empleadosService: EmpleadosService, private router: Router) {}

  createEmpleados(): void {
    this.empleadosService.createEmpleados(this.newEmpleado).subscribe(
      () => {
        this.router.navigate(['/empleados']);
      },
      (error) => {
        console.error('Error creating empleado: ', error);
      }
    );
  }
}

