import {Component, signal} from '@angular/core';
import {MoviesService} from '../../../services/movies.service';
import {YearsMultipleWinnersDto} from '../../../services/dtos/years-multiple-winners.dto';

@Component({
  selector: 'list-multiple-winners',
  imports: [],
  templateUrl: './list-multiple-winners.html',
  styleUrl: './list-multiple-winners.css'
})
export class ListMultipleWinners {
  movies = signal<YearsMultipleWinnersDto>({
    years: []
  })

  constructor(
    private movieService: MoviesService,
  ) {
    this.movieService.yearsWithMultipleWinners()
      .subscribe(
        (data) => this.movies.set(data)
      );
  }
}
