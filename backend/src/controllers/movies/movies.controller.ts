import { Controller, Get, Query } from "@nestjs/common";
import { ListMoviesUseCase } from "../../application/use-cases/movies/list-movies/list-movies.use-case";
import { GetMoviesQueryDto } from "./validators/list-movies.validator";

@Controller('movies')
export class MoviesController {
  constructor(
    private readonly listMoviesUseCase: ListMoviesUseCase
  ) {}

  @Get()
  getList(
    @Query() query: GetMoviesQueryDto,
  ) {
    return this.listMoviesUseCase.handle({
      page: (query.page) ? query.page : 1,
      winner: query.winner
    });
  }
}
