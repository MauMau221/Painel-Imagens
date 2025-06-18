import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { BannerPrincipalComponent } from './components/banner-principal/banner-principal.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, BannerPrincipalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'painel-imagens';
}
