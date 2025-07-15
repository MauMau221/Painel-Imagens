import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PainelApiService } from '../../services/painel-api.service';

@Component({
  selector: 'app-clube-vantagens',
  imports: [MatIconModule],
  templateUrl: './clube-vantagens.component.html',
  styleUrl: './clube-vantagens.component.css'
})
export class ClubeVantagensComponent implements OnInit {
  vantagensUrl: string = '';
  backendUrl = 'http://localhost:3000';

  constructor(private painelApi: PainelApiService) {}

  ngOnInit() {
    this.painelApi.getConfig().subscribe(config => {
      this.vantagensUrl = config.vantagens ? this.backendUrl + config.vantagens : '/assets/vantagens.png';
    });
  }
}
