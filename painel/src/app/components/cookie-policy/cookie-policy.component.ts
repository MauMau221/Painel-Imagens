import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cookie-policy',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cookie-policy.component.html',
  styleUrls: ['./cookie-policy.component.css']
})
export class CookiePolicyComponent implements OnInit {
  showCookieBanner = false;

  ngOnInit() {
    // Verifica se o usuário já aceitou os cookies
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (!cookiesAccepted) {
      this.showCookieBanner = true;
    }
  }

  acceptCookies() {
    localStorage.setItem('cookiesAccepted', 'true');
    this.showCookieBanner = false;
  }
} 