import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../env/env';

@Injectable({
  providedIn: 'root'
})
export class UserActivityService {
  private apiUrl = environment.apiUrl + '/useractivity';

  constructor(private http: HttpClient) { }

  getUserActivities(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
