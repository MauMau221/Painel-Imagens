import { Component, OnInit } from '@angular/core';
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
import { environment } from '../../../environments/environment';

interface AdminImage {
  key: string;
  label: string;
  url: string;
  file: File | null;
  isUploading: boolean;
}

interface AdminPlano {
  nome: string;
  desktop: string;
  mobile?: string;
  fileDesktop?: File | null;
  fileMobile?: File | null;
  isUploadingDesktop?: boolean;
  isUploadingMobile?: boolean;
}

const IMAGES: { key: string; label: string }[] = [
  { key: 'banner', label: 'Banner Principal (Desktop)' },
  { key: 'bannerMobile', label: 'Banner Principal (Mobile)' },
  { key: 'depoimentos', label: 'Imagem Depoimentos (Desktop)' },
  { key: 'depoimentosMobile', label: 'Imagem Depoimentos (Mobile)' },
  { key: 'vantagens', label: 'Imagem Vantagens (Desktop)' },
  { key: 'vantagensMobile', label: 'Imagem Vantagens (Mobile)' },
  { key: 'atendente', label: 'Imagem do Atendente (Contato)' }
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
  backendUrl = environment.backendUrl;
  planos: AdminPlano[] = [];
  novoPlanoNome: string = '';

  constructor(
    private painelApi: PainelApiService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.painelApi.getAdminConfig().subscribe({
      next: (config) => {
        this.images = IMAGES.map(img => ({
          key: img.key,
          label: img.label,
          url: config[img.key] ? this.backendUrl + config[img.key] : '',
          file: null,
          isUploading: false
        }));
        // Carrega planos do config
        this.planos = (config.planos || []).map((p: any) => ({
          nome: p.nome,
          desktop: p.desktop ? this.backendUrl + p.desktop : '',
          mobile: p.mobile ? this.backendUrl + p.mobile : '',
          fileDesktop: null,
          fileMobile: null,
          isUploadingDesktop: false,
          isUploadingMobile: false
        }));
      },
      error: (error) => {
        console.error('Erro ao carregar configurações:', error);
        this.showMessage('Erro ao carregar dados do painel', 'error');
      }
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

  // Métodos para upload de imagens dos planos
  onPlanoFileSelected(event: any, plano: AdminPlano, tipo: 'desktop' | 'mobile') {
    const file = event.target.files[0];
    if (tipo === 'desktop') {
      plano.fileDesktop = file;
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => plano.desktop = e.target.result;
        reader.readAsDataURL(file);
      }
    } else {
      plano.fileMobile = file;
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => plano.mobile = e.target.result;
        reader.readAsDataURL(file);
      }
    }
  }

  uploadPlanoImage(plano: AdminPlano, tipo: 'desktop' | 'mobile') {
    const file = tipo === 'desktop' ? plano.fileDesktop : plano.fileMobile;
    if (!file) {
      this.showMessage('Selecione uma imagem', 'error');
      return;
    }
    if (tipo === 'desktop') plano.isUploadingDesktop = true;
    else plano.isUploadingMobile = true;
    this.painelApi.uploadImage(file).subscribe(res => {
      if (tipo === 'desktop') {
        plano.desktop = this.backendUrl + res.image;
        plano.fileDesktop = null;
      } else {
        plano.mobile = this.backendUrl + res.image;
        plano.fileMobile = null;
      }
      // Atualiza config
      this.savePlanos();
      if (tipo === 'desktop') plano.isUploadingDesktop = false;
      else plano.isUploadingMobile = false;
      this.showMessage('Imagem enviada!', 'success');
    }, () => {
      if (tipo === 'desktop') plano.isUploadingDesktop = false;
      else plano.isUploadingMobile = false;
      this.showMessage('Erro ao enviar imagem', 'error');
    });
  }

  addPlano() {
    if (!this.novoPlanoNome.trim()) {
      this.showMessage('Informe o nome do plano', 'error');
      return;
    }
    this.planos.push({ nome: this.novoPlanoNome, desktop: '', mobile: '', fileDesktop: null, fileMobile: null });
    this.novoPlanoNome = '';
    this.savePlanos();
  }

  removePlano(index: number) {
    this.planos.splice(index, 1);
    this.savePlanos();
  }

  savePlanos() {
    // Salva apenas os campos necessários no backend
    const planosToSave = this.planos.map(p => ({
      nome: p.nome,
      desktop: p.desktop.replace(this.backendUrl, ''),
      mobile: p.mobile ? p.mobile.replace(this.backendUrl, '') : ''
    }));
    this.painelApi.updateConfig({ planos: planosToSave }).subscribe(() => {
      this.showMessage('Planos atualizados!', 'success');
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

  logout() {
    this.painelApi.logout().subscribe(() => {
      this.showMessage('Logout realizado com sucesso!', 'success');
      this.router.navigate(['/admin-login']);
    }, () => {
      this.showMessage('Erro ao fazer logout', 'error');
    });
  }
} 