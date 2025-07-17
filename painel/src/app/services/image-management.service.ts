import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export interface ImageInfo {
  id: string;
  path: string;
  alt: string;
  component: string;
  description: string;
  currentSrc: string;
}

@Injectable({
  providedIn: 'root'
})
export class ImageManagementService {
  private images: ImageInfo[] = [
    {
      id: 'banner-desktop',
      path: '/assets/banner.png',
      alt: 'Banner principal',
      component: 'Banner Principal',
      description: 'Banner principal da página inicial (desktop)',
      currentSrc: '/assets/banner.png'
    },
    {
      id: 'banner-mobile',
      path: '/assets/bannerMobile.png',
      alt: 'Banner principal mobile',
      component: 'Banner Principal',
      description: 'Banner principal da página inicial (mobile)',
      currentSrc: '/assets/bannerMobile.png'
    },
    {
      id: 'logo',
      path: '/assets/logo.png',
      alt: 'Logo',
      component: 'Logo',
      description: 'Logo da empresa',
      currentSrc: '/assets/logo.png'
    },
    {
      id: 'depoimentos',
      path: '/assets/testee.png',
      alt: 'Depoimentos',
      component: 'Depoimentos',
      description: 'Imagem da seção de depoimentos',
      currentSrc: '/assets/testee.png'
    },
    {
      id: 'vantagens-desktop',
      path: '/assets/vantagens.png',
      alt: 'Vantagens do Clube',
      component: 'Clube Vantagens',
      description: 'Imagem das vantagens do clube (desktop)',
      currentSrc: '/assets/vantagens.png'
    },
    {
      id: 'vantagens-mobile',
      path: '/assets/11.png',
      alt: 'Vantagens do Clube Mobile',
      component: 'Clube Vantagens',
      description: 'Imagem das vantagens do clube (mobile)',
      currentSrc: '/assets/11.png'
    },
    {
      id: 'plano-500',
      path: '/assets/planos/500.png',
      alt: 'Plano 500 Mega',
      component: 'Planos',
      description: 'Imagem do Plano 500 Mega',
      currentSrc: '/assets/planos/500.png'
    },
    {
      id: 'plano-700',
      path: '/assets/planos/700.png',
      alt: 'Plano 700 Mega',
      component: 'Planos',
      description: 'Imagem do Plano 700 Mega',
      currentSrc: '/assets/planos/700.png'
    },
    {
      id: 'plano-1000',
      path: '/assets/planos/800.png',
      alt: 'Plano 1000 Mega',
      component: 'Planos',
      description: 'Imagem do Plano 800 Mega',
      currentSrc: '/assets/planos/800.png'
    },
    {
      id: 'atendente',
      path: '/assets/atendente.png',
      alt: 'Atendente',
      component: 'Contato',
      description: 'Imagem do atendente na seção de contato',
      currentSrc: '/assets/atendente.png'
    }
  ];

  constructor(private http: HttpClient) {}

  getAllImages(): Observable<ImageInfo[]> {
    return of(this.images);
  }

  getImageById(id: string): Observable<ImageInfo | undefined> {
    const image = this.images.find(img => img.id === id);
    return of(image);
  }

  updateImage(id: string, newImage: File): Observable<boolean> {
    // Simula o upload da imagem
    return new Observable(observer => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const image = this.images.find(img => img.id === id);
        if (image) {
          image.currentSrc = e.target?.result as string;
          observer.next(true);
          observer.complete();
        } else {
          observer.next(false);
          observer.complete();
        }
      };
      reader.readAsDataURL(newImage);
    });
  }

  // Método para simular o envio para o servidor
  uploadImageToServer(imageFile: File, imageId: string): Observable<any> {
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('imageId', imageId);
    
    // Aqui você faria a chamada real para o servidor
    // return this.http.post('/api/upload-image', formData);
    
    // Por enquanto, simulamos uma resposta
    return of({ success: true, message: 'Imagem atualizada com sucesso' });
  }
} 