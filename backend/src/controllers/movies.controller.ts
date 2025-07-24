import { Controller, Get } from '@nestjs/common';
import { ReadProducersIntervalUseCase } from "../application/use-cases/read-producers-interval/read-producers-interval.use-case";

@Controller('movies')
export class MoviesController {
  constructor(
    private readonly readProducerGreaterIntervalUseCase: ReadProducersIntervalUseCase
  ) {}

  @Get()
  getProducerGreaterInterval() {
    return this.readProducerGreaterIntervalUseCase.handle({});
  }
}
