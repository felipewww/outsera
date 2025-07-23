export abstract class UseCase<I, O> {
  abstract handle(params: I): Promise<O>
}
