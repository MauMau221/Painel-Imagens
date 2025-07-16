import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { PainelApiService } from '../../services/painel-api.service';

@Component({
  selector: 'app-banner-principal',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './banner-principal.component.html',
  styleUrl: './banner-principal.component.css'
})
export class BannerPrincipalComponent implements OnInit, OnDestroy {
  bannerUrl: string = '';
  bannerMobileUrl: string = '';
  resizeListener: any;
  backendUrl = 'http://192.168.1.30:3000';

  constructor(private painelApi: PainelApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.painelApi.getConfig().subscribe(config => {
      this.bannerUrl = config.banner ? this.backendUrl + config.banner : 'assets/banner.png';
      this.bannerMobileUrl = config.bannerMobile ? this.backendUrl + config.bannerMobile : 'assets/bannerMobile.png';
    });
    this.resizeListener = () => { this.cdr.detectChanges(); };
    window.addEventListener('resize', this.resizeListener);
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.resizeListener);
  }

  isMobile(): boolean {
    return window.innerWidth <= 794;
  }
}
