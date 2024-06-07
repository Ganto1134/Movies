import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { iFavorites } from './Models/i-favorites';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private apiUrl: string = 'http://localhost:3000/favorites';

  constructor(private http: HttpClient) { }

  getFavorites(userId: number): Observable<iFavorites[]> {
    return this.http.get<iFavorites[]>(`${this.apiUrl}?userId=${userId}`);
  }

  addFavorite(favorite: iFavorites): Observable<iFavorites> {
    return this.http.post<iFavorites>(this.apiUrl, favorite);
  }

  removeFavorite(favoriteId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${favoriteId}`);
  }

}
