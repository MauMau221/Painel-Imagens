import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PainelApiService {
  private apiUrl = 'http://192.168.1.30:3000'; // Troque pelo endereço do seu backend

  constructor(private http: HttpClient) {}

  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', file);
    return this.http.post(`${this.apiUrl}/upload`, formData);
  }

  getConfig(): Observable<any> {
    return this.http.get(`${this.apiUrl}/config`);
  }

  updateConfig(config: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/config`, config);
  }
} 