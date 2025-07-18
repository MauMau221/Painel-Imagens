import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PainelApiService {
  private apiUrl = 'http://localhost/painel-backend-php'; // Troque pelo endereço do seu backend

  constructor(private http: HttpClient) {}

  // Métodos de autenticação
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login.php`, { username, password }, { withCredentials: true });
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout.php`, {}, { withCredentials: true });
  }

  checkAuth(): Observable<any> {
    return this.http.get(`${this.apiUrl}/check-auth.php`, { withCredentials: true });
  }

  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', file);
    return this.http.post(`${this.apiUrl}/upload.php`, formData, { withCredentials: true });
  }

  getConfig(): Observable<any> {
    return this.http.get(`${this.apiUrl}/config-get.php`);
  }

  // Método para painel admin (agora público)
  getAdminConfig(): Observable<any> {
    return this.http.get(`${this.apiUrl}/config-get.php`);
  }

  updateConfig(config: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/config-set.php`, config, { withCredentials: true });
  }
} 