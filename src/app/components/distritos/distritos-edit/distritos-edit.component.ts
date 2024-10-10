import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DistritosService } from '../../../services/distritos/distritos.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-distritos-edit',
  templateUrl: './distritos-edit.component.html',
  styleUrls: ['./distritos-edit.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class DistritosEditComponent implements OnInit {
  distrito: any = {
    Coordinador: '',
    NombreDistrito: '',
    Contrasenia: ''
  };

  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private distritosService: DistritosService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.distrito = {
      ID_Distrito: null,
      Coordinador: '',
      NombreDistrito: '',
      Contrasenia: ''
    };
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.getDistrito(id);
  }

  getDistrito(id: number): void {
    this.distritosService.getDistritoById(id).subscribe(
      (data) => {
        this.distrito = data;
      },
      (error) => {
        console.error('Error fetching distrito:', error);
      }
    );
  }

  updateDistrito(): void {
    if (!this.distrito.NombreDistrito.trim()) {
      this.errorMessage = 'El nombre del distrito es obligatorio.'; // Mensaje de error
      return; // No continuar si el nombre está vacío
    }

    this.distritosService.updateDistrito(this.distrito.ID_Distrito, this.distrito).subscribe(
      () => {
        this.successMessage = '¡El distrito ha sido actualizado con éxito!';
        setTimeout(() => {
          this.successMessage = '';  // Limpiar el mensaje después de unos segundos
          this.router.navigate(['/admin-panel/distritos/list'], { replaceUrl: true }); // Redirigir a la lista de distritos
        }, 2000);  // Mostrar el mensaje durante 3 segundos
      },
      (error) => {
        console.error('Error updating distrito:', error);
        this.errorMessage = 'Error al actualizar el distrito. Inténtalo de nuevo.';
      }
    );
  }
}