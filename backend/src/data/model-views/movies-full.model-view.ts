import { MovieModel } from "../models/movie.model";

export type MoviesFullModelView = {
  producer: string,
} & MovieModel
