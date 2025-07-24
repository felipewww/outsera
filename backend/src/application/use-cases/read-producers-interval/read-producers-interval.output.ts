export type IntervalResult = {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
};

export type ReadProducersIntervalOutput = {
  min: IntervalResult[],
  max: IntervalResult[],
}
