import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { PainelApiService } from './painel-api.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const painelApi = inject(PainelApiService);
  const router = inject(Router);

  return painelApi.checkAuth().pipe(
    map(() => true),
    catchError(() => {
      router.navigate(['/admin-login']);
      return of(false);
    })
  );
}; 