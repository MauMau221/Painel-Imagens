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
        console.log('Resposta do login:', response);
        this.showMessage('Login realizado com sucesso!', 'success');
        this.isLoading = false;
        
        // Verifica se o login foi bem-sucedido
        if (response && response.success) {
          console.log('Login bem-sucedido, redirecionando para admin-painel...');
          setTimeout(() => {
            this.router.navigate(['/admin-painel']).then(() => {
              console.log('Redirecionamento para admin-painel realizado com sucesso');
            }).catch((error) => {
              console.error('Erro no redirecionamento:', error);
              // Fallback caso o redirecionamento falhe
              window.location.href = '/admin-painel';
            });
          }, 500);
        } else {
          console.error('Login falhou - resposta inválida:', response);
          this.showMessage('Erro no login. Tente novamente.', 'error');
        }
      },
      error: (error) => {
        console.error('Erro no login:', error);
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