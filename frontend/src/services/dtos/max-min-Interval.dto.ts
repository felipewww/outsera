export type ProducerInterval = {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
};

export type ProducersIntervalResponse = {
  min: ProducerInterval[],
  max: ProducerInterval[],
}
