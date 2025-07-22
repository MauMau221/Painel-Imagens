import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { PainelApiService } from '../../services/painel-api.service';
import { environment } from '../../../environments/environment';
import { LinksUpdateService } from '../../services/links-update.service';

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

  constructor(private painelApi: PainelApiService, private cdr: ChangeDetectorRef, private linksUpdate: LinksUpdateService) {}

  ngOnInit() {
    this.loadLinks();
    this.linksUpdate.linksUpdated$.subscribe(() => {
      this.loadLinks();
      this.cdr.detectChanges();
    });
    this.resizeListener = () => { this.cdr.detectChanges(); };
    window.addEventListener('resize', this.resizeListener);
  }

  loadLinks() {
    this.painelApi.getConfig().subscribe(config => {
      this.bannerUrl = config.banner ? this.backendUrl + config.banner : 'assets/banner.png';
      this.bannerMobileUrl = config.bannerMobile ? this.backendUrl + config.bannerMobile : 'assets/bannerMobile.png';
      if (config.links && config.links.principal) {
        this.bannerLinks = { ...this.bannerLinks, ...config.links.principal };
      }
    });
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.resizeListener);
  }

  isMobile(): boolean {
    return window.innerWidth <= 794;
  }
}
