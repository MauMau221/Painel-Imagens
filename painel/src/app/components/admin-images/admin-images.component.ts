import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ImageManagementService, ImageInfo } from '../../services/image-management.service';

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
  images: ImageInfo[] = [];
  selectedImage: ImageInfo | null = null;
  selectedFile: File | null = null;
  isUploading = false;

  constructor(
    private imageService: ImageManagementService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadImages();
  }

  loadImages(): void {
    this.imageService.getAllImages().subscribe(images => {
      this.images = images;
    });
  }

  onFileSelected(event: any, image: ImageInfo): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = image;
      this.selectedFile = file;
    }
  }

  uploadImage(): void {
    if (!this.selectedImage || !this.selectedFile) {
      this.showMessage('Por favor, selecione uma imagem', 'error');
      return;
    }

    this.isUploading = true;

    // Primeiro atualiza localmente
    this.imageService.updateImage(this.selectedImage.id, this.selectedFile).subscribe(success => {
      if (success) {
        // Simula o upload para o servidor
        this.imageService.uploadImageToServer(this.selectedFile!, this.selectedImage!.id).subscribe(response => {
          this.isUploading = false;
          this.selectedFile = null;
          this.selectedImage = null;
          this.showMessage('Imagem atualizada com sucesso!', 'success');
          this.loadImages(); // Recarrega as imagens
        });
      } else {
        this.isUploading = false;
        this.showMessage('Erro ao atualizar a imagem', 'error');
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

  getFileSize(file: File): string {
    const sizeInMB = file.size / (1024 * 1024);
    return sizeInMB.toFixed(2) + ' MB';
  }

  isImageFile(file: File): boolean {
    return file.type.startsWith('image/');
  }
} 