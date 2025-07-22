import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { PainelApiService } from '../../services/painel-api.service';
import { environment } from '../../../environments/environment';
import { LinksUpdateService } from '../../services/links-update.service';

export interface Plano {
  nome: string;
  desktop: string;
  mobile?: string;
}

@Component({
  selector: 'app-planos',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './planos.component.html',
  styleUrl: './planos.component.css'
})
export class PlanosComponent implements OnInit {
  backendUrl = environment.backendUrl;
  planos: Plano[] = [];
  planosLinks: { [key: string]: string } = {
    plano500: '',
    plano700: '',
    plano800: ''
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
      // Agora busca do array 'planos' do config
      this.planos = (config.planos || []).map((p: any) => ({
        nome: p.nome,
        desktop: this.concatUrl(this.backendUrl, p.desktop),
        mobile: p.mobile ? this.concatUrl(this.backendUrl, p.mobile) : undefined
      }));
      if (config.links && config.links.planos) {
        this.planosLinks = { ...this.planosLinks, ...config.links.planos };
      }
    });
  }

  isMobile(): boolean {
    return window.innerWidth <= 794;
  }

  concatUrl(base: string, path: string): string {
    if (!base.endsWith('/') && !path.startsWith('/')) {
      return base + '/' + path;
    }
    if (base.endsWith('/') && path.startsWith('/')) {
      return base + path.substring(1);
    }
    return base + path;
  }
}
