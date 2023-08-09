import { instance } from '../api';
import { MovieType } from './movieType';

export const getMovie = (movieName: string): Promise<MovieType> => {
  return instance.get(`/movies?q=${movieName}`).then(res => res.data.data);
};
