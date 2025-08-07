import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PainelApiService } from '../../services/painel-api.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-logo',
  imports: [CommonModule],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.css'
})
export class LogoComponent implements OnInit {
  logoUrl: string = 'assets/logo.png'; // Fallback para o logo padrão
  backendUrl = environment.backendUrl;

  constructor(private painelApi: PainelApiService) {}

  ngOnInit(): void {
    this.painelApi.getAdminConfig().subscribe({
      next: (config) => {
        if (config.logo) {
          this.logoUrl = this.backendUrl + config.logo;
        }
      },
      error: (error) => {
        console.error('Erro ao carregar configuração do logo:', error);
        // Mantém o fallback em caso de erro
      }
    });
  }
}
