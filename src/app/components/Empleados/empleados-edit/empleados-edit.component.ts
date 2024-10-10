import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadosService } from '../../../services/Empleados/empleados.service';
import { DistritosService } from '../../../services/distritos/distritos.service';
import { Distrito } from '../../../interfaces/model'
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-empleados-edit',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './empleados-edit.component.html',
  styleUrl: './empleados-edit.component.css'
})
export class EmpleadosEditComponent implements OnInit{
  empleado: any;
  distritos: Distrito[] = []; // Para almacenar la lista de distritos

  constructor(
    private empleadosService: EmpleadosService,
    private distritosService: DistritosService, // Inyectar el servicio de distritos
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.empleado = {
      ID_Empleado: null,
      Nombre: '',
      Apellido: '',
      fk_distrito: null // Usamos fk_distrito para manejar el distrito del empleado
    };
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.getEmpleado(id);
    this.loadDistritos(); // Cargar distritos al inicializar el componente
  }

  // Cargar la lista de distritos desde el servicio
  loadDistritos(): void {
    this.distritosService.getDistritos().subscribe(
      (data: Distrito[]) => {
        this.distritos = data;
      },
      (error) => {
        console.error('Error fetching distritos: ', error);
      }
    );
  }

  // Obtener los datos del empleado por ID
  getEmpleado(id: number): void {
    this.empleadosService.getEmpleadosById(id).subscribe(
      (data) => {
        this.empleado = data;
      },
      (error) => {
        console.error('Error fetching empleado: ', error);
      }
    );
  }

  // Actualizar el empleado
  updateEmpleado(): void {
    this.empleadosService.updateEmpleados(this.empleado.ID_Empleado, this.empleado).subscribe(
      () => {
        this.router.navigate(['/admin-panel/empleados/list'], { replaceUrl: true });
      },
      (error) => {
        console.error('Error updating empleado:', error);
      }
    );
  }
}

