import { Controller, Get } from '@nestjs/common';
import { ReadProducersIntervalUseCase } from "../application/use-cases/producers/read-producers-interval/read-producers-interval.use-case";
import { ListMoviesUseCase } from "../application/use-cases/movies/list-movies/list-movies.use-case";

@Controller('movies')
export class MoviesController {
  constructor(
    private readonly listMoviesUseCase: ListMoviesUseCase
  ) {}

  @Get()
  getProducersInterval() {
    return this.listMoviesUseCase.handle({});
  }
}
