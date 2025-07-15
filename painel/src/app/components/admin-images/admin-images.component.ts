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

interface AdminImage {
  key: string;
  label: string;
  url: string;
  file: File | null;
  isUploading: boolean;
}

const IMAGES: { key: string; label: string }[] = [
  { key: 'banner', label: 'Banner Principal' },
  { key: 'bannerMobile', label: 'Banner Mobile' },
  { key: 'depoimentos', label: 'Imagem Depoimentos' },
  { key: 'vantagens', label: 'Imagem Vantagens' }
];

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
  images: AdminImage[] = [];
  backendUrl = 'http://localhost:3000';

  constructor(
    private painelApi: PainelApiService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.painelApi.getConfig().subscribe(config => {
      this.images = IMAGES.map(img => ({
        key: img.key,
        label: img.label,
        url: config[img.key] ? this.backendUrl + config[img.key] : '',
        file: null,
        isUploading: false
      }));
    });
  }

  onFileSelected(event: any, img: AdminImage): void {
    const file = event.target.files[0];
    img.file = file;
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        img.url = e.target.result; // Mostra preview imediatamente
      };
      reader.readAsDataURL(file);
    }
  }

  uploadImage(img: AdminImage): void {
    if (!img.file) {
      this.showMessage('Por favor, selecione uma imagem', 'error');
      return;
    }
    img.isUploading = true;
    this.painelApi.uploadImage(img.file).subscribe(res => {
      // Atualiza config com a nova imagem
      const update = { [img.key]: res.image };
      this.painelApi.updateConfig(update).subscribe(() => {
        img.url = this.backendUrl + res.image;
        img.file = null;
        img.isUploading = false;
        this.showMessage('Imagem atualizada com sucesso!', 'success');
      });
    }, () => {
      img.isUploading = false;
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