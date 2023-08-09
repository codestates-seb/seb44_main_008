export interface MovieType {
  map(
    arg0: (item: any) => import('react/jsx-runtime').JSX.Element,
  ): import('react').ReactNode;
  movies: {
    movieId: number;
    title: string;
  }[];
}
