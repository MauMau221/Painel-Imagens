import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { LogoComponent } from '../logo/logo.component';
import { RouterLink } from '@angular/router';
import { PainelApiService } from '../../services/painel-api.service';

@Component({
  selector: 'app-top-bar',
  imports: [MatIconModule, LogoComponent, RouterLink],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent {
  topbarLinks = {
    login: '',
    suporte: ''
  };

  constructor(private painelApi: PainelApiService) {
    this.painelApi.getConfig().subscribe(config => {
      if (config.links && config.links['top-bar']) {
        this.topbarLinks = { ...this.topbarLinks, ...config.links['top-bar'] };
      }
    });
  }
}
