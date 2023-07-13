import axios from 'axios';
import { instance } from '../api';

type MovieType = {
  movies: {
    movieId: number;
    moveName: string;
  }[];
};

export const getMovie = (movieName: string): Promise<MovieType> => {
  return instance.get(`/movies?q=${movieName}`).then(res => res.data);
};
