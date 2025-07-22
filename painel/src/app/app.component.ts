import { Component, OnInit } from '@angular/core';
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
export class AppComponent implements OnInit {
  title = 'painel-imagens';

  isDarkTheme = false;
  router = inject(Router);
  isAdminLogged = false;

  constructor(private painelApi: PainelApiService) {

  }

  ngOnInit() {
    // Leia o valor do localStorage para 'theme'
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.isDarkTheme = savedTheme === 'dark';
    } else {
      // Detecta preferência do sistema
      this.isDarkTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    this.updateTheme();
    this.loadThemeFromBackend();

    // Verifica se admin está logado
    this.painelApi.checkAuth().subscribe({
      next: (res) => {
        this.isAdminLogged = res && res.authenticated;
      },
      error: () => {
        this.isAdminLogged = false;
      }
    });
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
            // Detecta se é uma variável de fundo com gradiente
            if (key.startsWith('--bg-') && themeConfig[key + '-2'] && themeConfig[key + '-angle']) {
              const cor1 = themeConfig[key];
              const cor2 = themeConfig[key + '-2'];
              const angle = themeConfig[key + '-angle'] || '90';
              const gradient = `linear-gradient(${angle}deg, ${cor1}, ${cor2})`;
              document.documentElement.style.setProperty(key, gradient);
            } else if (!key.endsWith('-2') && !key.endsWith('-angle')) {
              // Aplica normalmente para variáveis que não são gradiente
              document.documentElement.style.setProperty(key, themeConfig[key]);
            }
          });
        }
      },
      error: (error) => {
        console.error('Erro ao carregar tema do backend:', error);
      }
    });
  }
}
