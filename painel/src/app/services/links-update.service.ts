import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LinksUpdateService {
  private linksUpdatedSource = new Subject<void>();
  linksUpdated$ = this.linksUpdatedSource.asObservable();

  notifyLinksUpdated() {
    this.linksUpdatedSource.next();
  }
} 