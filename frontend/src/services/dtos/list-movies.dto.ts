import {ListDto} from './list.dto';

export type MovieItem = {
  id: number,
  year: number,
  title: string,
  studios: string[],
  producers: string[],
  winner: boolean
}

export type ListMoviesResponse = ListDto<MovieItem[]>
