export type ReadProducerGreaterIntervalOutput = {
  min: [
    {
      producer: string,
      interval: number, //1,
      previousWin: number, //2008,
      followingWin: number,//2009
    },
    {
      producer: string,
      interval: number,
      previousWin: number,
      followingWin: number,
    }
  ],
  max: [
    {
      producer: string,
      interval: number,
      previousWin: number,
      followingWin: number,
    },
    {
      producer: string,
      interval: number,
      previousWin: number,
      followingWin: number,
    }
  ]
}
