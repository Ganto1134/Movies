import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iMovie } from './Models/i-movie';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private apiUrl: string = 'http://localhost:3000/movies-popular';

  constructor(private http: HttpClient) { }

  getMovies(): Observable<iMovie[]> {
    return this.http.get<iMovie[]>(this.apiUrl);
  }

  create(newMovie:Partial<iMovie>){
    return this.http.post<iMovie>(this.apiUrl, newMovie)
  }

  update(movie: iMovie): Observable<iMovie> {
    const url = `${this.apiUrl}/${movie.id}`;
    return this.http.put<iMovie>(url, movie);
  }

  getsingleMovie(id: number): Observable<iMovie> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<iMovie>(url);
  }

  isFormValid(movie: Partial<iMovie>): boolean {
    return (
      movie.title !== undefined && movie.title !== '' &&
      movie.description !== undefined && movie.description !== '' &&
      movie.cover !== undefined && movie.cover !== ''
    );
  }

}
