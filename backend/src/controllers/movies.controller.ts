import { Controller, Get } from '@nestjs/common';
import { ReadProducerGreaterIntervalUseCase } from "../application/use-cases/read-producer-greater-interval/read-producer-greater-interval.use-case";

@Controller('movies')
export class MoviesController {
  constructor(
    private readonly readProducerGreaterIntervalUseCase: ReadProducerGreaterIntervalUseCase
  ) {}

  @Get()
  getProducerGreaterInterval() {
    return this.readProducerGreaterIntervalUseCase.handle({});
  }
}
