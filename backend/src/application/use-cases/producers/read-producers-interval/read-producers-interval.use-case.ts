import { Injectable, NotFoundException } from "@nestjs/common";
import { MoviesDataSource } from "../../../../data/movies.data-source";
import { UseCase } from "../../use-case";
import { IntervalResult, ReadProducersIntervalOutput } from "./read-producers-interval.output";
import { ReadProducersIntervalInput } from "./read-producers-interval.input";
import { ProducerWinsModelView } from "../../../../data/model-views/producer-wins.model-view";
import { ProducersDataSource } from "../../../../data/producers.data-source";

@Injectable()
export class ReadProducersIntervalUseCase extends UseCase<ReadProducersIntervalInput, ReadProducersIntervalOutput> {
  constructor(
    private readonly producersDataSource: ProducersDataSource
  ) {
    super();
  }

  async handle(params: ReadProducersIntervalInput) {
    const data = await this.producersDataSource.getWinnersGrouped()

    if (!data.length) {
      throw new NotFoundException("No intervals found")
    }

    const { min, max } = this.calcInterval(data);

    const result: ReadProducersIntervalOutput = {
      min,
      max,
    }

    return result
  }

  private calcInterval(data: ProducerWinsModelView[]) {
    const allIntervals: IntervalResult[] = [];

    for (const row of data) {
      const years = row.years.split(',')

      // comparar intervalos consecutivos
      for (let i = 1; i < years.length; i++) {
        const prev = parseInt(years[i - 1]);
        const curr = parseInt(years[i]);

        allIntervals.push({
          producer: row.producerName,
          interval: curr - prev,
          previousWin: prev,
          followingWin: curr,
        });
      }
    }

    const intervalsOnly = allIntervals.map((i) => i.interval);
    const minVal = Math.min(...intervalsOnly);
    const maxVal = Math.max(...intervalsOnly);

    const min = allIntervals.filter((r) => r.interval === minVal);
    const max = allIntervals.filter((r) => r.interval === maxVal);

    return { min, max };
  }
}
