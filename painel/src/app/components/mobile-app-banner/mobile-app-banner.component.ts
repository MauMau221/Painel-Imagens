import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { APP_CONFIG } from '../../config/app-config';

@Component({
  selector: 'app-mobile-app-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mobile-app-banner.component.html',
  styleUrls: ['./mobile-app-banner.component.css']
})
export class MobileAppBannerComponent implements OnInit {
  showBanner = false;
  isIOS = false;
  isAndroid = false;
  config = APP_CONFIG;

  ngOnInit() {
    this.detectMobileOS();
  }

  detectMobileOS() {
    // Verifica se é um dispositivo móvel
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      // Detecta iOS
      this.isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      
      // Detecta Android
      this.isAndroid = /Android/.test(navigator.userAgent);
      
      // Mostra o banner apenas se for iOS ou Android
      if (this.isIOS || this.isAndroid) {
        // Verifica se o usuário já fechou o banner
        const bannerClosed = localStorage.getItem('mobileAppBannerClosed');
        if (!bannerClosed) {
          this.showBanner = true;
        }
      }
    }
  }

  downloadApp() {
    let url = '';
    
    if (this.isIOS) {
      url = this.config.appStore.url;
    } else if (this.isAndroid) {
      url = this.config.playStore.url;
    }
    
    if (url) {
      window.open(url, '_blank');
    }
  }

  closeBanner() {
    this.showBanner = false;
    localStorage.setItem('mobileAppBannerClosed', 'true');
  }
} 