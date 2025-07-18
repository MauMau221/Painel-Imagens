import { Component, OnInit } from '@angular/core';
import { PainelApiService } from '../../services/painel-api.service';
import { environment } from '../../../environments/environment';
import { MatIconModule } from '@angular/material/icon';

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

  constructor(private painelApi: PainelApiService) {}

  ngOnInit() {
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
