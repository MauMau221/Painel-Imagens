import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { PainelApiService } from '../../services/painel-api.service';

@Component({
  selector: 'app-footer',
  imports: [MatIconModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
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

  constructor(private painelApi: PainelApiService) {
    this.painelApi.getConfig().subscribe(config => {
      if (config.links && config.links.footer) {
        this.footerLinks = { ...this.footerLinks, ...config.links.footer };
      }
    });
  }
}
