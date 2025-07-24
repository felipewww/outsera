import {Component, signal, ViewChild} from '@angular/core';
import {Card} from '../../../components/card/card';
import {Table, TableHeader} from '../../../components/table/table';
import {MovieItem} from '../../../services/dtos/list-movies.dto';
import {MoviesService} from '../../../services/movies.service';
import {FormsModule} from '@angular/forms';
import {ListMoviesInput} from '../../../services/input/list-movies.input';
import {Pagination} from '../../../components/pagination/pagination';

@Component({
  selector: 'winners-list',
  standalone: true,
  imports: [
    Card,
    Table,
    FormsModule,
    Pagination
  ],
  templateUrl: './winners-list.html',
  styleUrl: './winners-list.css'
})
export class WinnersList {
  @ViewChild(Pagination) paginationComponent!: Pagination;

  movies = signal<MovieItem[]>([])
  year = signal<string>('')

  tableHeader: TableHeader[] = [
    { label: 'Id'} ,
    { label: 'year'} ,
    { label: 'Title' }
  ]

  constructor(
    private movieService: MoviesService,
  ) {
  }

  mapToTable(): string[][] {
    return this.movies().map((movie: MovieItem) => {
      return [
        movie.id.toString(),
        movie.year.toString(),
        movie.title.toString(),
      ]
    })
  }

  search(reseting = false) {
    if (reseting) {
      this.paginationComponent.reset();
    }

    const filters: ListMoviesInput = {
      page: this.paginationComponent.getCurrentPage(),
      size: 10,
      winner: true,
    }

    if (this.year()) {
      filters.year = this.year()
    }

    this.movieService.list(filters)
      .subscribe(
        (data) => {
          this.movies.set(data.content)
          this.paginationComponent.upgradePages(data.totalPages)
        }
      );
  }
}
