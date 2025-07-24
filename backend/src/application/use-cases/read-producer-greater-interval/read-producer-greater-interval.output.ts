export type IntervalResult = {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
};

export type ReadProducerGreaterIntervalOutput = {
  min: IntervalResult[],
  max: IntervalResult[],
}
