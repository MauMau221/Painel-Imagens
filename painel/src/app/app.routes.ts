import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'downloads', loadComponent: () => import('./components/downloads/downloads.component').then(m => m.DownloadsComponent) },
  { path: 'contratos', loadComponent: () => import('./components/contratos/contratos.component').then(m => m.ContratosComponent) },
  { path: 'admin', loadComponent: () => import('./components/admin-images/admin-images.component').then(m => m.AdminImagesComponent) }
];
