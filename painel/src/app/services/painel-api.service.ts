import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PainelApiService {
  private apiUrl = 'http://192.168.0.105:8080/painel-backend-php'; // Troque pelo endereço do seu backend

  constructor(private http: HttpClient) {}

  // Métodos de autenticação
  login(password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { password }, { withCredentials: true });
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true });
  }

  checkAuth(): Observable<any> {
    return this.http.get(`${this.apiUrl}/auth/check`, { withCredentials: true });
  }

  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', file);
    return this.http.post(`${this.apiUrl}/upload`, formData, { withCredentials: true });
  }

  getConfig(): Observable<any> {
    return this.http.get(`${this.apiUrl}/config`);
  }

  // Método para painel admin (agora público)
  getAdminConfig(): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/config`);
  }

  updateConfig(config: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/config`, config, { withCredentials: true });
  }
} 