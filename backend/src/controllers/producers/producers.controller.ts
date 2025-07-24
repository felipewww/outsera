import { Controller, Get } from "@nestjs/common";
import {
  ReadProducersIntervalUseCase
} from "../../application/use-cases/producers/read-producers-interval/read-producers-interval.use-case";

@Controller('producers')
export class ProducerController {
  constructor(
    private readonly readProducersIntervalUseCase: ReadProducersIntervalUseCase
  ) {}

  @Get('intervals')
  getProducersInterval() {
    return this.readProducersIntervalUseCase.handle({});
  }
}
