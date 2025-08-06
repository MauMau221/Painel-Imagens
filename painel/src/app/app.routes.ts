import { Routes } from '@angular/router';
import { authGuard } from './services/auth.guard';
import { AdminPainelComponent } from './components/admin-painel/admin-painel.component';

export const routes: Routes = [
  { path: 'downloads', loadComponent: () => import('./components/downloads/downloads.component').then(m => m.DownloadsComponent) },
  { path: 'contratos', loadComponent: () => import('./components/contratos/contratos.component').then(m => m.ContratosComponent) },
  { path: 'admin-login', loadComponent: () => import('./components/admin-login/admin-login.component').then(m => m.AdminLoginComponent) },
  { path: 'admin-images', loadComponent: () => import('./components/admin-images/admin-images.component').then(m => m.AdminImagesComponent), canActivate: [authGuard] },
  { path: 'admin-theme', loadComponent: () => import('./components/admin-theme/admin-theme.component').then(m => m.AdminThemeComponent), canActivate: [authGuard] },
  { path: 'privacidade', loadComponent: () => import('./components/privacidade/privacidade.component').then(m => m.PrivacidadeComponent) },
  { path: 'termos', loadComponent: () => import('./components/termos/termos.component').then(m => m.TermosComponent) },
  {
    path: 'admin-edit-links',
    loadComponent: () => import('./components/edit-links/edit-links.component').then(m => m.EditLinksComponent),
    canActivate: [authGuard]
  },
  { path: 'admin-painel', loadComponent: () => import('./components/admin-painel/admin-painel.component').then(m => m.AdminPainelComponent), canActivate: [authGuard] },
  { path: 'politica-cookies', loadComponent: () => import('./components/cookie-policy-page/cookie-policy-page.component').then(m => m.CookiePolicyPageComponent) },
];
