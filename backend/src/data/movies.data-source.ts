import { Inject, Injectable } from "@nestjs/common";
import { Knex } from "knex";
import { MovieModel } from "./models/movie.model";
import { DataSource, ModelCols } from "./data-source";
import { ProducerWinsModelView } from "./model-views/producer-wins.model-view";

@Injectable()
export class MoviesDataSource extends DataSource {


  async save(movie: MovieModel) {
    return this.query
      .table('movies')
      .insert(movie)
      .onConflict('id')
      .merge('*')
  }
}
