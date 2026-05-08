import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EventModel {
  title: string;
  date: string;
  local: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {
  // Ajuste a URL se necessário (https://localhost:7185/event ou http://localhost:5000/event)
  private apiUrl = 'http://localhost:5000/event';

  constructor(private http: HttpClient) { }

  createEvent(event: EventModel): Observable<any> {
    // O backend (C#) espera um objeto com Name, Address, Description, e Score
    const payload = {
      name: event.title,
      subtitle: '',
      address: event.local,
      manager: 1,
      description: event.description,
      score: 0,
      image: '',
      genres: [],
      format: [],
      contentRating: 'Livre para todos os públicos',
      copyright: '',
      daysID: 1
    };
    // responseType: 'text' pois o backend retorna Ok("Evento criado") que é texto, não JSON
    return this.http.post(`${this.apiUrl}/create`, payload, { responseType: 'text' });
  }
}
