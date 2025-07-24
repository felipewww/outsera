import { Module } from "@nestjs/common";
import { MoviesController } from "./controllers/movies/movies.controller";
import { MoviesDataSource } from "./data/movies.data-source";
import { ListMoviesUseCase } from "./application/use-cases/movies/list-movies/list-movies.use-case";

@Module({
  controllers: [MoviesController],
  providers: [ListMoviesUseCase, MoviesDataSource],
})
export class MoviesModule {}
