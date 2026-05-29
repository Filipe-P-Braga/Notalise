import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../env/env';

export interface EventModel {
  title: string;
  subtitle?: string;
  date: string;
  local: string;
  imageUrl?: string;
  description: string;
  genres?: string | string[];
  format?: string | string[];
}

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private apiUrl = environment.apiUrl + '/event';

  constructor(private http: HttpClient) { }

  createEvent(event: EventModel): Observable<any> {
    const genresArray = Array.isArray(event.genres)
      ? event.genres
      : (event.genres ? event.genres.split(',').map(g => g.trim()).filter(g => g !== '') : []);

    const formatArray = Array.isArray(event.format)
      ? event.format
      : (event.format ? event.format.split(',').map(f => f.trim()).filter(f => f !== '') : []);

    const payload = {
      name: event.title,
      subtitle: event.subtitle || '',
      address: event.local,
      manager: 1,
      description: event.description,
      score: 0,
      image: event.imageUrl || '',
      genres: genresArray,
      format: formatArray,
      contentRating: 'Livre para todos os públicos',
      copyright: 'Notalise',
      daysID: 1
    };
    // responseType: 'text' pois o backend retorna Ok("Evento criado") que é texto, não JSON
    return this.http.post(`${this.apiUrl}/create`, payload, { responseType: 'text' });
  }

  getEvents(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getEventById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updateEvent(event: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update`, event, { responseType: 'text' });
  }
}
