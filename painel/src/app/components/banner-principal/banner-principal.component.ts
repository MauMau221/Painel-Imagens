import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PainelApiService } from '../../services/painel-api.service';

@Component({
  selector: 'app-banner-principal',
  imports: [MatIconModule],
  templateUrl: './banner-principal.component.html',
  styleUrl: './banner-principal.component.css'
})
export class BannerPrincipalComponent implements OnInit {
  bannerUrl: string = '';

  constructor(private painelApi: PainelApiService) {}

  ngOnInit() {
    this.painelApi.getConfig().subscribe(config => {
      this.bannerUrl = config.image || 'assets/banner.png';
    });
  }
}
