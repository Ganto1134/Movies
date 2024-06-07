import { Component } from '@angular/core';
import { MovieService } from '../../movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { iMovie } from '../../Models/i-movie';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent {

  movie: Partial<iMovie> = {
    id: 0,
    title: '',
    description: '',
    cover: '',
    available: false
  };

  formSubmitted = false;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
        const movieId = params.get('id');
        if (movieId) {
          this.movieService.getsingleMovie(+movieId).subscribe((movie) => {
            this.movie = movie;
          });
        } else {
          console.error('Id non trovato');
        }
    });
  }

  editMovie() {
    this.formSubmitted = true;
    if (this.movieService.isFormValid(this.movie)) {
      this.movieService.update(this.movie as iMovie).subscribe((updatedMovie) => {
        console.log('Film aggiornato:', updatedMovie);
        this.router.navigate(['/home']);
      });
    }
  }

}
