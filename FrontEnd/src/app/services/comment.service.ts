import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CommentModel {
  StandId: number;
  Text: string;
  Score: number;
  UserId?: string;
  Type?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://localhost:5000/comment';

  constructor(private http: HttpClient) { }

  createComment(comment: any): Observable<any> {
    // O formulário no Angular gera as propriedades em minúsculo (userId, type, text, etc).
    // A interface TypeScript não muda os nomes dessas propriedades em tempo de execução.
    // Vamos garantir que a conversão ocorra independente do formato:
    const payload = {
      StandId: comment.standId || comment.StandId || null,
      EventId: comment.eventId || comment.EventId || null,
      Text: comment.text || comment.Text,
      Score: comment.score || comment.Score,
      //UserId: (comment.userId === '' || comment.UserId === '') ? null : (comment.userId || comment.UserId),
      UserId: null,
      Type: (comment.type === '' || comment.Type === '') ? null : (comment.type || comment.Type),
      Date: new Date().toISOString()
    };

    return this.http.post(`${this.apiUrl}/create`, payload);
  }

  getCommentsByStandId(standId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/stand/${standId}`);
  }

  getCommentsByEventId(eventId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/event/${eventId}`);
  }
}
