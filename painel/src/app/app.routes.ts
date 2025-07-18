import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'downloads', loadComponent: () => import('./components/downloads/downloads.component').then(m => m.DownloadsComponent) },
  { path: 'contratos', loadComponent: () => import('./components/contratos/contratos.component').then(m => m.ContratosComponent) },
  { path: 'admin-login', loadComponent: () => import('./components/admin-login/admin-login.component').then(m => m.AdminLoginComponent) },
  { path: 'admin-images', loadComponent: () => import('./components/admin-images/admin-images.component').then(m => m.AdminImagesComponent) },
  { path: 'admin-theme', loadComponent: () => import('./components/admin-theme/admin-theme.component').then(m => m.AdminThemeComponent) },
  { path: 'privacidade', loadComponent: () => import('./components/privacidade/privacidade.component').then(m => m.PrivacidadeComponent) },
  { path: 'termos', loadComponent: () => import('./components/termos/termos.component').then(m => m.TermosComponent) },
  {
    path: 'admin-edit-links',
    loadComponent: () => import('./components/edit-links/edit-links.component').then(m => m.EditLinksComponent)
  },
];
