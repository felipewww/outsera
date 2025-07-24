import {ApiService} from './api.service';
import {Injectable} from '@angular/core';
import {YearsMultipleWinnersDto} from './dtos/years-multiple-winners.dto';

@Injectable({
  providedIn: 'root',
})
export class MoviesService extends ApiService {
  resourcePath = 'movies';

  yearsWithMultipleWinners() {
    return this.get<YearsMultipleWinnersDto>('/yearsWithMultipleWinners')
  }
}
