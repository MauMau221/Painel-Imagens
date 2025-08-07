import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { PainelApiService } from '../../services/painel-api.service';
import { LinksUpdateService } from '../../services/links-update.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-footer',
  imports: [MatIconModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {
  footerLinks = {
    inicio: '',
    tutoriais: '',
    leveduca: '',
    clubeBeneficios: '',
    downloads: '',
    contratos: '',
    privacidade: '',
    termos: '',
    instagram: '',
    facebook: '',
    whatsappFloat: ''
  };
  
  logoUrl: string = 'assets/logo.png'; // Fallback para o logo padrão
  backendUrl = environment.backendUrl;

  constructor(private painelApi: PainelApiService, private linksUpdate: LinksUpdateService) {
    this.loadLinks();
    this.linksUpdate.linksUpdated$.subscribe(() => {
      this.loadLinks();
    });
  }

  ngOnInit(): void {
    this.loadLogo();
  }

  loadLogo() {
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

  loadLinks() {
    this.painelApi.getConfig().subscribe(config => {
      if (config.links && config.links.footer) {
        this.footerLinks = { ...this.footerLinks, ...config.links.footer };
      }
    });
  }
}
