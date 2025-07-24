import {Component, signal} from '@angular/core';
import {Card} from '../../../components/card/card';
import {Table, TableHeader} from '../../../components/table/table';
import {StudiosWinCountResponse} from '../../../services/dtos/studios-win-count.dto';
import {MoviesService} from '../../../services/movies.service';

@Component({
  selector: 'top-studios',
  imports: [
    Card,
    Table
  ],
  templateUrl: './top-studios.html',
  styleUrl: './top-studios.css'
})
export class TopStudios {
  studios = signal<StudiosWinCountResponse>({
    studios: []
  })

  tableHeader: TableHeader[] = [
    { label: 'Name'} ,
    { label: 'Wins Count' }
  ]

  constructor(
    private movieService: MoviesService,
  ) {
    this.movieService.studiosWinCount()
      .subscribe(
        (data) => this.studios.set(data)
      );
  }

  mapToTable() {
    const result: string[][] = [];
    let i = 0;
    while (i < 3) {
      const studio = this.studios().studios[i];
      result.push([
        studio.name,
        studio.winCount.toString()
      ])
      i++;
    }

    return result;
  }
}
