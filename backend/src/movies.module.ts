import { Module } from "@nestjs/common";
import { MoviesController } from "./controllers/movies.controller";
import { ReadProducersIntervalUseCase } from "./application/use-cases/read-producers-interval/read-producers-interval.use-case";
import { MoviesDataSource } from "./data/movies.data-source";

@Module({
  controllers: [MoviesController],
  providers: [ReadProducersIntervalUseCase, MoviesDataSource],
})
export class MoviesModule {}
