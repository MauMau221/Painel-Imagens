import { Component } from '@angular/core';
import { BannerPrincipalComponent } from './components/banner-principal/banner-principal.component';
import { PlanosComponent } from './components/planos/planos.component';
import { ClubeVantagensComponent } from './components/clube-vantagens/clube-vantagens.component';
import { DepoimentosComponent } from './components/depoimentos/depoimentos.component';
import { ContatoComponent } from './components/contato/contato.component';
import { FooterComponent } from './components/footer/footer.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { PainelApiService } from './services/painel-api.service';

@Component({
  selector: 'app-root',
  imports: [
    TopBarComponent,
    BannerPrincipalComponent,
    PlanosComponent,
    ClubeVantagensComponent,
    DepoimentosComponent,
    ContatoComponent,
    FooterComponent,
    RouterOutlet,
    NgIf
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'painel-imagens';

  isDarkTheme = false;
  router = inject(Router);

  constructor(private painelApi: PainelApiService) {
    // Carrega preferência do tema ao iniciar
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.isDarkTheme = savedTheme === 'dark';
    } else {
      // Detecta preferência do sistema
      this.isDarkTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    this.updateTheme();
    this.loadThemeFromBackend();
  }

  isHomeRoute() {
    return this.router.url === '/' || this.router.url === '';
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    localStorage.setItem('theme', this.isDarkTheme ? 'dark' : 'light');
    this.updateTheme();
    this.loadThemeFromBackend();
  }

  updateTheme() {
    if (this.isDarkTheme) {
      document.body.classList.add('dark-theme');
      document.documentElement.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
      document.documentElement.classList.remove('dark-theme');
    }
  }

  loadThemeFromBackend() {
    this.painelApi.getConfig().subscribe({
      next: (config) => {
        const themeConfig = this.isDarkTheme ? config.themeDark : config.themeLight;
        
        if (themeConfig) {
          Object.keys(themeConfig).forEach(key => {
            document.documentElement.style.setProperty(key, themeConfig[key]);
          });
        }
      },
      error: (error) => {
        console.error('Erro ao carregar tema do backend:', error);
      }
    });
  }
}
