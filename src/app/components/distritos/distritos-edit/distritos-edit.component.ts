import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DistritosService } from '../../../services/distritos/distritos.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-distritos-edit',
  templateUrl: './distritos-edit.component.html',
  styleUrls: ['./distritos-edit.component.css'],
  standalone: true,
  imports: [FormsModule]
})
export class DistritosEditComponent implements OnInit {
  distrito: any;

  constructor(
    private distritosService: DistritosService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.distrito = {
      ID_Distrito: null,
      Coordinador: '',
      NombreDistrito: ''
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
    this.distritosService.updateDistrito(this.distrito.ID_Distrito, this.distrito).subscribe(
      () => {
        this.router.navigate(['/distritos/list']); // Redirigir a la lista de distritos
      },
      (error) => {
        console.error('Error updating distrito:', error);
      }
    );
  }
}
