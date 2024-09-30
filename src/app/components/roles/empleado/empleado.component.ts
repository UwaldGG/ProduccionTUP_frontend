import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from '../../../services/Empleados/empleados.service'; // Asegúrate de que la ruta sea correcta
import { Tarea } from '../../../interfaces/tarea'; // Asegúrate de definir este modelo o ajustarlo a tu contexto
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empleados-tareas',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class EmpleadoComponent implements OnInit {
  tareas: Tarea[] = [];
  selectedMes: string = '';
  meses: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  constructor(private empleadosService: EmpleadosService) {}

  ngOnInit(): void {
    // Inicializar las 66 tareas con valores por defecto
    this.tareas = Array(66).fill(null).map((_, i) => ({
      nombre: `Tarea ${i + 1}`,
      valor: 0
    }));
  }

  guardarTareas() {
    if (!this.selectedMes) {
      alert("Por favor, seleccione un mes.");
      return;
    }

    const data = {
      mes: this.selectedMes,
      tareas: this.tareas
    };

    // Llamada al servicio para enviar las tareas al backend
    this.empleadosService.guardarTareas(data).subscribe(
      (response) => {
        console.log("Datos guardados exitosamente", response);
        alert("Datos guardados exitosamente");
      },
      (error) => {
        console.error("Error al guardar los datos", error);
        alert("Error al guardar los datos");
      }
    );
  }
}
