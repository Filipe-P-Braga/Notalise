import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface StandModel {
  name: string;
  subtitle?: string;
  local?: string;
  description: string;
  eventId?: number;
  image?: string;
  genres?: string[];
  format?: string[];
  contentRating?: string;
  copyright?: string;
  daysID?: number;
}

@Injectable({
  providedIn: 'root'
})
export class StandService {
  private apiUrl = 'http://localhost:5000/stand';

  constructor(private http: HttpClient) { }

  createStand(stand: StandModel): Observable<any> {
    const payload = {
      eventId: stand.eventId || 1,
      name: stand.name,
      subtitle: stand.subtitle || '',
      local: stand.local || '',
      description: stand.description,
      score: 0,
      image: stand.image || '',
      genres: stand.genres || [],
      format: stand.format || [],
      contentRating: stand.contentRating || 'Livre para todos os públicos',
      copyright: stand.copyright || '',
      daysID: stand.daysID || 1
    };
    return this.http.post(`${this.apiUrl}/create`, payload, { responseType: 'text' });
  }

  getStands(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getStandById(id: number | string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
