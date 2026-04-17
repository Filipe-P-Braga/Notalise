import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CommentModel {
  standId: number;
  text: string;
  score: number;
  userId?: string;
  type?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://localhost:5000/comment';

  constructor(private http: HttpClient) { }

  createComment(comment: CommentModel): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, comment);
  }
}
