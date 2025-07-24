import { Controller, Get, Query } from "@nestjs/common";
import { ListMoviesUseCase } from "../application/use-cases/movies/list-movies/list-movies.use-case";

@Controller('movies')
export class MoviesController {
  constructor(
    private readonly listMoviesUseCase: ListMoviesUseCase
  ) {}

  @Get()
  getList(
    @Query('page') page: number,
    @Query('winner') winner: 0 | 1,

  ) {
    return this.listMoviesUseCase.handle({
      page: (page) ? page : 1,
      winner
    });
  }
}
