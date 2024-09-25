import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DistritosService } from '../../../services/distritos/distritos.service';
import { FormsModule } from '@angular/forms'; // Importa FormsModule



@Component({
  selector: 'app-distritos-create',
  templateUrl: './distritos-create.component.html',
  styleUrls: ['./distritos-create.component.css'],
  standalone: true,
  imports: [FormsModule] // Asegúrate de importar FormsModule aquí también
})
export class DistritosCreateComponent {
  newDistrito: any = {
    Coordinador: '',
    NombreDistrito: ''
  };

  constructor(private distritosService: DistritosService, private router: Router) {}

  createDistrito(): void {
    this.distritosService.createDistrito(this.newDistrito).subscribe(
      () => {
        this.router.navigate(['/distritos']); // Redirigir a la lista de distritos
      },
      (error) => {
        console.error('Error creating distrito:', error);
      }
    );
  }
}
