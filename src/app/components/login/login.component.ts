import { Component, NgModule, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private router: Router) {}

  irALoginEmpleado() {
    this.router.navigate(['/login-empleado']);
  }

  irALoginAdmin() {
    this.router.navigate(['/login-admin']);
  }
}








