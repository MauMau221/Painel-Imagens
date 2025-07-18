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
import { MatTooltipModule } from '@angular/material/tooltip';

interface ThemeVariable {
  name: string;
  label: string;
  defaultLight: string;
  defaultDark: string;
  isGradient?: boolean; // novo campo para identificar variáveis de fundo
}

const THEME_VARIABLES: ThemeVariable[] = [
  // Top Bar
  { name: '--bg-top-bar', label: 'Fundo do Top Bar', defaultLight: '#181c24', defaultDark: '#232b3a', isGradient: true },
  { name: '--text-top-bar', label: 'Texto do Top Bar', defaultLight: '#ffffff', defaultDark: '#ffffff' },
  { name: '--link-top-bar', label: 'Link do Top Bar', defaultLight: '#0acde7', defaultDark: '#0acde7' },
  { name: '--accent-top-bar', label: 'Botão/Ícone do Top Bar', defaultLight: '#0acde7', defaultDark: '#0acde7' },
  // Banner Principal
  { name: '--bg-banner-principal', label: 'Fundo do Banner Principal', defaultLight: '#f4f4f4', defaultDark: '#181c24', isGradient: true },
  { name: '--text-banner-principal', label: 'Texto do Banner Principal', defaultLight: '#181c24', defaultDark: '#f4f4f4' },
  { name: '--link-banner-principal', label: 'Link do Banner Principal', defaultLight: '#0acde7', defaultDark: '#0acde7' },
  { name: '--accent-banner-principal', label: 'Botão/Ícone do Banner Principal', defaultLight: '#0acde7', defaultDark: '#0acde7' },
  // Planos
  { name: '--bg-planos', label: 'Fundo dos Planos', defaultLight: '#ffffff', defaultDark: '#232b3a', isGradient: true },
  { name: '--text-planos', label: 'Texto dos Planos', defaultLight: '#232b3a', defaultDark: '#f4f4f4' },
  { name: '--link-planos', label: 'Link dos Planos', defaultLight: '#0acde7', defaultDark: '#0acde7' },
  { name: '--accent-planos', label: 'Botão/Ícone dos Planos', defaultLight: '#0acde7', defaultDark: '#0acde7' },
  // Clube de Vantagens
  { name: '--bg-clube-vantagens', label: 'Fundo do Clube de Vantagens', defaultLight: '#ffffff', defaultDark: '#181c24', isGradient: true },
  { name: '--text-clube-vantagens', label: 'Texto do Clube de Vantagens', defaultLight: '#181c24', defaultDark: '#f4f4f4' },
  { name: '--link-clube-vantagens', label: 'Link do Clube de Vantagens', defaultLight: '#0acde7', defaultDark: '#0acde7' },
  { name: '--accent-clube-vantagens', label: 'Botão/Ícone do Clube de Vantagens', defaultLight: '#0acde7', defaultDark: '#0acde7' },
  // Depoimentos
  { name: '--bg-depoimentos', label: 'Fundo dos Depoimentos', defaultLight: '#f4f4f4', defaultDark: '#232b3a', isGradient: true },
  { name: '--text-depoimentos', label: 'Texto dos Depoimentos', defaultLight: '#232b3a', defaultDark: '#f4f4f4' },
  { name: '--link-depoimentos', label: 'Link dos Depoimentos', defaultLight: '#0acde7', defaultDark: '#0acde7' },
  { name: '--accent-depoimentos', label: 'Botão/Ícone dos Depoimentos', defaultLight: '#0acde7', defaultDark: '#0acde7' },
  // Contato
  { name: '--bg-contato', label: 'Fundo do Contato', defaultLight: '#ffffff', defaultDark: '#181c24', isGradient: true },
  { name: '--text-contato', label: 'Texto do Contato', defaultLight: '#181c24', defaultDark: '#f4f4f4' },
  { name: '--link-contato', label: 'Link do Contato', defaultLight: '#0acde7', defaultDark: '#0acde7' },
  { name: '--accent-contato', label: 'Botão/Ícone do Contato', defaultLight: '#25d366', defaultDark: '#25d366' },
  // Botões do Contato
  { name: '--btn-whatsapp-bg', label: 'Botões WhatsApp (Contato)', defaultLight: '#25d366', defaultDark: '#25d366' },
  { name: '--btn-contato-bg', label: 'Botões de Ação (Contato)', defaultLight: '#ff9800', defaultDark: '#ff9800' },
  // Footer
  { name: '--bg-footer', label: 'Fundo do Footer', defaultLight: '#181c24', defaultDark: '#232b3a', isGradient: true },
  { name: '--text-footer', label: 'Texto do Footer', defaultLight: '#ffffff', defaultDark: '#ffffff' },
  { name: '--link-footer', label: 'Link do Footer', defaultLight: '#0acde7', defaultDark: '#0acde7' },
  { name: '--accent-footer', label: 'Botão/Ícone do Footer', defaultLight: '#0acde7', defaultDark: '#0acde7' },
];

// Adicionar variáveis para segunda cor do gradiente e ângulo
const GRADIENT_SUFFIX = '-2';
const GRADIENT_ANGLE_SUFFIX = '-angle';

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
    MatSnackBarModule,
    MatTooltipModule
  ],
  templateUrl: './admin-theme.component.html',
  styleUrl: './admin-theme.component.css'
})
export class AdminThemeComponent implements OnInit {
  variablesLight: { [key: string]: string } = {};
  variablesDark: { [key: string]: string } = {};
  gradientAnglesLight: { [key: string]: string } = {};
  gradientAnglesDark: { [key: string]: string } = {};
  public THEME_VARIABLES = THEME_VARIABLES;
  public componentGroups: { name: string, label: string, variables: ThemeVariable[] }[] = [];

  constructor(private snackBar: MatSnackBar, private painelApi: PainelApiService) {}

  ngOnInit(): void {
    this.loadThemeConfig();
    this.componentGroups = this.buildComponentGroups();
  }

  loadThemeConfig() {
    this.painelApi.getAdminConfig().subscribe(config => {
      const themeLight = config['themeLight'] || {};
      const themeDark = config['themeDark'] || {};
      THEME_VARIABLES.forEach(v => {
        if (v.isGradient) {
          this.variablesLight[v.name] = themeLight[v.name] || v.defaultLight;
          this.variablesLight[v.name + GRADIENT_SUFFIX] = themeLight[v.name + GRADIENT_SUFFIX] || v.defaultLight;
          this.variablesDark[v.name] = themeDark[v.name] || v.defaultDark;
          this.variablesDark[v.name + GRADIENT_SUFFIX] = themeDark[v.name + GRADIENT_SUFFIX] || v.defaultDark;
          this.gradientAnglesLight[v.name] = themeLight[v.name + GRADIENT_ANGLE_SUFFIX] || '90';
          this.gradientAnglesDark[v.name] = themeDark[v.name + GRADIENT_ANGLE_SUFFIX] || '90';
        } else {
          this.variablesLight[v.name] = themeLight[v.name] || v.defaultLight;
          this.variablesDark[v.name] = themeDark[v.name] || v.defaultDark;
        }
      });
    });
  }

  applyThemeVariables(variables: { [key: string]: string }, isDark: boolean) {
    THEME_VARIABLES.forEach(v => {
      if (v.isGradient) {
        const color1 = variables[v.name];
        const color2 = variables[v.name + GRADIENT_SUFFIX];
        const angle = (isDark ? this.gradientAnglesDark[v.name] : this.gradientAnglesLight[v.name]) || '90';
        // Sempre monta o gradiente completo na variável principal
        const gradient = `linear-gradient(${angle}deg, ${color1}, ${color2})`;
        document.documentElement.style.setProperty(v.name, gradient);
      } else {
        document.documentElement.style.setProperty(v.name, variables[v.name]);
      }
    });
    if (isDark) {
      document.documentElement.classList.add('dark-theme');
    } else {
      document.documentElement.classList.remove('dark-theme');
    }
  }

  updateColors() {
    const configUpdate: any = {
      themeLight: {},
      themeDark: {}
    };
    THEME_VARIABLES.forEach(v => {
      if (v.isGradient) {
        configUpdate.themeLight[v.name] = this.variablesLight[v.name];
        configUpdate.themeLight[v.name + GRADIENT_SUFFIX] = this.variablesLight[v.name + GRADIENT_SUFFIX];
        configUpdate.themeLight[v.name + GRADIENT_ANGLE_SUFFIX] = this.gradientAnglesLight[v.name] || '90';
        configUpdate.themeDark[v.name] = this.variablesDark[v.name];
        configUpdate.themeDark[v.name + GRADIENT_SUFFIX] = this.variablesDark[v.name + GRADIENT_SUFFIX];
        configUpdate.themeDark[v.name + GRADIENT_ANGLE_SUFFIX] = this.gradientAnglesDark[v.name] || '90';
      } else {
        configUpdate.themeLight[v.name] = this.variablesLight[v.name];
        configUpdate.themeDark[v.name] = this.variablesDark[v.name];
      }
    });
    this.painelApi.updateConfig(configUpdate).subscribe(() => {
      this.showMessage('Cores dos temas salvas!', 'success');
    }, error => {
      this.showMessage('Erro ao salvar cores!', 'error');
    });
  }

  getLabel(key: string): string {
    const found = this.THEME_VARIABLES.find(t => t.name === key);
    return found ? found.label : key;
  }

  buildComponentGroups() {
    // Agrupa as variáveis por componente
    const groups: { name: string, label: string, variables: ThemeVariable[] }[] = [];
    const map: { [key: string]: { name: string, label: string, variables: ThemeVariable[] } } = {};
    for (const v of THEME_VARIABLES) {
      // Agrupamento: botões do contato vão junto do grupo 'contato'
      const match = v.name.match(/^--(bg|text|link|accent)-([a-z-]+)/);
      if (match) {
        const comp = match[2];
        const label = this.getComponentLabel(comp);
        if (!map[comp]) {
          map[comp] = { name: comp, label, variables: [] };
          groups.push(map[comp]);
        }
        map[comp].variables.push(v);
        // Se for grupo contato, adiciona também as variáveis de botão
        if (comp === 'contato') {
          const btnVars = THEME_VARIABLES.filter(x => x.name === '--btn-whatsapp-bg' || x.name === '--btn-contato-bg');
          for (const btnVar of btnVars) {
            if (!map[comp].variables.includes(btnVar)) {
              map[comp].variables.push(btnVar);
            }
          }
        }
        continue;
      }
    }
    return groups;
  }

  getComponentLabel(comp: string): string {
    switch (comp) {
      case 'top-bar': return 'Top Bar';
      case 'banner-principal': return 'Banner Principal';
      case 'planos': return 'Planos';
      case 'clube-vantagens': return 'Clube de Vantagens';
      case 'depoimentos': return 'Depoimentos';
      case 'contato': return 'Contato';
      case 'footer': return 'Footer';
      default: return comp;
    }
  }

  getComponentIcon(comp: string): string {
    switch (comp) {
      case 'top-bar': return 'space_dashboard';
      case 'banner-principal': return 'photo';
      case 'planos': return 'signal_cellular_alt';
      case 'clube-vantagens': return 'card_giftcard';
      case 'depoimentos': return 'chat';
      case 'contato': return 'support_agent';
      case 'footer': return 'horizontal_rule';
      default: return 'widgets';
    }
  }

  showMessage(message: string, type: 'success' | 'error'): void {
    this.snackBar.open(message, 'Fechar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: type === 'success' ? ['success-snackbar'] : ['error-snackbar']
    });
  }
} 