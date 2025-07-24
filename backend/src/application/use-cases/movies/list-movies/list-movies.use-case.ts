import { UseCase } from "../../use-case";
import { Injectable } from "@nestjs/common";
import { MoviesDataSource } from "../../../../data/movies.data-source";

@Injectable()
export class ListMoviesUseCase extends UseCase<any, any> {
  constructor(
    private readonly moviesDataSource: MoviesDataSource
  ) {
    super();
  }

  async handle(params: any) {
    return 'List movies';
  }
}
