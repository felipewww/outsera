import { UseCase } from "../../use-case";
import { Injectable } from "@nestjs/common";
import { MoviesDataSource } from "../../../../data/movies.data-source";
import { ListMoviesOutput } from "./list-movies.output";
import { ListMoviesInput } from "./list-movies.input";

@Injectable()
export class ListMoviesUseCase extends UseCase<ListMoviesInput, ListMoviesOutput> {
  constructor(
    private readonly moviesDataSource: MoviesDataSource
  ) {
    super();
  }

  async handle(params: ListMoviesInput) {
    const result = await this.moviesDataSource.list({
      page: params.page,
      winner: params.winner,
    })

    return result;
  }
}
