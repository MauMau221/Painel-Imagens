import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PainelApiService } from '../../services/painel-api.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-clube-vantagens',
  imports: [MatIconModule],
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

  constructor(private painelApi: PainelApiService) {}

  ngOnInit() {
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
