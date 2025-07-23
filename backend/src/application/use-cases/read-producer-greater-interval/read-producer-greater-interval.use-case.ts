import { Injectable } from "@nestjs/common";
import { MoviesDataSource } from "../../../data/movies.data-source";
import { UseCase } from "../use-case";
import { ReadProducerGreaterIntervalOutput } from "./read-producer-greater-interval.output";
import { ReadProducerGreaterIntervalInput } from "./read-producer-greater-interval.input";

@Injectable()
export class ReadProducerGreaterIntervalUseCase extends UseCase<ReadProducerGreaterIntervalInput, ReadProducerGreaterIntervalOutput> {
  constructor(
    private readonly moviesDataSource: MoviesDataSource
  ) {
    super();
  }

  async handle(params: ReadProducerGreaterIntervalInput) {
    const result: ReadProducerGreaterIntervalOutput = {
      min: [
        {
          producer: 'string',
          interval: 1, //1,
          previousWin: 2008, //2008,
          followingWin: 2009,//2009
        },
        {
          producer: 'string',
          interval: 1,
          previousWin: 2008,
          followingWin: 2008,
        }
      ],
      max: [
        {
          producer: 'string',
          interval: 1,
          previousWin: 2008,
          followingWin: 2008,
        },
        {
          producer: 'string',
          interval: 1,
          previousWin: 2008,
          followingWin: 2008,
        }
      ]
    }

    const res = await this.moviesDataSource.getGreaterInterval()
    // console.log(res)
    return result
  }
}
