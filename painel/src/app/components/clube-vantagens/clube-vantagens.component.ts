import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { PainelApiService } from '../../services/painel-api.service';
import { environment } from '../../../environments/environment';
import { LinksUpdateService } from '../../services/links-update.service';

@Component({
  selector: 'app-clube-vantagens',
  imports: [CommonModule, MatIconModule],
  templateUrl: './clube-vantagens.component.html',
  styleUrl: './clube-vantagens.component.css'
})
export class ClubeVantagensComponent implements OnInit {
  vantagensUrl: string = '';
  vantagensMobileUrl: string = '';
  backendUrl = environment.backendUrl;
  clubeLinks = {
    participe: ''
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
      this.vantagensUrl = config.vantagens ? this.backendUrl + config.vantagens : '/assets/vantagens.png';
      this.vantagensMobileUrl = config.vantagensMobile ? this.backendUrl + config.vantagensMobile : '';
      if (config.links && config.links['clube-vantagens']) {
        this.clubeLinks = { ...this.clubeLinks, ...config.links['clube-vantagens'] };
      }
    });
  }

  isMobile(): boolean {
    return window.innerWidth <= 794;
  }
}
