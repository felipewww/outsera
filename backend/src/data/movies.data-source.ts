import { Inject, Injectable } from "@nestjs/common";
import { Knex } from "knex";
import { MovieModel } from "./models/movie.model";
import { DataSource } from "./data-source";

@Injectable()
export class MoviesDataSource extends DataSource {
  async getGreaterInterval() {
    return this.query
      .select('*')
      .from('movies')
  }

  async save(movie: MovieModel) {
    return this.query
      .table('movies')
      .insert(movie)
      .onConflict('id')
      .merge('*')
  }
}
