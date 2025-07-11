import { Component } from '@angular/core';
import { BannerPrincipalComponent } from './components/banner-principal/banner-principal.component';
import { PlanosComponent } from './components/planos/planos.component';
import { ClubeVantagensComponent } from './components/clube-vantagens/clube-vantagens.component';
import { DepoimentosComponent } from './components/depoimentos/depoimentos.component';
import { ContatoComponent } from './components/contato/contato.component';
import { FooterComponent } from './components/footer/footer.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';

@Component({
  selector: 'app-root',
  imports: [
    TopBarComponent,
    BannerPrincipalComponent,
    PlanosComponent,
    ClubeVantagensComponent,
    DepoimentosComponent,
    ContatoComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'painel-imagens';

  isDarkTheme = false;

  constructor() {
    // Carrega preferência do tema ao iniciar
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.isDarkTheme = savedTheme === 'dark';
    } else {
      // Detecta preferência do sistema
      this.isDarkTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    this.updateTheme();
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    localStorage.setItem('theme', this.isDarkTheme ? 'dark' : 'light');
    this.updateTheme();
  }

  updateTheme() {
    if (this.isDarkTheme) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }
}
