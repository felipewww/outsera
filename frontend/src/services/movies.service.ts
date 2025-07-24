import {ApiService} from './api.service';
import {Injectable} from '@angular/core';
import {YearsMultipleWinnersResponse} from './dtos/years-multiple-winners.dto';
import {StudiosWinCountResponse} from './dtos/studios-win-count.dto';
import {ProducersIntervalResponse} from './dtos/max-min-Interval.dto';

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
}
