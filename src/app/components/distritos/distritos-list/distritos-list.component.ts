import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DistritosService } from '../../../services/distritos/distritos.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-distritos-list',
  templateUrl: './distritos-list.component.html',
  styleUrls: ['./distritos-list.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class DistritosListComponent implements OnInit {
  distritos: any[] = [];

  constructor(private distritosService: DistritosService, private router: Router) {}

  ngOnInit(): void {
    this.getDistritos();
  }

  getDistritos(): void {
    this.distritosService.getDistritos().subscribe(
      (data) => {
        this.distritos = data;
      },
      (error) => {
        console.error('Error fetching distritos:', error);
      }
    );
  }

  editDistrito(id: number): void {
    this.router.navigate(['/distritos/edit', id]);
  }
  
  createDistrito(): void {
    this.router.navigate(['/distritos/create']);
  }

  deleteDistrito(id: number): void {
    this.distritosService.deleteDistrito(id).subscribe(
      () => {
        this.getDistritos(); // Refresh the list after deletion
      },
      (error) => {
        console.error('Error deleting distrito:', error);
      }
    );
  }
}

