import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cookie-policy-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cookie-policy-page.component.html',
  styleUrls: ['./cookie-policy-page.component.css']
})
export class CookiePolicyPageComponent {
  currentDate = new Date().toLocaleDateString('pt-BR');
} 