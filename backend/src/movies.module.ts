import { Module } from "@nestjs/common";
import { MoviesController } from "./controllers/movies.controller";
import { ReadProducerGreaterIntervalUseCase } from "./application/use-cases/read-producer-greater-interval/read-producer-greater-interval.use-case";
import { MoviesDataSource } from "./data/movies.data-source";

@Module({
  controllers: [MoviesController],
  providers: [ReadProducerGreaterIntervalUseCase, MoviesDataSource],
})
export class MoviesModule {}
