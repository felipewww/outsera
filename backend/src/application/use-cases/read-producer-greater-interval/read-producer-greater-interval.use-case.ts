import { Injectable } from "@nestjs/common";
import { MoviesDataSource } from "../../../data/movies.data-source";
import { UseCase } from "../use-case";
import { IntervalResult, ReadProducerGreaterIntervalOutput } from "./read-producer-greater-interval.output";
import { ReadProducerGreaterIntervalInput } from "./read-producer-greater-interval.input";
import { ProducerWinsModelView } from "../../../data/model-views/producer-wins.model-view";

@Injectable()
export class ReadProducerGreaterIntervalUseCase extends UseCase<ReadProducerGreaterIntervalInput, ReadProducerGreaterIntervalOutput> {
  constructor(
    private readonly moviesDataSource: MoviesDataSource
  ) {
    super();
    // this.moviesDataSource.getGreaterInterval()
    //   .then((greaterInterval) => {
    //     console.log(greaterInterval);
    //     const { min, max } = this.calcInterval(greaterInterval)
    //
    //     console.log('min, max, allIntervals??')
    //     console.log(min)
    //     console.log(max)
    //   })
  }

  async handle(params: ReadProducerGreaterIntervalInput) {
    const data = await this.moviesDataSource.getWinnersGrouped()

    const { min, max } = this.calcInterval(data)

    const result: ReadProducerGreaterIntervalOutput = {
      min,
      max,
    }

    return result
  }

  private calcInterval(data: ProducerWinsModelView[]) {
    if (!data.length) {
      return { min: [], max: [] };
    }

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
