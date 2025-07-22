import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PainelApiService } from '../../services/painel-api.service';
import { environment } from '../../../environments/environment';
import { LinksUpdateService } from '../../services/links-update.service';

@Component({
  selector: 'app-depoimentos',
  imports: [MatIconModule],
  templateUrl: './depoimentos.component.html',
  styleUrl: './depoimentos.component.css'
})
export class DepoimentosComponent implements OnInit {
  depoimentosUrl: string = '';
  depoimentosMobileUrl: string = '';
  backendUrl = environment.backendUrl;
  depoimentosLinks = {
    imagemDepoimentos: ''
  };

  constructor(private painelApi: PainelApiService, private linksUpdate: LinksUpdateService) {}

  ngOnInit() {
    this.loadLinks();
    this.linksUpdate.linksUpdated$.subscribe(() => {
      this.loadLinks();
    });
  }

  loadLinks() {
    this.painelApi.getConfig().subscribe(config => {
      this.depoimentosUrl = config.depoimentos ? this.backendUrl + config.depoimentos : '/assets/teste.png';
      this.depoimentosMobileUrl = config.depoimentosMobile ? this.backendUrl + config.depoimentosMobile : '/assets/teste.png';
      if (config.links && config.links.depoimentos) {
        this.depoimentosLinks = { ...this.depoimentosLinks, ...config.links.depoimentos };
      }
    });
  }

  isMobile(): boolean {
    return window.innerWidth <= 794;
  }
}
