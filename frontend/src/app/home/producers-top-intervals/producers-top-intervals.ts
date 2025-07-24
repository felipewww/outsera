import {Component, signal} from '@angular/core';
import {Card} from '../../../components/card/card';
import {Table, TableHeader} from '../../../components/table/table';
import {MoviesService} from '../../../services/movies.service';
import {ProducersIntervalResponse} from '../../../services/dtos/max-min-Interval.dto';

@Component({
  selector: 'producers-top-intervals',
  imports: [
    Card,
    Table
  ],
  templateUrl: './producers-top-intervals.html',
  styleUrl: './producers-top-intervals.css'
})
export class ProducersTopIntervals {
  intervals = signal<ProducersIntervalResponse>({
    min: [],
    max: []
  })

  tableHeader: TableHeader[] = [
    { label: 'Producer'} ,
    { label: 'Interval' },
    { label: 'Previous year' },
    { label: 'Following year' },
  ]

  constructor(
    private movieService: MoviesService,
  ) {
    this.movieService.maxMinWinIntervalForProducers()
      .subscribe(
        (data) => this.intervals.set(data)
      );
  }

  mapMaxToTable(): string[][] {
    return this.intervals().max.map(m => {
      return [
        m.producer,
        m.interval.toString(),
        m.previousWin.toString(),
        m.followingWin.toString(),
      ]
    })
  }

  mapMinToTable() {
    return this.intervals().min.map(m => {
      return [
        m.producer,
        m.interval.toString(),
        m.previousWin.toString(),
        m.followingWin.toString(),
      ]
    })
  }
}
