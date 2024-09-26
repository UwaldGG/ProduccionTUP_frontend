import { Component, OnInit } from '@angular/core';


import { DistritosService } from '../../../services/distritos/distritos.service'; // Servicio para manejar distritos
import { TareasService } from '../../../services/tareas/tareas.service'; // Servicio para manejar tareas
import { EmpleadosService } from '../../../services/Empleados/empleados.service'; // Servicio para personas responsables
import { Router } from '@angular/router';
//import { ReportesService } from './services/reportes.service'; // Servicio para reportes mensuales


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  totalDistritos: number = 0;
  totalTareas: number = 0;
  totalEmpleados: number = 0;
  //totalReportes: number = 0;
  
  constructor(
    private distritosService: DistritosService,
    private tareasService: TareasService,
    private empleadosService: EmpleadosService,
    private router: Router
    //private reportesService: ReportesService
  ) {}

  ngOnInit(): void {
    console.log('pase: ', this.totalDistritos)
    this.loadData();
  }

  loadData(): void {
    // Cargar el total de distritos
    this.distritosService.getTotalDistritos().subscribe(
      (data: number) => {
        console.log('total: ', data)
        this.totalDistritos = data;
      },
      (error) => {
        console.error('Error fetching distritos:', error);
      }
    );

    // Cargar el total de tareas
    this.tareasService.getTotalTareas().subscribe(
      (data: number) => {
        this.totalTareas = data;
      },
      (error) => {
        console.error('Error fetching tareas:', error);
      }
    );

    // Cargar el total de personas responsables
    this.empleadosService.getTotalEmpleados().subscribe(
      (data: number) => {
        console.log('total: ', data)
        this.totalEmpleados = data;
      },
      (error) => {
        console.error('Error fetching personas responsables:', error);
      }
    );

    // Cargar el total de reportes mensuales
    //this.reportesService.getTotalReportes().subscribe(
      //(data: number) => {
       // this.totalReportes = data;
      //},
      //(error) => {
        //console.error('Error fetching reportes:', error);
      //}
  //);
  }

}
