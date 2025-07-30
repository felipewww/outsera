import {Component, signal} from '@angular/core';
import {MoviesService} from '../../../services/movies.service';
import {YearsMultipleWinnersResponse} from '../../../services/dtos/years-multiple-winners.dto';
import {Table, TableHeader} from '../../../components/table/table';
import {Card} from '../../../components/card/card';

@Component({
  selector: 'list-multiple-winners',
  standalone: true,
  imports: [
    Table,
    Card
  ],
  templateUrl: './list-multiple-winners.html',
  styleUrl: './list-multiple-winners.css'
})
export class ListMultipleWinners {
  movies = signal<YearsMultipleWinnersResponse>({
    years: []
  })

  tableHeader: TableHeader[] = [
    { label: 'Year'} ,
    { label: 'Wins Count' }
  ]

  constructor(
    private movieService: MoviesService,
  ) {
    this.movieService.yearsWithMultipleWinners()
      .subscribe(
        (data) => this.movies.set(data)
      );
  }

  mapYearToTableData() {
    return this.movies().years.map(info => {
      return [
        info.year.toString(),
        info.winnerCount.toString()
      ]
    })
  }
}
