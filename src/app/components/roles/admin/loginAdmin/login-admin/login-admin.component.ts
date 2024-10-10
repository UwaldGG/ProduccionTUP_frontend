import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthGuard } from '../../../../../auth.guard';
import { AuthService } from '../../../../../services/auth.service';  // Importar el AuthService
import { MatDialog } from '@angular/material/dialog';
import { SuccessModalComponent } from '../../../../../components/SuccessModal/success-modal/success-modal.component';


@Component({
  selector: 'app-login-admin',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login-admin.component.html',
  styleUrl: './login-admin.component.css'
})

export class LoginAdminComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router, 
    private authService: AuthService,
    private dialog: MatDialog

  ) {}  // Inyectar AuthService

  onLogin() {
    // Usar el AuthService para autenticar
    if (this.authService.login(this.username, this.password)) {
      this.dialog.open(SuccessModalComponent);
      this.router.navigate(['/admin-panel']);  // Redirige al dashboard del admin
    } else {
      this.errorMessage = 'Credenciales incorrectas, intenta de nuevo.';
    }
  }

  openSuccessModal(): void {
    this.dialog.open(SuccessModalComponent);
  }
}
