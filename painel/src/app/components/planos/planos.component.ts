import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { PainelApiService } from '../../services/painel-api.service';

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
  backendUrl = 'http://192.168.1.30:3000';
  planos: Plano[] = [];

  constructor(private painelApi: PainelApiService) {}

  ngOnInit() {
    this.painelApi.getConfig().subscribe(config => {
      // Agora busca do array 'planos' do config
      this.planos = (config.planos || []).map((p: any) => ({
        nome: p.nome,
        desktop: this.backendUrl + p.desktop,
        mobile: p.mobile ? this.backendUrl + p.mobile : undefined
      }));
    });
  }

  isMobile(): boolean {
    return window.innerWidth <= 794;
  }
}
