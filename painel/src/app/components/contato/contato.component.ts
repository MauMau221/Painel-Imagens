import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PainelApiService } from '../../services/painel-api.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-contato',
  imports: [MatIconModule],
  templateUrl: './contato.component.html',
  styleUrl: './contato.component.css'
})
export class ContatoComponent implements OnInit {
  atendenteUrl: string = 'assets/atendente.png';
  backendUrl = environment.backendUrl;

  constructor(private painelApi: PainelApiService) {}

  ngOnInit() {
    this.painelApi.getConfig().subscribe(config => {
      if (config.atendente) {
        this.atendenteUrl = this.backendUrl + config.atendente;
      }
    });
  }
}
