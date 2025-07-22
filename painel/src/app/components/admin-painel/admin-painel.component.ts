import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-admin-painel',
  standalone: true,
  imports: [RouterModule, MatButtonModule, MatIconModule],
  template: `
    <div style="max-width: 400px; margin: 40px auto; text-align: center;">
      <h2>Painel Administrativo</h2>
      <button mat-raised-button color="primary" routerLink="/admin-edit-links" style="margin: 12px 0; width: 100%;">
        <mat-icon>link</mat-icon> Editar Links
      </button>
      <button mat-raised-button color="accent" routerLink="/admin-theme" style="margin: 12px 0; width: 100%;">
        <mat-icon>palette</mat-icon> Temas
      </button>
      <button mat-raised-button color="warn" routerLink="/admin-images" style="margin: 12px 0; width: 100%;">
        <mat-icon>image</mat-icon> Imagens
      </button>
    </div>
  `
})
export class AdminPainelComponent {} 