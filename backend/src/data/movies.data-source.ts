import { Injectable } from "@nestjs/common";
import { MovieModel } from "./models/movie.model";
import { DataSource, ModelCols } from "./data-source";
import { MoviesFullModelView } from "./model-views/movies-full.model-view";

type ListFilters = {
  page: number;
  winner?: 0 | 1
}

@Injectable()
export class MoviesDataSource extends DataSource {

  async list(filters: ListFilters): Promise<MoviesFullModelView[]> {
    let offSet = 0;
    const perPage = 10;

    const cols: ModelCols<MoviesFullModelView> = {
      id: 'M.id',
      title: 'M.title',
      year: 'M.year',
      winner: 'M.winner',
      producer: 'P.name'
    }

    if (filters.page > 1) {
      offSet = perPage * (filters.page - 1);
    }

    const query = this.query
      .select(cols)
      .table('movies AS M')
      .innerJoin('movie_has_producer AS MP', 'MP.movie_id', 'M.id')
      .innerJoin('producers AS P', 'P.id', 'MP.producer_id')
      .limit(perPage)
      .offset(offSet)
      .orderBy('M.id', 'ASC')

    if (filters.winner) {
      query.where('M.winner', filters.winner);
    }

    return query;
  }

  async save(movie: MovieModel) {
    return this.query
      .table('movies')
      .insert(movie)
      .onConflict('id')
      .merge('*')
  }
}
