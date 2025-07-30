import {Component, signal, ViewChild} from '@angular/core';
import {MoviesService} from '../../services/movies.service';
import {ListMoviesInput} from '../../services/input/list-movies.input';
import {Pagination} from '../../components/pagination/pagination';
import {MovieItem} from '../../services/dtos/list-movies.dto';
import {Table, TableHeader} from '../../components/table/table';

type FilterableColumns = 'Year' | 'Winner'
type Filters = {
  [key in FilterableColumns]: any;
}

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    Pagination,
    Table
  ],
  templateUrl: './list.html',

  styleUrl: './list.css'
})
export class List {
  @ViewChild(Pagination) paginationComponent!: Pagination;

  tableHeader: TableHeader[] = [
    { label: 'Id' } ,
    {
      label: 'Year',
      filter: {
        type: 'text'
      }
    } ,
    { label: 'Title' },
    {
      label: 'Winner',
      filter: {
        type: 'options',
        options: [
          { value: ' ', label: '-' },
          { value: 'true', label: 'Yes' },
          { value: 'false', label: 'No' },
        ]
      }
    },
  ]

  movies = signal<MovieItem[]>([])

  filters = signal<ListMoviesInput>({
    page: 1,
    size: 10,
  })

  filtersCols = signal<Filters>({
    Year: '',
    Winner: '',
  })

  constructor(
    private movieService: MoviesService,
  ) {
  }

  ngAfterViewInit() {
    this.search()
  }

  mapToTable(): string[][] {
    return this.movies().map((movie: MovieItem) => {
      return [
        movie.id.toString(),
        movie.year.toString(),
        movie.title.toString(),
        (movie.winner) ? 'Yes' : 'No',
      ]
    })
  }

  search() {
    this.filters().page = this.paginationComponent.getCurrentPage()

    this.movieService.list(this.filters())
      .subscribe(
        (data) => {
          this.movies.set(data.content)
          this.paginationComponent.upgradePages(data.totalPages)
        }
      );
  }

  searchPage() {
    this.filters().page = this.paginationComponent.getCurrentPage()
    this.search();
  }

  searchWithFilters() {
    delete this.filters().winner;
    delete this.filters().year;

    this.paginationComponent.reset();

    if (this.filtersCols().Winner.trim()) {
      this.filters().winner = (this.filtersCols().Winner === 'true') ? true : false
    }

    if (this.filtersCols().Year.trim()) {
      this.filters().year = this.filtersCols().Year
    }

    this.search();
  }
}
