import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DistritosService } from '../../../services/distritos/distritos.service';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-distritos-create',
  templateUrl: './distritos-create.component.html',
  styleUrls: ['./distritos-create.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule] // Asegúrate de importar FormsModule aquí también
})
export class DistritosCreateComponent {
  newDistrito: any = {
    Coordinador: '',
    NombreDistrito: '',
    Contrasenia: ''
  };

  errorMessage: string = ''; // Mensaje de error
  successMessage: String = '';

  constructor(private distritosService: DistritosService, private router: Router) {}

  createDistrito(): void {
    // Validar que el nombre del distrito no esté vacío
    if (!this.newDistrito.NombreDistrito.trim()) {
      this.errorMessage = 'El nombre del distrito es obligatorio.'; // Mensaje de error
      return; // No continuar si el nombre está vacío
    }

    // Si el nombre no está vacío, proceder a crear el distrito
    this.distritosService.createDistrito(this.newDistrito).subscribe(
      () => {
        // Mostrar el mensaje de éxito y resetear el formulario
        this.successMessage = '¡El distrito ha sido creado con éxito!';
        this.newDistrito = { Coordinador: '', NombreDistrito: '', Contrasenia: '' };
        setTimeout(() => {
          this.successMessage = '';  // Limpiar el mensaje después de unos segundos
          this.router.navigate(['/admin-panel/distritos/list'], { replaceUrl: true }); // Redirigir a la lista de distritos
        }, 2000);  // Mostrar el mensaje durante 3 segundos
      },
      (error) => {
        this.errorMessage = 'Error al crear el distrito. Inténtalo de nuevo.';
        console.error('Error creating distrito:', error);
      }
    );
  }
}
