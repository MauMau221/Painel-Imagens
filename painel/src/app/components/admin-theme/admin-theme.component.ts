import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PainelApiService } from '../../services/painel-api.service';

interface ThemeVariable {
  name: string;
  label: string;
  defaultLight: string;
  defaultDark: string;
}

const THEME_VARIABLES: ThemeVariable[] = [
  { name: '--color-dark-blue', label: 'Azul Escuro', defaultLight: '#000018', defaultDark: '#181818' },
  { name: '--color-blue', label: 'Azul', defaultLight: '#026cc8', defaultDark: '#23234a' },
  { name: '--color-orange', label: 'Laranja', defaultLight: '#0acde7', defaultDark: '#026cc8' },
  { name: '--color-white', label: 'Branco', defaultLight: '#ffffff', defaultDark: '#181818' },
  { name: '--color-light-gray', label: 'Cinza Claro', defaultLight: '#f4f4f4', defaultDark: '#23234a' },
  { name: '--color-cyan', label: 'Ciano', defaultLight: '#0acde7', defaultDark: '#0acde7' },
  { name: '--color-cyan-hover', label: 'Ciano Hover', defaultLight: '#6de5f5', defaultDark: '#6de5f5' },
  { name: '--color-orange-light', label: 'Laranja Claro', defaultLight: '#ffc373', defaultDark: '#23234a' },
  { name: '--color-whatsapp-green', label: 'Verde WhatsApp', defaultLight: '#25d366', defaultDark: '#128c7e' },
  { name: '--color-whatsapp-hover', label: 'WhatsApp Hover', defaultLight: '#20b859', defaultDark: '#075e54' },
  { name: '--main-bg-color', label: 'Fundo Principal', defaultLight: '#ffffff', defaultDark: '#181818' },
  { name: '--main-text-color', label: 'Texto Principal', defaultLight: '#000000', defaultDark: '#ffffff' },
  { name: '--main-link-color', label: 'Links', defaultLight: '#1976d2', defaultDark: '#90caf9' },
  { name: '--main-button-color', label: 'Botões', defaultLight: '#388e3c', defaultDark: '#43a047' }
];

@Component({
  selector: 'app-admin-theme',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule
  ],
  templateUrl: './admin-theme.component.html',
  styleUrl: './admin-theme.component.css'
})
export class AdminThemeComponent implements OnInit {
  isDark = false;
  variables: { [key: string]: string } = {};
  public THEME_VARIABLES = THEME_VARIABLES;

  constructor(private snackBar: MatSnackBar, private painelApi: PainelApiService) {}

  ngOnInit(): void {
    this.painelApi.getConfig().subscribe(config => {
      const themeVars = this.isDark ? config.themeDark : config.themeLight;
      THEME_VARIABLES.forEach(v => {
        this.variables[v.name] = (themeVars && themeVars[v.name]) || (this.isDark ? v.defaultDark : v.defaultLight);
      });
      this.applyThemeVariables();
    });
  }

  applyThemeVariables() {
    THEME_VARIABLES.forEach(v => {
      if (this.isDark) {
        document.documentElement.classList.add('dark-theme');
        document.documentElement.style.setProperty(v.name, this.variables[v.name]);
      } else {
        document.documentElement.classList.remove('dark-theme');
        document.documentElement.style.setProperty(v.name, this.variables[v.name]);
      }
    });
  }

  updateColors() {
    const configUpdate = this.isDark
      ? { themeDark: this.variables }
      : { themeLight: this.variables };
    this.painelApi.updateConfig(configUpdate).subscribe(() => {
      this.applyThemeVariables();
      this.snackBar.open('Cores do tema ' + (this.isDark ? 'escuro' : 'claro') + ' salvas!', 'Fechar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['success-snackbar']
      });
    });
  }

  toggleThemeEdit() {
    this.isDark = !this.isDark;
    this.ngOnInit();
  }

  getLabel(key: string): string {
    const found = this.THEME_VARIABLES.find(t => t.name === key);
    return found ? found.label : key;
  }
} 