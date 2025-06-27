import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BannerPrincipalComponent } from './components/banner-principal/banner-principal.component';
import { PlanosComponent } from './components/planos/planos.component';
import { ClubeVantagensComponent } from './components/clube-vantagens/clube-vantagens.component';
import { ContatoComponent } from './components/contato/contato.component';
import { FooterComponent } from './components/footer/footer.component';
import { InfoBarComponent } from './components/info-bar/info-bar.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    TopBarComponent,
    BannerPrincipalComponent,
    PlanosComponent,
    ClubeVantagensComponent,
    InfoBarComponent,
    ContatoComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'painel-imagens';
}
