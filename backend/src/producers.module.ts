import { Module } from "@nestjs/common";
import { MoviesController } from "./controllers/movies/movies.controller";
import { ReadProducersIntervalUseCase } from "./application/use-cases/producers/read-producers-interval/read-producers-interval.use-case";
import { MoviesDataSource } from "./data/movies.data-source";
import { ProducersDataSource } from "./data/producers.data-source";
import { ProducerController } from "./controllers/producers/producers.controller";

@Module({
  controllers: [ProducerController],
  providers: [ReadProducersIntervalUseCase, ProducersDataSource],
})
export class ProducersModule {}
