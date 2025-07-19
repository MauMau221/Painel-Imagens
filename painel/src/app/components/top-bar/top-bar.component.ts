import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { LogoComponent } from '../logo/logo.component';
import { RouterLink } from '@angular/router';
import { PainelApiService } from '../../services/painel-api.service';
import { LinksUpdateService } from '../../services/links-update.service';

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

  constructor(private painelApi: PainelApiService, private linksUpdate: LinksUpdateService) {
    this.loadLinks();
    this.linksUpdate.linksUpdated$.subscribe(() => {
      this.loadLinks();
    });
  }

  loadLinks() {
    this.painelApi.getConfig().subscribe(config => {
      if (config.links && config.links['top-bar']) {
        this.topbarLinks = { ...this.topbarLinks, ...config.links['top-bar'] };
      }
    });
  }
}
