import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { PainelApiService } from '../../services/painel-api.service';
import { LinksUpdateService } from '../../services/links-update.service';

interface LinkGroup {
  key: string;
  label: string;
  links: { [key: string]: string };
}

@Component({
  selector: 'app-edit-links',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatIconModule
  ],
  templateUrl: './edit-links.component.html',
  styleUrl: './edit-links.component.css'
})
export class EditLinksComponent implements OnInit {
  linkGroups: LinkGroup[] = [];
  isLoading = false;

  // Labels amigáveis para os grupos
  groupLabels: { [key: string]: string } = {
    principal: 'Banner-Principal',
    planos: 'Planos',
    aplicativo: 'Depoimentos',
    contato: 'Contato',
    footer: 'Footer',
    depoimentos: 'Depoimentos',
    'clube-vantagens': 'Clube-Vantagens',
    // Adicione mais se necessário
  };

  constructor(private painelApi: PainelApiService, private snackBar: MatSnackBar, private linksUpdate: LinksUpdateService) {}

  ngOnInit() {
    this.painelApi.getAdminConfig().subscribe(config => {
      const allLinks = config.links || { contato: {}, planos: {}, footer: {}, depoimentos: {} };
      // Lógica dinâmica para planos
      const planosArray = config.planos || [];
      const linksPlanos = allLinks.planos || {};
      const allPlanosKeys = planosArray.map((p: any) => 'plano' + p.nome);
      const planosLinks: { [key: string]: string } = {};
      allPlanosKeys.forEach((key: string) => {
        planosLinks[key] = linksPlanos[key] || '';
      });
      // Monta os grupos normalmente, mas substitui o grupo planos pelo dinâmico
      this.linkGroups = Object.keys(allLinks).map((key: string) => {
        if (key === 'planos') {
          return {
            key,
            label: this.groupLabels[key] || key,
            links: planosLinks
          };
        }
        // Mapeia "aplicativo" para "depoimentos" na interface
        const displayKey = key === 'aplicativo' ? 'depoimentos' : key;
        return {
          key: displayKey,
          label: this.groupLabels[displayKey] || displayKey,
          links: { ...allLinks[key] }
        };
      });
    });
  }

  saveLinks() {
    this.isLoading = true;
    // Monta objeto links para salvar
    const linksToSave: { [key: string]: { [key: string]: string } } = {};
    this.linkGroups.forEach(group => {
      // Mapeia "depoimentos" de volta para "aplicativo" ao salvar
      const saveKey = group.key === 'depoimentos' ? 'aplicativo' : group.key;
      linksToSave[saveKey] = { ...group.links };
    });
    this.painelApi.updateConfig({ links: linksToSave }).subscribe({
      next: () => {
        this.isLoading = false;
        this.snackBar.open('Links atualizados com sucesso!', 'Fechar', { duration: 3000, panelClass: ['success-snackbar'] });
        this.linksUpdate.notifyLinksUpdated();
      },
      error: () => {
        this.isLoading = false;
        this.snackBar.open('Erro ao atualizar links!', 'Fechar', { duration: 3000, panelClass: ['error-snackbar'] });
      }
    });
  }

  getLinkKeys(group: LinkGroup) {
    return Object.keys(group.links);
  }

  trackByKey(index: number, key: string) {
    return key;
  }
} 