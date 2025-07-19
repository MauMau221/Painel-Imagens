import { Component, OnInit } from '@angular/core';
import { PainelApiService } from '../../services/painel-api.service';
import { environment } from '../../../environments/environment';
import { MatIconModule } from '@angular/material/icon';
import { LinksUpdateService } from '../../services/links-update.service';

@Component({
  selector: 'app-contato',
  imports: [MatIconModule],
  templateUrl: './contato.component.html',
  styleUrl: './contato.component.css'
})
export class ContatoComponent implements OnInit {
  atendenteUrl: string = 'assets/atendente.png';
  backendUrl = environment.backendUrl;

  contatoLinks = {
    whatsapp: '',
    sac: '',
    boleto: '',
    cliente: '',
    duvidas: ''
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
      if (config.atendente) {
        this.atendenteUrl = this.backendUrl + config.atendente;
      }
      if (config.links && config.links.contato) {
        this.contatoLinks = { ...this.contatoLinks, ...config.links.contato };
      }
    });
  }
}
