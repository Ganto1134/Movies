import { Component } from '@angular/core';
import { FavoritesService } from '../../favorites.service';
import { AuthService } from '../../auth/auth.service';
import { iFavorites } from '../../Models/i-favorites';

@Component({
  selector: 'app-preferiti',
  templateUrl: './preferiti.component.html',
  styleUrl: './preferiti.component.scss'
})
export class PreferitiComponent {

  favorites: iFavorites[] = [];
  userId: number | null = null;

  constructor(
    private favoritesService: FavoritesService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.userId = user?.id || null;
      if (this.userId) {
        this.favoritesService.getFavorites(this.userId).subscribe((favorites) => {
          this.favorites = favorites;
        });
      }
    });
  }

}
