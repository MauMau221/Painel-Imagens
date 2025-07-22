import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PainelApiService } from '../../services/painel-api.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule
  ],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  username: string = '';
  password: string = '';
  isLoading: boolean = false;

  constructor(
    private painelApi: PainelApiService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  onLogin() {
    if (!this.username.trim()) {
      this.showMessage('Digite o usuário', 'error');
      return;
    }
    if (!this.password.trim()) {
      this.showMessage('Digite a senha', 'error');
      return;
    }

    this.isLoading = true;
    this.painelApi.login(this.username, this.password).subscribe({
      next: (response) => {
        this.showMessage('Login realizado com sucesso!', 'success');
        setTimeout(() => {
          window.location.href = '/admin-images';
        }, 500);
      },
      error: (error) => {
        this.showMessage('Usuário ou senha incorretos!', 'error');
        this.isLoading = false;
      }
    });
  }

  showMessage(message: string, type: 'success' | 'error'): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: type === 'success' ? ['success-snackbar'] : ['error-snackbar']
    });
  }
} 