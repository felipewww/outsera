import { DataParsed } from "./data-parsed";
import { Knex } from "knex";
import { MovieModel } from "../../../data/models/movie.model";
import { DataParser } from "./data-parser"; // or

export class DataLoader {

  constructor(private db: Knex) {}

  public async load(dataParser: DataParser) {

    await this.loadProducers(dataParser.producers)
    await this.loadStudios(dataParser.studios)
    await this.loadMovies(dataParser.dataParsed);

    // const all = await this.db.queryBuilder()
    //   .table('producers')
    //   .select('*')
    // console.log(all)

    // const all = await knex.queryBuilder()
    //   .table('studios')
    //   .select('*')
    // console.log(all)
  }

  private async loadProducers(producers: string[]) {
    const producersModels = producers.map((producer, idx) => {
      return {
        id: idx + 1,
        name: producer,
      }
    })

    await this.db.queryBuilder()
      .table('producers')
      .insert(producersModels)
  }

  private async loadStudios(studios: string[]) {
    const studioModels = studios.map((studio, idx) => {
      return {
        id: idx + 1,
        name: studio,
      }
    })

    await this.db.queryBuilder()
      .table('studios')
      .insert(studioModels)
  }

  private async loadMovies(dataParsed: DataParsed[]) {
    for (const movie of dataParsed) {
      const model: MovieModel = {
        id: movie.id,
        title: movie.title,
        year: movie.year,
        winner: movie.winner,
      }

      await this.db.queryBuilder()
        .table('movies')
        .insert(model, 'id')

      const hasProducers = movie.producers.map((producerId) => {
        return {
          movie_id: movie.id,
          producer_id: producerId
        }
      })

      await this.db.queryBuilder()
        .table('movie_has_producer')
        .insert(hasProducers)

      const hasStudios = movie.studios.map((studioId) => {
        return {
          movie_id: movie.id,
          studio_id: studioId
        }
      })

      await this.db.queryBuilder()
        .table('movie_has_studio')
        .insert(hasStudios)
    }
  }
}
