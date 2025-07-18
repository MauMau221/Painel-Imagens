import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { PainelApiService } from '../../services/painel-api.service';
import { environment } from '../../../environments/environment';

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
  backendUrl = environment.backendUrl;
  bannerLinks = {
    saibaMais: ''
  };

  constructor(private painelApi: PainelApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.painelApi.getConfig().subscribe(config => {
      this.bannerUrl = config.banner ? this.backendUrl + config.banner : 'assets/banner.png';
      this.bannerMobileUrl = config.bannerMobile ? this.backendUrl + config.bannerMobile : 'assets/bannerMobile.png';
      if (config.links && config.links['banner-principal']) {
        this.bannerLinks = { ...this.bannerLinks, ...config.links['banner-principal'] };
      }
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
