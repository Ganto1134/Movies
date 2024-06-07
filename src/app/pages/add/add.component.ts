import { Component } from '@angular/core';
import { iMovie } from '../../Models/i-movie';
import { MovieService } from '../../movie.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss'
})
export class AddComponent {

  movie: Partial<iMovie> = {
    title: '',
    description: '',
    cover: '',
    available: false
  };

  formSubmitted = false;

  constructor(private movieService: MovieService) { }

  addMovie() {
    this.formSubmitted = true;
    if (this.movieService.isFormValid(this.movie)) {
      this.movieService.create(this.movie).subscribe((newMovie) => {
        console.log('Movie added:', newMovie);
        this.resetForm();
      });
    }
  }

  resetForm() {
    this.movie = {
      title: '',
      description: '',
      cover: '',
      available: false
    };
    this.formSubmitted = false;
  }

}
