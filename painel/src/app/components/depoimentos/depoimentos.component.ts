import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PainelApiService } from '../../services/painel-api.service';

@Component({
  selector: 'app-depoimentos',
  imports: [MatIconModule],
  templateUrl: './depoimentos.component.html',
  styleUrl: './depoimentos.component.css'
})
export class DepoimentosComponent implements OnInit {
  depoimentosUrl: string = '';
  depoimentosMobileUrl: string = '';
  backendUrl = 'http://192.168.1.30:3000';

  constructor(private painelApi: PainelApiService) {}

  ngOnInit() {
    this.painelApi.getConfig().subscribe(config => {
      this.depoimentosUrl = config.depoimentos ? this.backendUrl + config.depoimentos : '/assets/teste.png';
      this.depoimentosMobileUrl = config.depoimentosMobile ? this.backendUrl + config.depoimentosMobile : '/assets/teste.png';
    });
  }

  isMobile(): boolean {
    return window.innerWidth <= 794;
  }
}
