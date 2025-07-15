import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PainelApiService } from '../../services/painel-api.service';

@Component({
  selector: 'app-admin-images',
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
  templateUrl: './admin-images.component.html',
  styleUrl: './admin-images.component.css'
})
export class AdminImagesComponent implements OnInit {
  selectedFile: File | null = null;
  imageUrl: string | null = null;
  isUploading = false;

  constructor(
    private painelApi: PainelApiService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.painelApi.getConfig().subscribe(config => {
      this.imageUrl = config.image || null;
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadImage(): void {
    if (!this.selectedFile) {
      this.showMessage('Por favor, selecione uma imagem', 'error');
      return;
    }
    this.isUploading = true;
    this.painelApi.uploadImage(this.selectedFile).subscribe(res => {
      this.isUploading = false;
      this.imageUrl = res.image;
      this.showMessage('Imagem atualizada com sucesso!', 'success');
    }, () => {
      this.isUploading = false;
      this.showMessage('Erro ao enviar imagem', 'error');
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