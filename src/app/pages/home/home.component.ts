import { Component } from '@angular/core';
import { iMovie } from '../../Models/i-movie';
import { MovieService } from '../../movie.service';
import { FavoritesService } from '../../favorites.service';
import { iFavorites } from '../../Models/i-favorites';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  movies: iMovie[] = [];
  favorites: iFavorites[] = [];
  userId: number | null = null;

  constructor(
    private movieService: MovieService,
    private favoritesService: FavoritesService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.movieService.getMovies().subscribe((movies) => {
      this.movies = movies;
    });

    this.authService.user$.subscribe(user => {
      this.userId = user?.id || null;
      if (this.userId) {
        this.favoritesService.getFavorites(this.userId).subscribe((favorites) => {
          this.favorites = favorites;
        });
      }
    });
  }

  isFavorite(movie: iMovie): boolean {
    return this.favorites.some(fav => fav.movie.id === movie.id);
  }

  toggleFavorite(movie: iMovie): void {
    if (this.userId === null) {
      console.log('utente non trovato');
      return;
    }

    const favorite = this.favorites.find(fav => fav.movie.id === movie.id);
    if (favorite) {
      this.favoritesService.removeFavorite(favorite.id).subscribe(() => {
        this.favorites = this.favorites.filter(fav => fav.movie.id !== movie.id);
      });
    } else {
      const newFavorite: iFavorites = {
        userId: this.userId,
        movie: movie,
        id: 0,
      };
      this.favoritesService.addFavorite(newFavorite).subscribe((fav) => {
        this.favorites.push(fav);
      });
    }
  }
}
