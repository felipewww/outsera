import {ApiService} from './api.service';
import {Injectable} from '@angular/core';
import {YearsMultipleWinnersResponse} from './dtos/years-multiple-winners.dto';
import {StudiosWinCountResponse} from './dtos/studios-win-count.dto';
import {ProducersIntervalResponse} from './dtos/max-min-Interval.dto';
import {ListMoviesResponse} from './dtos/list-movies.dto';
import {ListMoviesInput} from './input/list-movies.input';

@Injectable({
  providedIn: 'root',
})
export class MoviesService extends ApiService {
  resourcePath = 'movies';

  yearsWithMultipleWinners() {
    return this.get<YearsMultipleWinnersResponse>('/yearsWithMultipleWinners')
  }

  studiosWinCount() {
    return this.get<StudiosWinCountResponse>('/studiosWithWinCount')
  }

  maxMinWinIntervalForProducers() {
    return this.get<ProducersIntervalResponse>('/maxMinWinIntervalForProducers')
  }

  list(filters: ListMoviesInput) {
    const params = this.toQueryParams(filters);
    return this.get<ListMoviesResponse>(`?${params}`)
  }
}
