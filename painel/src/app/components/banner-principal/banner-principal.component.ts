import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-banner-principal',
  imports: [MatIconModule, LogoComponent],
  templateUrl: './banner-principal.component.html',
  styleUrl: './banner-principal.component.css'
})
export class BannerPrincipalComponent {

}
