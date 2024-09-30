import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EmpleadosService } from '../../../services/Empleados/empleados.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-empleados-create',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './empleados-create.component.html',
  styleUrl: './empleados-create.component.css'
})
export class EmpleadosCreateComponent {
  newEmpleado: any = {
    Nombre: '',
    Apellido: '',
    fk_distrito: null
  };

  distritos: Distrito[] = [];

  constructor(private empleadosService: EmpleadosService, private router: Router) {}

  ngOnInit(): void {
    this.loadDistritos();
  }


  
  loadDistritos(): void {
    this.empleadosService.getDistritos().subscribe(
      (data: Distrito[]) => { // Especifica el tipo de data aquí
        this.distritos = data; // Asegúrate de que la respuesta contenga los distritos
        //console.log(this.distritos);
      },
      (error) => {
        console.error('Error fetching distritos', error);
      }
    );
  }

  createEmpleado(): void {
    this.empleadosService.createEmpleados(this.newEmpleado).subscribe(
      () => {
        this.router.navigate(['/empleados/list']);
      },
      (error) => {
        console.error('Error creating empleado: ', error);
      }
    );
  }
}


interface Distrito {
  ID_Distrito: number; // Asegúrate de que el nombre coincida con el de tu API
  NombreDistrito: string;
}


