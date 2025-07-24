import {ListMoviesResponse} from '../services/dtos/list-movies.dto';

export const mockMoviesResponse: ListMoviesResponse = {
  content: [
    { id: 1, year: 2000, title: 'Test Movie', winner: true, producers: [], studios: [] },
    { id: 2, year: 2001, title: 'Another Movie', winner: true, producers: [], studios: [] },
  ],
  totalPages: 5,
  totalElements: 2,
  size: 2,
  number: 1
}
